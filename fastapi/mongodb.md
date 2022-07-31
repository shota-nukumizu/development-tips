# FastAPIでMongoDBを動かす

# 大まかな流れ

1. FastAPIでREST APIを開発する
2. 非同期通信でMongoDBと連携する
3. MongoDB AtlasでMongoDBを動かす
4. FastAPIをHerokuにデプロイする

# セットアップ

```
mkdir fastapi-mongo
cd fastapi-mongo 
```

```
$ python3.9 -m venv venv
$ source venv/bin/activate
$ export PYTHONPATH=$PWD
```

以下のようにディレクトリを作成する。

```
├── app
│   ├── __init__.py
│   ├── main.py
│   └── server
│       ├── app.py
│       ├── database.py
│       ├── models
│       └── routes
└── requirements.txt
```

`requirements.txt`に以下の内容を記入

```
fastapi==0.73.0
uvicorn==0.17.4
```

以下のコマンドでインストールする

```
(venv)$ pip install -r requirements.txt
```

`app/main.py`でアプリケーションを動かすためのエントリーポイントを定義する

```py
import uvicorn

if __name__ == "__main__":
    uvicorn.run("server.app:app", host="0.0.0.0", port=8000, reload=True)
```

ここでは、ポート8000でUvicornサーバを実行してファイル変更のたびにリロードするようにファイルに命令した。エントリーポイントからサーバを起動する際に`app/server/app.py`にベースとなるルートを設定する。

```py
from fastapi import FastAPI

app = FastAPI()


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}
```

エントリーポイントを以下のコマンドで実行する。

```py
(venv)$ python app/main.py
```

`localhost:8000`にアクセスすれば以下のJSONレスポンスが返答される

```json
{
  "message": "Welcome to this fantastic app!"
}
```

# スキーマ

データがMongoDBに保存される方法を表す、データの基盤となるスキーマを定義してみよう。

```py
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class StudentSchema(BaseModel):
    fullname: str = Field(...)
    email: EmailStr = Field(...)
    course_of_study: str = Field(...)
    year: int = Field(..., gt=0, lt=9)
    gpa: float = Field(..., le=4.0)

    class Config:
        schema_extra = {
            "example": {
                "fullname": "John Doe",
                "email": "jdoe@x.edu.ng",
                "course_of_study": "Water resources engineering",
                "year": 2,
                "gpa": "3.0",
            }
        }


class UpdateStudentModel(BaseModel):
    fullname: Optional[str]
    email: Optional[EmailStr]
    course_of_study: Optional[str]
    year: Optional[int]
    gpa: Optional[float]

    class Config:
        schema_extra = {
            "example": {
                "fullname": "John Doe",
                "email": "jdoe@x.edu.ng",
                "course_of_study": "Water resources and environmental engineering",
                "year": 4,
                "gpa": "4.0",
            }
        }


def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message
```

上記のプログラムでは、`StudentSchema`というスキーマを定義した。これは、生徒のデータをMongoDBデータベースに保存する方法を表すものである。

このスキーマでは、ユーザがAPIに対して適切な形でHTTPリクエストを送信するのに役立つ。

# MongoDB

このセクションでは、MongoDBとFastAPIを連携させる方法を解説する。

## セットアップ

インストール後、ガイドに従ってmongodデーモンプロセスを実行する。これが終了したら、`mongo`シェルコマンドでインスタンスに接続し、MongoDBが稼働しているかどうかを確認できる。

```
mongo
```

本チュートリアルではMongoDB Community Edition v5.0.6を使っている。

```bash
$ mongo --version

MongoDB shell version v5.0.6

Build Info: {
    "version": "5.0.6",
    "gitVersion": "212a8dbb47f07427dae194a9c75baec1d81d9259",
    "modules": [],
    "allocator": "system",
    "environment": {
        "distarch": "x86_64",
        "target_arch": "x86_64"
    }
}
```

## Motorのセットアップ

データベースとやり取りするための非同期MongoDBドライバであるMotorを設定する。まずは、要件ファイルに依存関係を追加する。

