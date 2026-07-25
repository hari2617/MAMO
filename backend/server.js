import express from 'express'
import { authcheck } from './middleware/authcheck.js';
import cors from 'cors'
import session from 'express-session'
import bcrypt from 'bcrypt'
import { User } from './Schema/userSchema.js';
import multer from "multer";
import mongoose from 'mongoose';





const app = express()
app.use(cors({
    origin: "http://localhost:5173", // React frontend URL
    credentials: true,               // Allow cookies
  }))

app.use(session({
    secret:"ayyapp",
    resave:false,
    saveUninitialized:false,
    cookie:{
    secure: false,      // true only if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }

}))

app.use(express.json())

const PORT = 7000;
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})

app.use("/uploads", express.static("uploads"));   //image stuffs

mongoose
  .connect("mongodb://127.0.0.1:27017/authdb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));



/* -------------------- MULTER(image) -------------------- */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* --------------------------------------- */

app.get('/',(req,res)=>{
    res.send("hello")
})

app.get('/api/auth/check',(req,res)=>{
    
    console.log(req.session.login)
    if(!req.session.login){
        console.log("not found in middleware")
        return res.status(401).send("Need to login")
    }
    
    res.json({
        user: req.session.user
    });

})


app.post('/api/signInDetails', upload.single("profImage"),async (req,res)=>{
     try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileImage = req.file
      ? req.file.filename
      : "default.png";

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profImage: profileImage,
    });

    res.status(201).json({
      message: "User Created",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
})

app.post('/api/loginDetails',async(req,res)=>{
    
    const {email,pass} = req.body

    try{
        const findUser = await User.findOne({email})

        if(!findUser){
            return res.status(401).send("Account does not exist, create new account")
        }
        
        const isMatch = await bcrypt.compare(pass,findUser.password);

        if(!isMatch){
            return res.status(401).send("invalid credentials")
        }

        req.session.user = {
            id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            profImage: findUser.profImage
        };
        req.session.login = true
        res.send(findUser)
        
        
    }
    catch(err){
        console.log(err);
    }
    

})
