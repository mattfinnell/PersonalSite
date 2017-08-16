# Flask Framework
from flask import Flask, render_template
from flask_assets import Environment

# Utilities
from datetime import datetime
import config
import utils
import os

def create_app(config_object) :
    app = Flask(config_object.APP_NAME)
    app.config.from_object(os.environ['APP_SETTINGS'])

    dev_config = app.config["DEVELOPMENT"]

    # Configure Flask Assets
    assets = Environment(app)
    assets.debug       = dev_config
    assets.auto_build  = dev_config
    assets.cache       = False
    assets.url_mapping = not app.config["PRODUCTION"]

    if dev_config :
        assets.manifest = None

    assets.config["AUTOPREFIXER_BIN"] = os.path.join(app.root_path, "node_modules", "postcss-cli", "bin", "postcss")
    assets.config["LIBSASS_STYLE"] = app.config["SASS_OUTPUT_STYLE"]

    assets = utils.compile_assets(assets)

    app.config["ASSETS"] = assets

    return app

app = create_app(config.Config)

def render(template_name_or_list, **context) :
    if app.config["DEVELOPMENT"] :
        utils.compile_assets(app.config["ASSETS"])

    return render_template(template_name_or_list, **context)

@app.route("/landing")
def landing() :
    return render("landing.html")

@app.route("/")
@app.route("/about/")
def about() :
    data = {
        "skills" : [
            ("Python", 80),
            ("HTML", 80),
            ("CSS", 70),
            ("JavaScript", 50),
            ("Jinja", 50),
        ]
    }
    return render("about.html", data=data)

@app.context_processor
def jinja_addons() :
    return {"now" : datetime.now()}

if __name__ == "__main__" :
    app.run()
