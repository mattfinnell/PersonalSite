from flask import render_template, current_app
from flask_assets import Bundle
from glob import glob
import shutil
import os

def compile_assets(assets) :

    file_names = [f[f.rindex("/") + 1:f.index(".")] for f in glob("website/static/sass/*.scss")]

    scss_files = [os.path.join("sass", f + ".scss") for f in file_names]
    css_files  = [os.path.join("css", f + ".css")   for f in file_names]

    for file_name, scss_file, css_file in zip(file_names, scss_files, css_files):
        bundle_css = Bundle(
            Bundle(scss_file, filters="libsass", output=css_file),
            filters="autoprefixer6",
            output=css_file
        )

        # Register asset bundle if it doesn't already exist.
        bundle_name_css = "assets_css_" + file_name
        if bundle_name_css not in assets._named_bundles :
            assets.register(bundle_name_css, bundle_css)

    return assets

def get_classes_of_type(module, class_type):
    object_names = filter(
        lambda x : issubclass(type(getattr(module, x)), class_type),
        module.__dict__
    )

    return [getattr(module, object_name) for object_name in object_names]

def render(template_name_or_list, **context) :
    if current_app.config["DEVELOPMENT"] or current_app.config["STAGING"] :
        current_app.config["ASSETS"] = compile_assets(current_app.config["ASSETS"])

    return render_template(template_name_or_list, **context)
