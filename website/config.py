import os

class Config(object) :
    # Typical meta-variables
    APP_NAME = "__mattfinnell_dot_io__"
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
    GOOGLE_ANALYTICS = False
    DEBUG = True

    # LIB-SASS compilation options
    SASS_OUTPUT_STYLE = "expanded"
    SASS_OUTPUT_COMMENTS = True

class DevelopmentConfig(Config) :
    SQLALCHEMY_DATABASE_URI = "sqlite:///development.db"
    DEVELOPMENT = True

class TestingConfig(Config) :
    SQLALCHEMY_DATABASE_URI = "sqlite:///test.db"
    TESTING = True

class StagingConfig(Config) :
    STAGING = True

class ProductionConfig(Config) :
    PRODUCTION = True
    DEBUG = False

    SASS_OUTPUT_STYLE = "compressed"
    SASS_OUTPUT_COMMENTS = False
