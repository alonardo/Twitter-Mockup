const express = require('express')
const dotenv = require('dotenv')
const path = require('path')

const app = express()
dotenv.config()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/src/templates/views'))
app.use(express.json())


const loginRequired = function(req, res, next){
    if (!req.headers.authorization){
        return res.sendStatus(401)
    } 
    token = req.headers.authorization.slice(7)
    user = people.filter(p=>p.token ==token)
    if (user.length <= 0){
        return res.sendStatus(401)
    }
    next()
}

app.post("/login",(req, res)=>{
    const email = req.body.email
    const password = req.body.password
    user = people.filter(p=>p.email==email)[0]
    if (!user){
        res.sendStatus(401)
    }else{
        const token = `${Math.random().toString(36).slice(2)}`
        user.token = token
        res.send(user.token)
    }
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server running at http://localhost:${process.env.PORT} ...`)
})

app.get("/", (req, res)=>{
    res.render('index')
})

app.get("/welcome",(req, res)=>{
    res.send('Welcome to Tweeta!')
})

app.use(['/profile', '/user'],loginRequired)

app.get("/", (req, res)=>{
    res.render('index')
})

app.get("/user/:id", (req, res)=>{
                    // name in EJS : name in my JS
    res.render('user', {id:id})
})

app.get("/profile", (req, res)=>{
    res.render('profile')
})

app.get("/login", (req, res)=>{
    res.render('login')
})
app.get("/register", (req, res)=>{
    res.render('register')
})

app.get("/pages", (req, res)=>{
    res.render('pages')
})
