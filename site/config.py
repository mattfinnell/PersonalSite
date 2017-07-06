#      ________           __      ______            _____
#     / ____/ /___ ______/ /__   / ____/___  ____  / __(_)___ _
#    / /_  / / __ `/ ___/ //_/  / /   / __ \/ __ \/ /_/ / __ `/
#   / __/ / / /_/ (__  ) ,<    / /___/ /_/ / / / / __/ / /_/ /
#  /_/   /_/\__,_/____/_/|_|   \____/\____/_/ /_/_/ /_/\__, /
#                                                     /____/
import os

basedir  = os.path.abspath(os.path.dirname(__file__))

class Config(object) :
    # Typical meta-variables
    APP_NAME = "__mattfinnell_dot_io_website__"
    CSRF_ENABLED = True

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
    SASS_DIR = "static/sass/"
    CSS_DIR = "static/css/"

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
