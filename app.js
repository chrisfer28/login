const express = require(`express`);
const app = express();
const port = 3000;

// Le digo que en la carpeta view es donde tendré documentos estaticos
app.use(express.static(`views`));

//Rutas
app.get(`/`, (req, res) => {
    res.sendFile(`${__dirname}/views/home.html`)
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

