const express = require('express');
const app = express();
const PORT = 1337;
const bodyParser = require('body-parser');
const path = require('path');
// Routers
const userRouter = require('./userRouter.js');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve react code
app.use('/', express.static(path.join(__dirname, '../client/dist')));

// Routing
app.use('/api/users', userRouter);

app.listen(PORT, () => console.log(`App listening @ localhost:${PORT}`));
