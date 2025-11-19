// Apllication Programming Interface
//Rest - Representational State Transfer

//Get 
//Post
//Put / pacth
//Delete

import express from 'express';

const app = express();
const port = 3000;  

app.listen(port, () => console.log(`Server running at port ${port}`));

app.get('/', (req, res) => {
  res.send('API Backend - Projeto Inclusão Social');
});