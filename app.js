var express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { default: mongoose } = require("mongoose");
const methodOverride = require("method-override");
var bodyParser = require("body-parser");
var app = express();
const bcrypt = require("bcrypt");
app.set("view engine", "ejs");
const Model = require("./models/Model");
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
const path = require("path");
const User = require("./models/User");



// Pour le path du dossier "public" pour y mettre CSS JS IMG
app.use(express.static(path.join(__dirname, "public")));


const url="mongodb+srv://Lucile:123test@cluster0.ur9qvge.mongodb.net/?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    };

mongoose.connect(url, connectionParams).then(() => {
    console.log("MongoDB database connected !");
}).catch((err) => console.log(err));

app.get("/", function(req, res) {
    Model.find().then((data) => {
        res.render("Home", { data:data });
    })
    .catch((err) => console.log(err));
})

app.get("/rdv", function(req, res) {
    Model.find().then((data) => {
        res.render("Rdv", { data:data });
    }).catch((err) => console.log(err));
})

app.post("/submit-rdv", function (req, res) {
    const Data = new Model({
        lastname : req.body.lastname,
        firstname : req.body.firstname,
        email : req.body.email,
        rdvDate : req.body.rdvDate,
        rdvHeure : req.body.rdvHeure,
    });
    Data.save().then(() => {
        console.log("Data saved successfully");
        res.redirect("/");
    }).catch(err => console.log(err));
});


// API pour l'authentification
app.post("/api/register", (req, res) => {
    const Data = new User({
        username:req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 10), //crypte le MDP
        admin:false
    })
    Data .save().then(() =>{
        console.log('Signed in');
        res.redirect('/');
    });
});

app.get("/register", (req, res) => {
    res.render("Register");
});

// Se connecter
app.get("/login", (req, res) => {
    res.render("Login");
});

app.post('/api/login', (req, res) => {
    User.findOne({
        email:req.body.email
    }).then(user =>{
        if(!user){
            return res.status(404).send('No user found.');
        }
        console.log(user);
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(404).send('Invalid password');
        }
        // if(user.password != req.body.password){
        //     return res.status(404).send('Invalid password');
        // }
        res.render('UserPage', {data:user});
    }).catch(err => console.log(err));
});











const port = 5001;
// const port = process.env.PORT || 5000;

var server = app.listen(port, function () {
    console.log("Node server is running!!");
});


