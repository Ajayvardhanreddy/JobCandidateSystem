from django.db import models
from django.core.validators import FileExtensionValidator


class CandidateDetails(models.Model):

    objects = None
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    mobile_no = models.CharField(max_length=15)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    current_role = models.CharField(max_length=100)
    years_of_exp = models.CharField(max_length=100)
    current_company = models.CharField(max_length=100)
    current_ctc = models.CharField(max_length=100)
    expected_ctc = models.CharField(max_length=100)
    notice_period = models.CharField(max_length=100)
    application_status = models.CharField(max_length=100)
