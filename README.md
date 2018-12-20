# express-api-showcase
demonstration express server with express, jwt, graphql, and socket.io

## Environment setup
* Mongodb server available (docker works great for this)

```docker run --name mongo01 -p 27017:27017 -d mongo ```
* Node enviroment with yarn and nodemon available
```npm install -g yarn;npm install -g nodemon```
* Grab the code and run the server
```
git clone https://github.com/jonmead/express-api-showcase.git
cd express-api-showcase
cp .env.sample .env
yarn
yarn start
```

## Test out the server
Navigate to http://localhost:4040/demo.htm and test out the setup
* Start by creating a user (you can verify it's created by accessing the mongodb container with any mongo client)
* Try making requests either with or without the token or not to see how routes can be protected by requiring a signed jwt token
