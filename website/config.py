from website.instance import secretvars
import os

basedir  = os.path.abspath(os.path.dirname(__file__))

class Config(object) :
    # Typical meta-variables
    APP_NAME = "mattfinnell.io"
    CSRF_ENABLED = True
    STATIC_FOLDER = "website/static"

    # Database stuff
    SQLALCHEMY_DATABASE_URI = secretvars.SQL_DB_URI
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Admin page key
    SECRET_KEY = secretvars.SECRET_KEY

    # Quick identifiers
    STAGING = False
    DEVELOPMENT = False
    PRODUCTION = False
    TESTING = False

    # Feature Flags
    GOOGLE_ANALYTICS = False
    DEBUG = True

    # LIB-SASS compilation options
    SASS_OUTPUT_STYLE = "expanded"
    SASS_OUTPUT_COMMENTS = True

class DevelopmentConfig(Config) :
    DEVELOPMENT = True

class TestingConfig(Config) :
    TESTING = True

class StagingConfig(Config) :
    STAGING = True

class ProductionConfig(Config) :
    PRODUCTION = True

    GOOGLE_ANALYTICS = True
    DEBUG = False

    SASS_OUTPUT_STYLE = "compressed"
    SASS_OUTPUT_COMMENTS = False
