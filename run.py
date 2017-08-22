from website.app import create_app
from website.config import DevelopmentConfig

app = create_app(DevelopmentConfig)
app.run()
