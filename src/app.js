const express = require('express');
const path = require('path');
const app = express();
const user = require('./routes/user.js');
const main = require('./routes/main.js');

const port = process.env.PORT || 1616;

app.set('view engine','ejs');

app.set('views',path.resolve(__dirname,'./views'))

app.use(express.static(path.resolve(__dirname,'../public')));

app.use('/',main);
app.use('/user',user)

app.listen(port, () => {
    console.log(`servidor escuchando por el puerto ${port}`);
});