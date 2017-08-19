
def test_create_app() :
    from website.app import create_app
    import website.config as config

    app = create_app(config.DevelopmentConfig)

    assert app is not None
