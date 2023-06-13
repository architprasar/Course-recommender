# urls.py
from django.urls import path
from recommender.views import Roadmap,GetSearchRecommendations

urlpatterns = [
   path('roadmap/',Roadmap.as_view(),name="roadmap"),
   path('searchrec/',GetSearchRecommendations().as_view(),name="search recomendation")

]
