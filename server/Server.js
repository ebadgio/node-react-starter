const express = require('express');
const session = require('express-session');
const compress = require('compression');
const path = require('path');
const bodyParser = require('body-parser');

// Note: if you host using heroku, you might find this useful
// const sslRedirect = require('heroku-ssl-redirect');

const app = express();

// Again, for if you use Heroku: enable ssl redirect
// app.use(sslRedirect());

const buildPath = path.join(__dirname, '..', 'build');

app.use(express.static(buildPath));
app.use(compress());

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));

// app.use('/db', db);

// frontend entry
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build/index.html'));
});



// Handles unknown routes
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    console.log(err);
    res.send('404: Page Not Found');
    next(err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});