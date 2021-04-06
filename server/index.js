const express = require('express');
const app = express();
const PORT = 1337;
const bodyParser = require('body-parser');
const path = require('path');
// Routers
const userRouter = require('./userRouter.js');
const javascriptRouter = require('./javascriptCodeRoutes.js');

// Testing middleware function
const jsonError = async (err, req, res, next) => {
    res.status(500).send({ error: err });
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jsonError);

// Serve react code
app.use('/', express.static(path.join(__dirname, '../client/dist')));

// Routing
app.use('/api/users', userRouter);
app.use('/api/js', javascriptRouter);

app.listen(PORT, () => console.log(`App listening @ localhost:${PORT}`));
