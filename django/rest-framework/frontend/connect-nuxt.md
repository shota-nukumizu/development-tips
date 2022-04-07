# How to Connect Django with Nuxt

Django✕Nuxtで簡単なユーザ認証を実装するも、`cookie`を取得できない

`views.py`

```py
from django.contrib.auth import authenticate
from rest_framework.reverse import reverse
import requests
import jwt,datetime
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import *
from .serializers import *
from .models import *

class BrandView(APIView):
    def get(self, request, *args, **kwargs):
        brands = Brand.objects.all()
        serializer= BrandSerializer(brands,many=True)
        return Response(serializer.data)
    def post(self, request, *args, **kwargs):
        serializers= BrandSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors)

class ProductViewSet(viewsets.ModelViewSet):
    queryset=Product.objects.all()
    serializer_class= ProductSerializer

class CustomersViewSet(viewsets.ModelViewSet):
    queryset=Customers.objects.all()
    serializer_class= CustomersSerializer

class OrderdetailsViewSet(viewsets.ModelViewSet):
    queryset=Orderdetails.objects.all()
    serializer_class= OrderdetailsSerializer

class OrdersViewSet(viewsets.ModelViewSet):
    queryset=Orders.objects.all()
    serializer_class= OrdersSerializer


@api_view(['POST'])
def register(request):
    username= request.query_params['username']
    email= request.query_params['email']
    password= request.query_params['password']
    user = User.objects.create_user(username,email,password)

@api_view(['POST'])
def login(request):
    username= request.data.get('username')
    # email= request.query_params['email']
    password= request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is None:
        if not User.objects.filter(username=username):
            raise exceptions.AuthenticationFailed('User does not exist')
        else:
            raise exceptions.AuthenticationFailed('Incorred password')
    serializers = UserSerializer(user)
    token_endpoint = reverse(viewname='token_obtain_pair',request=request)
    token = requests.post(token_endpoint, data=request.data).json()
    response = Response()


    response.data = {
        'access': token.get('access'),
        'refresh': token.get('refresh'),
    }
    response.set_cookie('username', username)
    return response

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    response = Response()
    return response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userview(request):
    try:
        # can't get cookies :(
        username= request.COOKIES['username']
    except:
        return Response({'mess':'ops'})
    print(username)
    queryset = User.objects.filter(username=username)
    serializers = UserSerializer(queryset,many=True)
    user = serializers.data
    return Response({'user': user})
```

`nuxt.config.ts`

```ts
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "http://127.0.0.1:8000/",
    credentials: true
  },
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        localStorage: {
          prefix: 'auth.'
        },
        email: {
          prefix: 'email.',
          property: 'email' 
        },
        token: {
          prefix: 'access.',
          property: 'access',
          maxAge: 60*5,
          type: 'Bearer'
        },
        refreshToken: {
          prefix: 'refresh.',
          property: 'refresh',
          data: 'refresh',
          maxAge: 60 * 60
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/login/', method: 'post'},
          refresh: { url: 'api/token/refresh/', method: 'post' },
          user: { url: '/user/', method: 'get' },
          logout: { url: '/logout/', method: 'post'}
        },
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
}
```

`Login.vue`


```vue
<script>
  export default {
    name: 'Login',
    components: {
      Notification,
    },
    layout: 'clean',

    data() {
      return {
        user: {
          username: '',
          password: ''
        },
        error: null
      }
    },

    methods: {
      async login() {
          await this.$auth.loginWith('local', { data: this.user });
   
      }
    }
  }
</script>
```

## 回答

```py
# デコレータをつける
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userview(request):
    try:
        # can't get cookies :(
        username= request.COOKIES["user"]["username"] // change here
    except:
        return Response({'mess':'ops'})
```