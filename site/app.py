# Flask Framework
from flask import Flask, render_template, Blueprint

# Flask extensions
from flask_assets import Environment

# Werkzeug utilities
from werkzeug.utils import find_modules, import_string

# local utilities
from datetime import datetime
import config
import utils
import os

def create_app(config_object) :
    app = Flask(config_object.APP_NAME)
    app.config.from_object(os.environ['APP_SETTINGS'])

    registration_functions = [
        register_assets,
        register_blueprints,
        register_context_processors
    ]

    for r in registration_functions :
        r(app)

    return app

def register_assets(app) :
    dev_config = app.config["DEVELOPMENT"]

    # Configure Flask Assets
    assets = Environment(app)
    assets.debug       = dev_config
    assets.auto_build  = dev_config
    assets.url_mapping = not app.config["PRODUCTION"]
    assets.manifest    = False
    assets.cache       = False

    assets.config["AUTOPREFIXER_BIN"] = os.path.join(
        app.root_path,
        "node_modules",
        "postcss-cli",
        "bin",
        "postcss"
    )

    assets.config["LIBSASS_STYLE"] = app.config["SASS_OUTPUT_STYLE"]

    assets = utils.compile_assets(assets)

    app.config["ASSETS"] = assets

    return None

def register_blueprints(app) :
    for name in find_modules("views") :
        module = import_string(name)

        for attr in module.__dict__ :
            if isinstance(getattr(module, attr), Blueprint) :
                app.register_blueprint(getattr(module, attr))

def register_context_processors(app) :
    @app.context_processor
    def jinja_addons() :
        return {"now" : datetime.now()}
