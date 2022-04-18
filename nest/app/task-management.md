# [Task Management](https://github.com/arielweinberger/nestjs-course-task-management)

## ディレクトリ構造

```
C:.
│  app.module.ts
│  config.schema.ts
│  main.ts
│  transform.interceptor.ts
│
├─auth
│  │  auth.controller.ts
│  │  auth.module.ts
│  │  auth.service.ts
│  │  get-user.decorator.ts
│  │  jwt-payload.interface.ts
│  │  jwt.strategy.ts
│  │  user.entity.ts
│  │  users.repository.ts
│  │
│  └─dto
│          auth-credentials.dto.ts
│
└─tasks
    │  task-status.enum.ts
    │  task.entity.ts
    │  tasks.controller.ts
    │  tasks.module.ts
    │  tasks.repository.ts
    │  tasks.service.spec.ts
    │  tasks.service.ts
    │
    └─dto
            create-task.dto.ts
            get-tasks-filter.dto.ts
            update-task-status.dto.ts
```