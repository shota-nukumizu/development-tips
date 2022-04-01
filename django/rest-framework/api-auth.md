# Django REST FrameworkでTypeerror(認証失敗)

django-rest-frameworkについて学ぼうとしているのですが、認証/許可プロセスで行き詰っています。私は誰かが私を助けることができることを願っています。以下は私のコードです。

`settings.py`

```py
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'drones.custompagination.LimitOffsetPaginationWithUpperBound',
    'PAGE_SIZE': 4,
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.OrderingFilter',
        'rest_framework.filters.SearchFilter',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ]
}
```

`models.py`

```py
class Drone(models.Model):
    name = models.CharField(max_length=250,
                            unique=True)
    drone_category = models.ForeignKey(DroneCategory,
                                       related_name='drones',
                                       on_delete=models.CASCADE)
    manufacturing_date = models.DateTimeField()
    has_it_competed = models.BooleanField(default=False)
    inserted_timestamp = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        'auth.User',
        related_name='drones',
        on_delete=models.CASCADE)

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name
```

`views.py`

```py
class DroneList(generics.ListCreateAPIView):
    queryset = Drone.objects.all()
    serializer_class = DroneSerializer
    name = 'drone-list'
    permission_classes = (
        'permissions.IsAuthenticatedOrReadOnly',
        'custompermission.IsCurrentUserOwnerOrReadOnly',
    )
    filterset_fields = (
        'name',
        'drone_category',
        'manufacturing_date',
        'has_it_competed',
    )
    search_fileds = (
        'name',
    )
    ordering_fields = (
        'name',
        'manufacturing_date',
    )
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class DroneDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Drone.objects.all()
    serializer_class = DroneSerializer
    name = 'drone-detail'
    permission_classes = (
        'permissions.IsAuthenticatedOrReadOnly',
        'custompermission.IsCurrentUserOwnerOrReadOnly',
    )
```

`custompermission.py`

```py
from rest_framework import permissions

class IsCurrentUserOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            # The method is a safe method
            return True
        else:
            # The method is not a safe method
            # Only owners are granted permissions
            return obj.owner == request.user
```

# 回答

`permission_classes`の値を直接パーミッションクラスに設定してみてください、こんな感じです。

```py
from rest_framework import permissions
#import your custome permission module
class DroneDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Drone.objects.all()
    serializer_class = DroneSerializer
    name = 'drone-detail'
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        custompermission.IsCurrentUserOwnerOrReadOnly,
    )
```