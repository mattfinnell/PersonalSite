# Run site
cd site && gunicorn app:app --log-file=-
