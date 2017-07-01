from flask import Flask, render_template

import config

app = Flask(config.app_name)

@app.route("/")
def index() :
    return render_template("index.html")

if __name__ == "__main__" :
    app.run(debug=True)
