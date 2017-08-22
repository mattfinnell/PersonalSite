# Run site
cd website

npm install postcss-cli
npm install autoprefixer

gunicorn run:app
