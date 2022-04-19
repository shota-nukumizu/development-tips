# [Soul](https://github.com/soul-project/soul)

## ディレクトリ

```
C:.
│  app.controller.spec.ts
│  app.controller.ts
│  app.module.ts
│  app.service.spec.ts
│  app.service.ts
│  main.ts
│
├─auth
│  │  auth.controller.spec.ts
│  │  auth.controller.ts
│  │  auth.module.ts
│  │  auth.service.spec.ts
│  │  auth.service.ts
│  │
│  ├─dto
│  │      api.dto.ts
│  │
│  ├─entities
│  │      jwt-payload.entity.ts
│  │      jwt-refresh-payload.entity.ts
│  │      refresh-token.entity.ts
│  │
│  ├─enums
│  │      token-type.enum.ts
│  │
│  ├─exceptions
│  │      index.ts
│  │      invalid-callback.exception.ts
│  │      invalid-token.exception.ts
│  │      unauthorized-user.exception.ts
│  │      user-not-verified.exception.ts
│  │      
│  ├─guards
│  │      jwt-auth.guard.ts
│  │      local-auth.guard.spec.ts
│  │      local-auth.guard.ts
│  │
│  └─strategies
│          jwt.strategy.spec.ts
│          jwt.strategy.ts
│          local.strategy.spec.ts
│          local.strategy.ts
│
├─common
│  │  constants.ts
│  │
│  ├─dto
│  │      pagination-params.dto.ts
│  │
│  ├─exceptions
│  │      bad-healthcheck.exception.ts
│  │      generic.exception.ts
│  │      validation.exception.ts
│  │
│  ├─interceptors
│  │      local-ip-whitelist.interceptor.spec.ts
│  │      local-ip-whitelist.interceptor.ts
│  │
│  └─validators
│          is-valid-redirect-uri.validator.spec.ts
│          is-valid-redirect-uri.validator.ts
│          password.validator.spec.ts
│          password.validator.ts
│
├─filters
│      all-exception.filter.spec.ts
│      all-exception.filter.ts
│
├─mail
│  │  mail.module.ts
│  │  mail.processor.spec.ts
│  │  mail.processor.ts
│  │  mail.service.spec.ts
│  │  mail.service.ts
│  │
│  └─templates
│          confirmation.hbs
│          password-reset.hbs
│
├─platforms
│  │  platforms.controller.spec.ts
│  │  platforms.controller.ts
│  │  platforms.module.ts
│  │  platforms.service.spec.ts
│  │  platforms.service.ts
│  │
│  ├─dto
│  │      api-responses.dto.ts
│  │      api.dto.ts
│  │
│  ├─entities
│  │      platform-user.entity.ts
│  │      platform.entity.ts
│  │
│  └─exceptions
│          duplicate-platform-user.exception.ts
│          index.ts
│          no-admins-remaining.exception.ts
│          platform-not-found.exception.ts
│          platform-user-not-found.exception.ts
│
├─reputation
│  │  reputation.controller.spec.ts
│  │  reputation.controller.ts
│  │  reputation.module.ts
│  │  reputation.service.spec.ts
│  │  reputation.service.ts
│  │
│  └─dto
│          api-responses.dto.ts
│          api.dto.ts
│
├─roles
│  │  platform-roles.guard.ts
│  │  role.enum.ts
│  │  roles.decorator.ts
│  │
│  └─exceptions
│          no-permission.exception.ts
│
├─user-connections
│  │  user-connections.controller.spec.ts
│  │  user-connections.controller.ts
│  │  user-connections.module.ts
│  │  user-connections.service.spec.ts
│  │  user-connections.service.ts
│  │
│  ├─dto
│  │      api-responses.dto.ts
│  │      api.dto.ts
│  │
│  ├─entities
│  │      user-connection.entity.ts
│  │
│  ├─enums
│  │      connection-type.enum.ts
│  │
│  └─exceptions
│          connection-not-found.exception.ts
│          duplicate-user-connection.exception.ts
│          index.ts
│          user-connection-to-self.exception.ts
│          user-not-involved-in-connection.exception.ts
│
└─users
    │  users.controller.spec.ts
    │  users.controller.ts
    │  users.module.ts
    │  users.service.spec.ts
    │  users.service.ts
    │
    ├─dto
    │      api-responses.dto.ts
    │      api.dto.ts
    │
    ├─entities
    │      user.entity.ts
    │
    └─exceptions
            duplicate-user-exists.exception.ts
            index.ts
            invalid-token.exception.ts
            user-already-active.exception.ts
            user-not-found.exception.ts
```