# [Bookmark Application for NestJS](https://github.com/vladwulf/nestjs-api-tutorial)

## ディレクトリ構造

```
│  app.module.ts
│  main.ts
│
├─auth
│  │  auth.controller.ts
│  │  auth.module.ts
│  │  auth.service.ts
│  │
│  ├─decorator
│  │      get-user.decorator.ts
│  │      index.ts
│  │
│  ├─dto
│  │      auth.dto.ts
│  │      index.ts
│  │
│  ├─guard
│  │      index.ts
│  │      jwt.guard.ts
│  │
│  └─strategy
│          index.ts
│          jwt.strategy.ts
│
├─bookmark
│  │  bookmark.controller.ts
│  │  bookmark.module.ts
│  │  bookmark.service.ts
│  │  
│  └─dto
│          create-bookmark.dto.ts
│          edit-bookmark.dto.ts
│          index.ts
│
├─prisma
│      prisma.module.ts
│      prisma.service.ts
│
└─user
    │  user.controller.ts
    │  user.module.ts
    │  user.service.ts
    │
    └─dto
            edit-user.dto.ts
            index.ts
```

# 参考サイト

* [NestJS API Tutorial](https://github.com/vladwulf/nestjs-api-tutorial)