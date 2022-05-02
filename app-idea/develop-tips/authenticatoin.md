# Django REST FrameworkにおけるToken認証

認証メカニズムとして「Token認証」を選択し、Django RESt Frameworkの公式ドキュメントに従って実装する。

**問題は、Webアプリは定期的にTokenを更新・変更するべきなのか、もしそうであるならどのようにするべきか？**

# 回答

定期的に認証Tokenを更新する必要がある、デフォルトの`TokenAuthentication`クラスはこれをサポートしていないが、拡張してこの機能を実装できる。

▼具体例

```py
from rest_framework.authentication import TokenAuthentication, get_authorization_header
from rest_framework.exceptions import AuthenticationFailed

class ExpiringTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        try:
            token = self.model.objects.get(key=key)
        except self.model.DoesNotExist:
            raise exceptions.AuthenticationFailed('Invalid token')

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed('User inactive or deleted')

        # This is required for the time comparison
        utc_now = datetime.utcnow()
        utc_now = utc_now.replace(tzinfo=pytz.utc)

        if token.created < utc_now - timedelta(hours=24):
            raise exceptions.AuthenticationFailed('Token has expired')

        return token.user, token
```

さらに、デフォルトの`loginview`を継承してログインが行われるたびにTokenがリフレッシュされるようにすることも大事。

```py
class ObtainExpiringAuthToken(ObtainAuthToken):
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            token, created =  Token.objects.get_or_create(user=serializer.validated_data['user'])

            if not created:
                # update the created time of the token to keep it valid
                token.created = datetime.datetime.utcnow()
                token.save()

            return Response({'token': token.key})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

obtain_expiring_auth_token = ObtainExpiringAuthToken.as_view()
```

あとルーティングに設定することも忘れないように。

```py
urlpatterns += patterns(
    '',
    url(r'^users/login/?$', '<path_to_file>.obtain_expiring_auth_token'),
)
```

# 参考サイト

[Token Authentication for RESTful API: should the token be periodically changed? - stackoverflow](https://stackoverflow.com/questions/14567586/token-authentication-for-restful-api-should-the-token-be-periodically-changed)