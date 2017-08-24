# Frameworks
from flask import Flask
import pytest

# Application modules
from website.app import create_app
import website.config as config
import website.utils as utils

@pytest.fixture
def blank_app() :
    return Flask(__name__)

def test_create_app() :
    app = create_app(config.DevelopmentConfig)

    assert app is not None

def test_blank_app() :
    app = blank_app()
    assert app is not None
