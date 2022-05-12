from django.urls import path, include
from . import views

urlpatterns = [
    path('api/candidate_details/', views.CandidateDetailsView.as_view()),
    path('api/change_application_status/', views.change_application_status),
]
