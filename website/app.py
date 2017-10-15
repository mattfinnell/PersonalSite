# Flask Framework
from flask import Flask, Blueprint

# SQLAlchemy Database
import flask_sqlalchemy
from flask_sqlalchemy import SQLAlchemy

# DB Admin dashboard
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

# Werkzeug utilities
from werkzeug.utils import find_modules, import_string

# standard library utilities
from datetime import datetime

# local application modules
import website.models as models
import website.utils as utils

def create_app(config_object) :
    app = Flask(config_object.APP_NAME)
    app.config.from_object(config_object)
    app.static_folder = config_object.STATIC_FOLDER

    registration_functions = [
        register_blueprints,
        register_database,
        register_context_processors,
    ]

    for r in registration_functions :
        r(app)

    return app

def register_database(app) :
    models.db.init_app(app)

    with app.app_context() :
        models.db.create_all()

    admin = Admin(app, name=app.name, template_mode="bootstrap3")

    sqlalchemy_models = utils.get_classes_of_type(
        models,
        flask_sqlalchemy._BoundDeclarativeMeta
    )

    for model in sqlalchemy_models :
        admin.add_view(ModelView(model, models.db.session))

def register_blueprints(app) :
    view_modules = map(import_string, find_modules("website.views"))

    for view_module in view_modules:
        blueprints = utils.get_classes_of_type(
            view_module,
            Blueprint
        )

        for blueprint in blueprints :
            app.register_blueprint(blueprint)

def register_context_processors(app) :
    @app.context_processor
    def jinja_addons() :
        return {"now" : datetime.now()}
