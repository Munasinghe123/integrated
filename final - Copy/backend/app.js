const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const userRoutes = require('./routes/userRoutes.js');
const UserModel = require('./model/userModel.js')
const cors = require('cors');
const app = express()
app.use(express.json())
const Promotion = require('./routes/Promotion.route.js');

const ReviewRoute = require('./routes/Reviews.route.js');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use("/promo",Promotion)
app.use("/review",ReviewRoute)

// Routes
app.use("/users", userRoutes);


// Session configuration
app.use(session({
    secret: 'sliit',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://jaya:employee@employee.7h8nmby.mongodb.net/sessions',
        collectionName: 'sessions',
    }),
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24, sameSite: 'lax', } // 1 day
}));

app.post("/newUser", (req, res) => {
    const newUser = new UserModel(req.body);

    newUser.save()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

app.post("/api/auth/login", async (req, res) => {
    const { userName, password } = req.body;
    const user = await UserModel.findOne({ userName });
    if (user && user.password === password) {
        req.session.user = user; 
        res.json({
            user: {
                userName: user.userName,
                id: user._id,
                role: user.role // Store the role in the session
            }
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.json({ message: 'Logged out' });
    });
});

app.get("/api/auth/check-session", (req, res) => {

    console.log("Session Data:", req.session); // Log the session data
    
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ message: 'No session' });
    }
});




mongoose.connect("mongodb+srv://jaya:employee@employee.7h8nmby.mongodb.net/?retryWrites=true&w=majority&appName=employee")
    .then(()=>console.log("connected to mongo"))
    .then(()=>{
        app.listen(5000)
    })
    .catch((err)=> console.log((err)))
