import xadmin
from xadmin import views

class BaseSetting(object):

    enable_themes = True
    use_bootswatch = True
xadmin.site.register(views.BaseAdminView,BaseSetting)

class GlobalSettings(object):

    site_title="流浪之家后台管理系统"
    site_footer = "animalhome"
    menu_style = "accordion"

xadmin.site.register(views.CommAdminView,GlobalSettings)