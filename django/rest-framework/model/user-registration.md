# Djangoでユーザ登録機能の実装

Djangoのユーザ登録が完了した時点でプロファイルを作成したいが、既存のユーザとは別にプロファイルを作成しなければならない。

```py
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from main.models import Membership
# Create your models here.

class Profile(models.Model):
    membership = models.OneToOneField(
        Membership, on_delete=models.CASCADE, related_name="membership", default="null")
    
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile")
        
    couple_with = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="couple_with", blank=True, null=True)

    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    maiden_name = models.CharField(max_length=2, blank="")
    street_address = models.CharField(max_length=50)
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default="Select")
    date_of_birth = models.DateField( blank=True, null=True)
    address2 = models.CharField(max_length=10)
    city = models.CharField(max_length=20)
    state = models.CharField(max_length=20)
    zip = models.CharField(max_length=5)
    country_name = models.CharField(max_length=30)
    graduate_year = models.CharField(max_length=4)
    
    def __str__(self):     
        return(self.first_name + " " + self.last_name) 

    @receiver(post_save, sender=User)
    def update_user_profile(sender, instance, created, **kwargs):
        user = instance
        print(user)
        if created:
            profile = Profile.objects.create(user=user)
            profile.save()
```

登録されたユーザを作成できるが、プロファイルが作成されないので自動でプロファイルを作成する必要がある

```py
def register_account(request):
    # check if the user is already logged in
    if request.user.is_authenticated:
        return redirect("main:home")

    # if not logged in
    else:
        if request.method == 'POST':
            form = RegistrationForm(request.POST or None)

            # check if the form is valid
            if form.is_valid():
                user = form.save(commit=False)

                duplicate = False
                nonWarhawks = False
                # for u in users:
                #     if user.email == u.email:
                #         error_message = "Email Already Exists"
                #         duplicate = True
                #         break
                if User.objects.filter(email=user.email).exists():
                    duplicate = True

                # duplicate check
                if duplicate:
                    return render(request, 'accounts/register.html', {"error_message": "Email Already Exists", "form": form})

                user.is_active = False

                user.save()

                # create profile
                user.refresh_from_db()

                user.profile.copule_with = None
                user.profile.first_name = request.POST.get("first_name")
                user.profile.last_name = request.POST.get("last_name")
                user.profile.maiden_name = request.POST.get("maiden_name")
                user.profile.street_address = request.POST.get("street_address")
                user.profile.city = request.POST.get("city")
                user.profile.zip = request.POST.get("zipcode")
                user.profile.country_name = request.POST.get("country_name")
                user.profile.graduate_year = request.POST.get("graduate_year")

                print(user.profile.first_name)
                user.profile.save()

                current_site = get_current_site(request)
                mail_subject = 'Activate your account.'
                message = render_to_string('accounts/acc_active_email.html', {
                    'user': user,
                    'domain': current_site.domain,
                    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                    'token': account_activation_token.make_token(user),
                    'protocol': 'http'
                })
                to_email = form.cleaned_data.get('email')
                email = EmailMessage(
                    mail_subject, message, to=[to_email]
                )
                email.send()

                print("Successfully sent email using the sendgrid api")
                return HttpResponse('Please confirm your email address to complete the registration')
                # return redirect("daily:home")
        else:
            form = RegistrationForm(request.POST or None)
        return render(request, 'accounts/register.html', {'form': form})
```

これを解決するには、可変長引数を利用する。

```py
def create_profile(sender, **kwargs):
     if kwargs['created']:
         user_profile = Profile.objects.create(user=kwargs['instance'])

post_save.connect(create_profile, sender=User)
```

# 参考サイト

[Django Signals not creating profile after user registration - GitHub](https://stackoverflow.com/questions/72080493/django-signals-not-creating-profile-after-user-registration)