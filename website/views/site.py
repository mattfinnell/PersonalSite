from flask import Blueprint, abort

from website.utils import render
from website.models import Skill

site = Blueprint('site', __name__, template_folder="../templates")

@site.route("/")
def about() :
    skills = list(reversed(list(Skill.query.order_by(Skill.percent))))
    data = {"skills" : skills}

    return render("about.html", data=data)

@site.route("/card")
def card() :
    return render("card.html")