```
motor==2.5.1
```

インストールは以下のコマンドで実行

```
pip install -r requirements.txt
```

`app/server/database.py`

```py
import motor.motor_asyncio

MONGO_DETAILS = "mongodb://localhost:27017"

# 単なる参照なので、どちらもawaitは必要ない。
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.students

student_collection = database.get_collection("students_collection")

# データベースクエリの結果をPythonのdictに変換するための簡単なhepler関数
def student_helper(student) -> dict:
    return {
        "id": str(student["_id"]),
        "fullname": student["fullname"],
        "email": student["email"],
        "course_of_study": student["course_of_study"],
        "year": student["year"],
        "GPA": student["gpa"],
    }
```

# データベースのCRUDモデル構築

最初に`database.py`ファイルの先頭で、`bson`パッケージから`ObjectId`メソッドをインポートする。

ちなみに`bson`パッケージはMotorのインストール時にセットで行なわれる。

```py
from bson.objectid import ObjectId
```

次に、CRUD操作のための以下の各機能を追加する。

```py
# Retrieve all students present in the database
async def retrieve_students():
    students = []
    async for student in student_collection.find():
        students.append(student_helper(student))
    return students


# Add a new student into to the database
async def add_student(student_data: dict) -> dict:
    student = await student_collection.insert_one(student_data)
    new_student = await student_collection.find_one({"_id": student.inserted_id})
    return student_helper(new_student)


# Retrieve a student with a matching ID
async def retrieve_student(id: str) -> dict:
    student = await student_collection.find_one({"_id": ObjectId(id)})
    if student:
        return student_helper(student)


# Update a student with a matching ID
async def update_student(id: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    student = await student_collection.find_one({"_id": ObjectId(id)})
    if student:
        updated_student = await student_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_student:
            return True
        return False


# Delete a student from the database
async def delete_student(id: str):
    student = await student_collection.find_one({"_id": ObjectId(id)})
    if student:
        await student_collection.delete_one({"_id": ObjectId(id)})
        return True
```

# CRUDモデルのルーティング設定

`student.py`

```py
from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from app.server.database import (
    add_student,
    delete_student,
    retrieve_student,
    retrieve_students,
    update_student,
)
from app.server.models.student import (
    ErrorResponseModel,
    ResponseModel,
    StudentSchema,
    UpdateStudentModel,
)

router = APIRouter()
```

`app/server/app.py`

```py
from fastapi import FastAPI

from app.server.routes.student import router as StudentRouter

app = FastAPI()

app.include_router(StudentRouter, tags=["Student"], prefix="/student")


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}
```

## Create

```py
@router.post("/", response_description="Student data added into the database")
async def add_student_data(student: StudentSchema = Body(...)):
    student = jsonable_encoder(student)
    new_student = await add_student(student)
    return ResponseModel(new_student, "Student added successfully.")
```

## Read

```py
@router.get("/", response_description="Students retrieved")
async def get_students():
    students = await retrieve_students()
    if students:
        return ResponseModel(students, "Students data retrieved successfully")
    return ResponseModel(students, "Empty list returned")


@router.get("/{id}", response_description="Student data retrieved")
async def get_student_data(id):
    student = await retrieve_student(id)
    if student:
        return ResponseModel(student, "Student data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "Student doesn't exist.")
```

## Update

```py
@router.put("/{id}")
async def update_student_data(id: str, req: UpdateStudentModel = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    updated_student = await update_student(id, req)
    if updated_student:
        return ResponseModel(
            "Student with ID: {} name update is successful".format(id),
            "Student name updated successfully",
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the student data.",
    )
```

## Delete

```py
@router.delete("/{id}", response_description="Student data deleted from the database")
async def delete_student_data(id: str):
    deleted_student = await delete_student(id)
    if deleted_student:
        return ResponseModel(
            "Student with ID: {} removed".format(id), "Student deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred", 404, "Student with id {0} doesn't exist".format(id)
    )
```

# 参考記事

* [Building a CRUD App with FastAPI and MongoDB](https://testdriven.io/blog/fastapi-mongo/)