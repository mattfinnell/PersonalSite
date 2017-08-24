from website.app import create_app
import website.config as config

import os

config_object = eval(os.environ['APP_SETTINGS'])
app = create_app(config_object)

if __name__ == "__main__" :
    app.run()
