const express = require('express');
const path = require('path');
const app = express();
const userRoutes = require('./routes/user.js');
const mainRoutes = require('./routes/main.js');
const productRoutes = require('./routes/product.js');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userLogged = require('./middleware/userLoggued');
const port = process.env.PORT || 1616;

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
    }));
app.use(methodOverride('_method'));    
app.use(cookieParser());
app.use(userLogged)
app.use(express.static(path.resolve(__dirname,'../public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.set('view engine','ejs');
app.set('views',path.resolve(__dirname,'./views'))

app.use('/',mainRoutes);
app.use('/users',userRoutes);
app.use('/products',productRoutes);

app.listen(port, () => {
    console.log(`servidor escuchando por el puerto ${port}`);
});