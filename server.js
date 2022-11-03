// dependencies
const express = require('express');

// app uses express
const app = express();

// creates port for environment
const PORT = process.env.PORT || 3001;

// create route for the files in the public folder
app.use(express.static('public'));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// grab route files
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// starts the server
app.listen(PORT, () => {
    console.log(`Server started at localhost${PORT}`);
});