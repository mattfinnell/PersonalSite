# Flask Framework
from flask import Flask, Blueprint, render_template

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


def create_app(config_object):
    app = Flask(config_object.APP_NAME)
    app.config.from_object(config_object)
    app.static_folder = config_object.STATIC_FOLDER

    registration_functions = [
        register_blueprints,
        register_database,
        register_context_processors,
        register_error_pages,
    ]

    for r in registration_functions:
        r(app)

    return app


def register_database(app):
    models.db.init_app(app)

    with app.app_context():
        models.db.create_all()

    sqlalchemy_models = utils.get_classes_of_type(
        models,
        flask_sqlalchemy._BoundDeclarativeMeta
    )

    # Flask admin stuff, disable for production
    if not app.config["PRODUCTION"]:
        admin = Admin(app, name=app.name, template_mode="bootstrap3")

        for model in sqlalchemy_models:
            admin.add_view(ModelView(model, models.db.session))


def register_blueprints(app):
    view_modules = map(import_string, find_modules("website.views"))

    for view_module in view_modules:
        blueprints = utils.get_classes_of_type(
            view_module,
            Blueprint
        )

        for blueprint in blueprints:
            app.register_blueprint(blueprint)


def register_context_processors(app):
    @app.context_processor
    def jinja_addons():
        return {"now": datetime.now()}


def register_error_pages(app):
    """
    Handle all errors mentioned by the "Digital Ocean common http error codes"
    webpage.
    """

    class Error(object):
        def __init__(self, error_code, error_title):
            self.code = error_code
            self.title = error_title

    @app.errorhandler(400)
    def bad_request(e):
        error = Error(400, "Bad Request")
        return render_template("errorpage.html", data=error), 400

    @app.errorhandler(401)
    def unauthorized(e):
        error = Error(401, "Unauthorized")
        return render_template("errorpage.html", data=error), 401

    @app.errorhandler(403)
    def forbidden(e):
        error = Error(403, "Forbidden")
        return render_template("errorpage.html", data=error), 403

    @app.errorhandler(404)
    def page_not_found(e):
        error = Error(404, "Page Not Found")
        return render_template('errorpage.html', error=error), 404

    @app.errorhandler(418)
    def teapot(e):  # This is hillarious
        error = Error(418, "I'm a Teapot")
        return render_template('errorpage.html'), 418

    @app.errorhandler(500)
    def server_error(e):
        error = Error(500, "Internal Server Error")
        return render_template("errorpage.html", data=error), 500

    @app.errorhandler(502)
    def bad_gateway(e):
        error = Error(502, "Bad Gateway")
        return render_template("errorpage.html", data=error), 502

    @app.errorhandler(503)
    def gateway_timeout(e):
        error = Error(503, "Gateway Timeout")
        return render_template("errorpage.html", data=error), 503
