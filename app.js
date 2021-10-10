const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 1616;

app.use(express.static(path.resolve(__dirname,'./public')));

app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname,'./views/home.html'));
});

app.listen(1616, () => {
    console.log(`servidor escuchando por el puerto ${port}`);
});