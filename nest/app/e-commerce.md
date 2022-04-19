# [nestjs-ecommerce](https://github.com/asif633/nestjs-ecommerce)

## ディレクトリ

```
C:.
│  app.controller.spec.ts
│  app.controller.ts
│  app.module.ts
│  app.service.ts
│  main.ts
│
├─auth
│      auth.controller.ts
│      auth.module.ts
│      auth.service.spec.ts
│      auth.service.ts
│      constants.ts
│      jwt.strategy.ts
│      local.strategy.ts
│      localAuthentication.guard.ts
│
├─category
│  │  category.controller.spec.ts
│  │  category.controller.ts
│  │  category.module.ts
│  │  category.service.spec.ts
│  │  category.service.ts
│  │
│  ├─dtos
│  │      category-dto.ts
│  │
│  └─schemas
│          category.schema.ts
│
├─common
│  └─dtos
│          paginate-sort-dto.ts
│
├─product
│  │  product.controller.spec.ts
│  │  product.controller.ts
│  │  product.module.ts
│  │  product.service.spec.ts
│  │  product.service.ts
│  │
│  ├─dtos
│  │      product-dto.ts
│  │
│  └─schemas
│          product.schema.ts
│
├─user
│  │  user.module.ts
│  │  user.service.spec.ts
│  │  user.service.ts
│  │
│  ├─dtos
│  │      login-dto.ts
│  │      match-decorator.ts
│  │      signup-dto.ts
│  │      user-dto.ts
│  │
│  └─schemas
│          user.schema.ts
│
└─users
        users.module.ts
        users.service.spec.ts
        users.service.ts
```

# 余談

やっぱりJWT認証を搭載するアプリって多いな...