// Carrega variáveis do arquivo .env, se existir (Node 20.12+)
try { process.loadEnvFile(); } catch (e) { }

const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const middleware = require('./middleware')
const path = require('path')
const bodyParser = require("body-parser")
const mongoose = require("./database");
const session = require("express-session");

const server = app.listen(port, () => console.log("A porta do servidor é: " +port));

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: process.env.SESSION_SECRET || "troque-esta-chave",
    resave: true,
    saveUninitialized: false
}))

// Rotas
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const postRoute = require('./routes/postRoutes');
const profileRoute = require('./routes/profileRoutes');
const logoutRoute = require('./routes/logout');
const uploadRoute = require('./routes/uploadRoutes');
const searchRoute = require('./routes/searchRoutes');
const messagesRoute = require('./routes/messagesRoutes');

// API rota
const postsApiRoutes = require('./routes/api/posts');
const usersApiRoutes = require('./routes/api/users');
const chatsApiRoutes = require('./routes/api/chats')
const messagesApiRoutes = require('./routes/api/messages')

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/posts",middleware.requireLogin, postRoute);
app.use("/profile",middleware.requireLogin, profileRoute);
app.use("/uploads",uploadRoute);
app.use("/logout", logoutRoute);
app.use("/search", middleware.requireLogin,searchRoute);
app.use("/messages", middleware.requireLogin, messagesRoute);

app.use("/api/posts", postsApiRoutes);
app.use("/api/USERS", usersApiRoutes);
app.use("/api/chats", chatsApiRoutes);
app.use("/api/messages", messagesApiRoutes);


app.get("/", middleware.requireLogin, (req, res, next) => {

    var payload = {
        pageTitle: "OnusPro - Integrando Sonhos",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
    }

    res.status(200).render("home", payload);
})