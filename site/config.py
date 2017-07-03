import os

basedir  = os.path.abspath(os.path.dirname(__file__))

class Config(object) :
    APP_NAME = "__mattfinnell_dot_io_website__"
    CSRF_ENABLED = True
    DEVELOPMENT = False
    Testing = False
    DEBUG = True

class DevelopmentConfig(Config) :
    DEVELOPMENT = True

class TestingConfig(Config) :
    TESTING = True

class StagingConfig(Config) :
    DEVELOPMENT = True

class ProductionConfig(Config) :
    DEBUG = False
