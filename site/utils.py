from flask_assets import Bundle
from glob import glob
import shutil
import os

def compile_assets(assets) :

    _clear_directory(assets.directory, "css")

    file_names = [f[f.rindex("/") + 1:f.index(".")] for f in glob("static/sass/*.scss")]

    scss_files = [os.path.join("sass", f + ".scss") for f in file_names]
    css_files  = [os.path.join("css", f + ".css")   for f in file_names]

    for file_name, scss_file, css_file in zip(file_names, scss_files, css_files):
        css_bundle = Bundle(
            Bundle(scss_file, filters="libsass", output=css_file),
            filters="autoprefixer",
            output=css_file
        )

        assets.register("assets_css_" + file_name, css_bundle)

    return assets

def _clear_directory(current_path, dir_path) :
    path = os.path.join(current_path, dir_path)
    if os.path.isdir(path) :
        shutil.rmtree(path)

    os.makedirs(path)
