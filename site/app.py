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

    # Configure Flask Assets
    assets = Environment(app)
    assets.debug       = app.config["DEVELOPMENT"]
    assets.auto_build  = app.config["DEVELOPMENT"]
    assets.cache       = False
    assets.url_mapping = False
    assets.manifest    = None

    assets.config["AUTOPREFIXER_BIN"] = os.path.join(app.root_path, "node_modules", "postcss-cli", "bin", "postcss")
    assets.config["LIBSASS_STYLE"] = app.config["SASS_OUTPUT_STYLE"]

    assets = utils.compile_assets(assets)

    app.config["ASSETS"] = assets

    return app

app = create_app(config.Config)

@app.route("/")
def index() :
    return render_template("index.html")

@app.route("/landing")
def landing() :
    return render_template("landing.html")

@app.route("/about/")
def about() :
    assets = utils.compile_assets(app.config["ASSETS"])
    return render_template("about.html")

@app.context_processor
def jinja_addons() :
    return {"now" : datetime.now()}

if __name__ == "__main__" :
    app.run()
