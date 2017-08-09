import config
import shutil
import sass
import os

def _clear_directory(dir_path) :
    if os.path.isdir(os.getcwd() + dir_path) :
            shutil.rmtree(os.getcwd() + dir_path)

def compile_dependencies(conf) :

    _clear_directory("/static/css")

    sass.compile(
        dirname = (conf["SASS_DIR"], conf["CSS_DIR"]),
        output_style = conf["SASS_OUTPUT_STYLE"],
        source_comments = conf["SASS_OUTPUT_COMMENTS"]
    )
