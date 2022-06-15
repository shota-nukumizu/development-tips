# Pythonにおける制御構文

# `match`構文

サンプルコード

```py
def http_error(status):
    match status:
        case 400:
            return "Bad request"
        case 404:
            return "Not found"
        case 418:
            return "Python"
        case _:
            return "Something's wrong with the Internet"
```

```py
case 401 | 403 | 404:
    return "Not allowed"
```

```py
match point:
    case (0, 0):
        print("Origin")
    case (0, y):
        print(f"Y={y}")
    case (x, 0):
        print(f"X={x}")
    case (x, y):
        print(f"X={x}, Y={y}")
    case _:
        raise ValueError("Not a point")
```

```py
class Point:
    x: int
    y: int

def where_is(point):
    match point:
        case Point(x=0, y=0):
            print("Origin")
        case Point(x=0, y=y):
            print(f"Y={y}")
        case Point(x=x, y=0):
            print(f"X={x}")
        case Point():
            print("Somewhere else")
        case _:
            print("Not a point")
```

```
Point(1, var)
Point(1, y=var)
Point(x=1, y=var)
Point(y=var, x=1)
```

```py
from enum import Enum

# Enumを継承して新規クラスを作成する
class Color(Enum):
    RED = 'red'
    GREEN = 'green'
    BLUE = 'blue'

# 新規クラスをここで作成する
color = Color(input("Enter your choice of 'red', 'blue' or 'green': "))

# Enumを継承したColorクラスのプロパティとそれぞれのパターンで書いていく
match color:
    case Color.RED:
        print("I see red!")
    case Color.GREEN:
        print("Grass is green")
    case Color.BLUE:
        print("I'm feeling the blues :(")
    case _:
        print("invalid")
```