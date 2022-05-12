from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CandidateDetails
from .serializers import CandidateDetailsSerializer
from django.views.decorators.csrf import csrf_exempt
import json


class CandidateDetailsView(APIView):
    # permission_classes = (IsAuthenticated,)

    def get(self, request):
        candidate_details = CandidateDetails.objects.all()
        serializer = CandidateDetailsSerializer(candidate_details, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CandidateDetailsSerializer(data=request.data)
        print(serializer)
        print(serializer.is_valid())
        if serializer.is_valid():
            print("HELLL")
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def change_application_status(request):
    if request.method == 'POST':
        status_change = json.loads(request.body)
        print(status_change['change_status_app'])
        obj = CandidateDetails.objects.get(id=status_change['change_status_app_id'])
        print(obj)
        obj.application_status = status_change['change_status_app']
        obj.save()
        return HttpResponse("Successfully changed!")
    return HttpResponse("POST REQUEST FAILED!")

