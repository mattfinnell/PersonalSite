# Run site
cd site
npm install postcss-cli
gunicorn app:app --log-file=-
