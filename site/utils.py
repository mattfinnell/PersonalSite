import config
import shutil
import sass
import os

def _clear_directory(dir_path) :
    if os.path.isdir(os.getcwd() + dir_path) :
            shutil.rmtree(os.getcwd() + dir_path)

def compile_sass(env) :

    _clear_directory("/static/css")

    sass.compile(
        dirname = (env["SASS_DIR"], env["CSS_DIR"]),
        output_style = env["SASS_OUTPUT_STYLE"],
        source_comments = env["SASS_OUTPUT_COMMENTS"]
    )
