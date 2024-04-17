const bodyParser = require(`body-parser`);
const express = require(`express`);
const app = express();
const port = 3000;
const mongoose = require(`mongoose`);
const User = require(`./models/users`);
const  bcrypt = require('bcrypt');

//Connect to MongoDB

mongoose.connect(`mongodb+srv://Chrifer:<password>@cluster0.9ctoone.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {}).then(() => {
    console.log(`Connected to MongoDB`);
}).catch((error) => {
    console.log(`MongoDB connection error: `, error)
});

// Le digo que en la carpeta view es donde tendré documentos estaticos
app.use(express.static(`views`));

app.use(bodyParser.urlencoded({extended: false})) //Ver el codigo de los request

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

// { name, email, username, password }

app.post(`/register`, async(req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.sendFile(__dirname + `/views/registered_ko.html`)
        } else {

        
        // Hash the password
        const hashedPassword = await(bcrypt.hash(password, 10))

        // Nuevo usuario
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
    
        await newUser.save();
        res.sendFile(__dirname + `/views/registered.html`)
        
        }
    
    } catch (error) {

        console.error(error);
        res.status(500).send(`Internal server error`);

    }    
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


