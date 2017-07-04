import os

basedir  = os.path.abspath(os.path.dirname(__file__))

class Config(object) :
    APP_NAME = "__mattfinnell_dot_io_website__"
    GOOGLE_ANALYTICS = False
    CSRF_ENABLED = True
    STAGING = False
    DEVELOPMENT = False
    TESTING = False
    DEBUG = True

class DevelopmentConfig(Config) :
    DEVELOPMENT = True

class TestingConfig(Config) :
    TESTING = True

class StagingConfig(Config) :
    STAGING = True

class ProductionConfig(Config) :
    GOOGLE_ANALYTICS = True
    DEBUG = False
