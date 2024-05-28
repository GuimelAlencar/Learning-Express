const express = require('express');
const app = express();
const port = 3001;

// It sets that in the /imgaes root, we can access any static file on it, just by his name.
// Examples: YouTube.png, Discord.png, Instagram.jpg
app.use('/images', express.static('./Images'));



app.listen(port, () =>{
    console.log('The express application instance is on port 3000, to access it, use http://localhost:3000')
});