const express = require('express');
const yargs = require('yargs');
const app = express();


// settings
app.set('port', process.env.PORT || 4000);


// middlewares
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(require("./routes/index.js"));


//app.use(require('./routes'));


// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});