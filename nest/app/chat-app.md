# [genal-chat](https://github.com/genaller/genal-chat)

## ディレクトリ構造

```
C:.
│  app.module.ts
│  main.ts
│
├─common
│  ├─constant
│  │      rcode.ts
│  │
│  ├─filters
│  │      http-exception.filter.ts
│  │
│  ├─interceptor
│  │      response.interceptor.ts
│  │
│  ├─middleware
│  │      logger.middleware.ts
│  │
│  └─tool
│          utils.ts
│
└─modules
    ├─auth
    │      auth.controller.ts
    │      auth.module.ts
    │      auth.service.ts
    │      constants.ts
    │      jwt.strategy.ts
    │      local.strategy.ts
    │
    ├─chat
    │  │  chat.gateway.ts
    │  │  chat.module.ts
    │  │
    │  └─dto
    │          index.dto.ts
    │
    ├─friend
    │  │  friend.controller.ts
    │  │  friend.module.ts
    │  │  friend.service.ts
    │  │
    │  └─entity
    │          friend.entity.ts
    │          friendMessage.entity.ts
    │
    ├─group
    │  │  group.controller.ts
    │  │  group.module.ts
    │  │  group.service.ts
    │  │
    │  └─entity
    │          group.entity.ts
    │          groupMessage.entity.ts
    │
    └─user
        │  user.controller.ts
        │  user.module.ts
        │  user.service.ts
        │
        └─entity
                user.entity.ts
```