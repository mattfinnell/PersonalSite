from app import create_app
import config
import os

app = create_app(config.Config)
app.run()
