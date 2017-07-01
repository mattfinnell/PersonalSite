from flask import Flask, render_template

import config
import os

app = Flask(config.Config.APP_NAME)
app.config.from_object(os.environ['APP_SETTINGS'])

@app.route("/")
def index() :
    return render_template("index.html")

if __name__ == "__main__" :
    app.run()
