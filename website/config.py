import os

class Config(object) :
    # Typical meta-variables
    APP_NAME = "Personal Website"
    STATIC_FOLDER = "website/static"
    CSRF_ENABLED = True

    # Database stuff
    SQLALCHEMY_DATABASE_URI = os.getenv('CLEARDB_DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Admin page key
    SECRET_KEY = os.getenv("FLASK_ADMIN_KEY")

    # Quick identifiers
    STAGING = False
    DEVELOPMENT = False
    PRODUCTION = False
    TESTING = False

    # Feature Flags
    DEBUG = True

    # LIB-SASS compilation options
    SASS_OUTPUT_STYLE = "expanded"
    SASS_OUTPUT_COMMENTS = True

class DevelopmentConfig(Config) :
    SQLALCHEMY_DATABASE_URI = "sqlite:///.development.db"
    DEVELOPMENT = True

class TestingConfig(Config) :
    TESTING = True

class StagingConfig(Config) :
    STAGING = True

class ProductionConfig(Config) :
    PRODUCTION = True
    DEBUG = False

    SASS_OUTPUT_STYLE = "compressed"
    SASS_OUTPUT_COMMENTS = False
