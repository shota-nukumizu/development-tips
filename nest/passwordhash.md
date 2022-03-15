# Nestでパスワードをハッシュ化する方法

私はArgon2を使ってパスワードをハッシュ化しているのですが、これは私のコードです。

ハッシュ化されたパスワードを印刷すると、ハッシュ化されていないことがわかります。

```ts
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

  async signup(authDto: AuthDto) {
    // generate the password
    const hash = await argon.hash(authDto.password);
    console.log(`The hashed password is ${authDto.password}`);

    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: authDto.email,
          hash: authDto.password,
          firstname: '',
          lastname: '',
        },
      });
      //delete user.hash;
      // return the saved user
      return user;
    } catch (error) {
      // test if the error is commimg from prisma
      if (error instanceof PrismaClientKnownRequestError) {
        // test if the field is duplicated
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken'); //NestJS exception
        }
      }
      throw error;
    }
  }
```


# 回答

パスワードをハッシュ化した後も、平文のパスワードをロギングに使用し、prisma dbに保存しています。変数hashには、ハッシュ化されたパスワードが格納されます。

authDto.passwordの代わりにハッシュを使用するようにコードを変更します。

```ts
const hash = await argon.hash(authDto.password);
console.log(`The hashed password is ${hash}`);
```

# 前提

**大前提として、パスワードをデータベースに保存する際に生で保存してはいけない。ハッシュ化するなど元の文字列を改変してからデータベースに保存しよう。**