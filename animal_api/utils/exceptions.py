from rest_framework.views import exception_handler
from django.db import DatabaseError
from rest_framework.response import Response
from django.http.response import HttpResponse

import logging
logger = logging.getLogger('django')
from rest_framework import status

def custom_exception_handler(exc,context):

    response = exception_handler(exc,context)

    if response is None:
        view = context("view")
        if isinstance(exc,DatabaseError):
            logger.error('[%s] %s'%(view,exc))
            response = Response({'message':'服务器内部错误,请联系客服人员'},status=status.HTTP_507_INSUFFICIENT_STORAGE)

    return response


