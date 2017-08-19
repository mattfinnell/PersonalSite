from flask import Blueprint

from website.utils import render

site = Blueprint(
    'site',
    __name__,
    template_folder="../templates",
)

@site.route("/")
@site.route("/about")
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

@site.route("/landing")
def landing() :
    return render("landing.html")
