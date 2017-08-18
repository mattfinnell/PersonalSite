# Run site
cd site

npm install postcss-cli
npm install autoprefixer

gunicorn run:app
