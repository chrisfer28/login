const express = require(`express`);
const app = express();
const port = 3000;
const mongoose = require(`mongoose`);

// Le digo que en la carpeta view es donde tendré documentos estaticos
app.use(express.static(`views`));

//Rutas
//Te envia cuando pones localhost:3000 a la pagina home
app.get(`/`, (req, res) => {
    res.sendFile(`${__dirname}/views/home.html`)
});

app.get(`/register`, (req, res) => {
    console.log(req);
    res.sendFile(`${__dirname}/views/register.html`);
    console.log(`Estas en register`)
})

app.get(`/login`, (req, res) => {
    res.sendFile(`${__dirname}/views/login.html`)
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

//Connect to MongoDB

mongoose.connect(`mongodb+srv://Chrifer:<password>@cluster0.9ctoone.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {}).then(() => {
    console.log(`Connected to MongoDB`);
}).catch((error) => {
    console.log(`MongoDB connection error: `, error)
});


