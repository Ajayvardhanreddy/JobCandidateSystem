from rest_framework import serializers
from . import models


class CandidateDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CandidateDetails
        fields = '__all__'
