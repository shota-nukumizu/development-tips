# クラスベース？それとも、関数ベース？

# クラスベース

```py
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.views import View

from .forms import MyForm

class MyFormView(View):
    form_class = MyForm
    initial = {'key': 'value'}
    template_name = 'form_template.html'

    def get(self, request, *args, **kwargs):
        form = self.form_class(initial=self.initial)
        return render(request, self.template_name, {'form': form})

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            # <process form cleaned data>
            return HttpResponseRedirect('/success/')

        return render(request, self.template_name, {'form': form})
```

## メリット

* コードを再利用できる
* コードを拡張しやすい
* コードを構造的に理解しやすい(異なるクラスのインスタンスメソッドで異なるhttpリクエストに応答する際に役立つ)

## デメリット

* 読みにくい
* デコレータを使う際に追加のインポートやメソッドの継承が必要

# 関数ベース

```py
from django.http import HttpResponseRedirect
from django.shortcuts import render

from .forms import MyForm

def myview(request):
    if request.method == "POST":
        form = MyForm(request.POST)
        if form.is_valid():
            # <process form cleaned data>
            return HttpResponseRedirect('/success/')
    else:
        form = MyForm(initial={'key': 'value'})

    return render(request, 'form_template.html', {'form': form})
```

## メリット

* 組み立てが簡単
* 読みやすい
* デコレータが使いやすい

## デメリット

* コードを拡張したり再利用したりしにくい
* 条件分岐によるHTTPメソッドの扱い方が難しい

# 参考

[Django : Class Based Views vs Function Based Views](https://medium.com/@ksarthak4ever/django-class-based-views-vs-function-based-view-e74b47b2e41b)

[Introduction to class-based views - Django Documentation](https://docs.djangoproject.com/en/4.0/topics/class-based-views/intro/)
