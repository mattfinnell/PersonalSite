# Flask Framework
from flask import Flask, render_template

# Utilities
from datetime import datetime
import config
import utils
import os

# Initialize application and application properties
app = Flask(config.Config.APP_NAME)
app.config.from_object(os.environ['APP_SETTINGS'])

@app.route("/")
def index() :
    return render_template("index.html")

@app.route("/landing")
def landing() :
    return render_template("landing.html")

@app.route("/about/")
def about() :
    return render_template("about.html")

@app.context_processor
def jinja_addons() :
    return {"now" : datetime.now()}

@app.before_request
def before_request_handler() :
    if app.config["Development"] :
        utils.compile_dependencies(app.config)

if __name__ == "__main__" :
    utils.compile_dependencies(app.config)
    app.run()
