from flask import Flask, render_template
from datetime import datetime

from pprint import pprint

import config
import utils
import os

app = Flask(config.Config.APP_NAME)
app.config.from_object(os.environ['APP_SETTINGS'])

@app.route("/")
def index() :
    return render_template("landing.html")

@app.context_processor
def jinja_addons() :
    return {"now" : datetime.now()}

if __name__ == "__main__" :
    utils.compile_sass(app.config)
    app.run()
