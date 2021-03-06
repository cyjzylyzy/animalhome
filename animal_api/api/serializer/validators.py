import re
from rest_framework.exceptions import ValidationError


def phone_validator(value):
    if re.match(r"^(1[3|4|5|6|7|8|9])\d{9}$", value):
        return
    return ValidationError("手机格式错误")
