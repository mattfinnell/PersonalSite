from flask import Flask, render_template
from datetime import datetime

from pprint import pprint

import config
import sass
import os

app = Flask(config.Config.APP_NAME)
app.config.from_object(os.environ['APP_SETTINGS'])

@app.route("/")
def index() :
    compile_sass(app.config)
    return render_template("landing.html")

@app.context_processor
def jinja_addons() :
    return {"now" : datetime.now()}

def compile_sass(env) :
    sass.compile(
        dirname = (env["SASS_DIR"], env["CSS_DIR"]),
        output_style = env["SASS_OUTPUT_STYLE"],
        source_comments = env["SASS_OUTPUT_COMMENTS"]
    )

if __name__ == "__main__" :
    compile_sass(app.config)
    app.run()
