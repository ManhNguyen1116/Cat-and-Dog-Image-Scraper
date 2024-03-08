# Cat-and-Dog-Image-Scraper
This is the command used to build the Docker image.
docker build . -t jmn1116/assignment1:1.0

This is the command used to run the Docker container. Port used is 8055, so you will connect to the web app using localhost:8055. To create more Docker containers, use this run command and use different ports to be able to run multiple instances of the web app.
docker run -p 8055:8080 -d jmn1116/assignment1:1.0

If running locally, use npm install and npm start commands and connect to web app using localhost:8080.
docker run -p 8055:8080 -d jmn1116/assignment1:1.0
