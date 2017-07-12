import config
import shutil
import sass
import os

def _clear_directory(dir_path) :
    for f in os.listdir(dir_path) :
        try :
            shutil.rmtree(f)
        except :
            pass # Not the best practice but it serves it's purpose perfectly


def compile_sass(env) :

    _clear_directory("static/css")

    sass.compile(
        dirname = (env["SASS_DIR"], env["CSS_DIR"]),
        output_style = env["SASS_OUTPUT_STYLE"],
        source_comments = env["SASS_OUTPUT_COMMENTS"]
    )

