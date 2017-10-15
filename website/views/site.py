from flask import Blueprint, render_template

from website.models import Skill

site = Blueprint('site', __name__, template_folder="../templates")

@site.route("/")
def about() :

    skills = list(reversed(list(Skill.query.order_by(Skill.percent))))
    data = {"skills" : skills}
    return render_template("about.html", data=data)

@site.route("/card")
def card() :
    return render_template("card.html")

@site.route("/landing")
def landing() :
    return render_template("landing.html")
