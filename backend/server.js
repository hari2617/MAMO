import express from 'express'
import { authcheck } from './middleware/authcheck.js';
import cors from 'cors'
import session from 'express-session'
import bcrypt from 'bcrypt'
import { User } from './Schema/userSchema.js';
import mongoose from 'mongoose';
import { v2 as cloudinary } from "cloudinary"; //imge file to link 
import { Listing } from "./Schema/userListings.js";
import dotenv from "dotenv";
import upload from './middleware/upload.js';

import fs from "fs";




const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())

app.use(session({
    secret:"ayyappa",
    resave:false,
    saveUninitialized:false,
    cookie:{
    secure: false,      // true only if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }

}))


const PORT = 7000;
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})

app.use("/uploads", express.static("uploads"));   //image stuffs

mongoose
  .connect("mongodb://127.0.0.1:27017/authdb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* -------------------- converting image file to link -------------------- */

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* -------------------- -------------------- */

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

        console.log("BEFORE:", req.session);

        req.session.user = {
            id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            profImage: findUser.profImage
        };

        req.session.login = true
            console.log("LOGIN SESSION ID:", req.sessionID);
    console.log("LOGIN USER:", req.session.user);
        console.log("AFTER:", req.session.user);

        

        res.send( req.session.user)
        
        
    }
    catch(err){
        console.log(err);
    }
    

})

//                          this (upload) is multer middleware(used to handle multitype data like file and json )here we have images as file and others as json 
//so we need multer to convert images as req.files, and others as req.body
app.post("/api/postListings",upload.array("images",10),async (req, res) => {
   
  //console.log(req.body)  other details
  //console.log(req.files)  image files

  /* converting the images files to cloud link   */
  //cloudinary takes the images host in cloud and give the link
  const imageLinks = await Promise.all(
  req.files.map(async (file) => {
    const result = await cloudinary.uploader.upload(file.path, {
    folder: "MAMO/listings",
    });

    fs.unlinkSync(file.path); // delete local file

    return result.secure_url;
  })
);

console.log(imageLinks);


     
  try{
      const listing = await Listing.create({
        ownerId: req.session.user.id  ,
        title: req.body.title,
        platform: req.body.platform,
        username: req.body.username,
        followers_count: req.body.followersCount,
        engagement_rate: req.body.engagementRate,
        monthly_views: req.body.monthlyViews,
        niche: req.body.niche,
        price: req.body.price,
        description: req.body.description,
        country: req.body.country,
        ageRange: req.body.ageRange,
        monetized: req.body.monetized,
        images:imageLinks
      });

      const allListing=await Listing.find()

      console.log("listing sent to DB")

      res.status(201).send(allListing);

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Image upload failed",
      });
    }
  }
);



app.get("/api/getListings", async(req,res)=>{
    
  try{
    const allListings = await Listing.find()
    console.log(allListings)

    if(allListings.length>0){
      return res.status(200).send(allListings)
    }
    else{
      return res.status(404).send("NO LISTINGS FOUND")
    }

  }
  catch(err){
    console.log(err)
    res.status(500).send(err)
  }

})



app.delete('/api/deleteListing',async(req,res)=>{
  const {id}=req.body

  try{
    const result=await Listing.deleteOne({_id:id})
    console.log("success",result)
    const allList=await User.find()
    res.status(200).send(allList)
  }
  catch(err){
    console.log(err)
    res.status(500).send(err)
  }
})


app.get("/api/getListings/:id", async(req,res)=>{
    
  try{
  const listing = await Listing.findById(req.params.id)   
  console.log(listing)

    if(listing){
      return res.status(200).send(listing)
    }
    else{
      return res.status(404).send("LISTING NOT FOUND")
    }

  }
  catch(err){
    console.log(err)
      res.status(500).send(err)

  }

})


app.put("/api/editListing/:id",upload.array("images",10),async (req, res) => {
   
  const id = req.params.id

  const list = await Listing.findById(id)

  if(!list){
    req.status(404).send("List not found")
  }

  letmimageLInks=list.images

  if(req.file && req.file>0){
    
  }
  //cloudinary takes the images host in cloud and give the link
  const imageLinks = await Promise.all(
  req.files.map(async (file) => {
    const result = await cloudinary.uploader.upload(file.path, {
    folder: "MAMO/listings",
    });

    fs.unlinkSync(file.path); // delete local file

    return result.secure_url;
  })
);

console.log(imageLinks);


     
  try{
      const listing = await Listing.create({
        ownerId: req.session.user.id  ,
        title: req.body.title,
        platform: req.body.platform,
        username: req.body.username,
        followers_count: req.body.followersCount,
        engagement_rate: req.body.engagementRate,
        monthly_views: req.body.monthlyViews,
        niche: req.body.niche,
        price: req.body.price,
        description: req.body.description,
        country: req.body.country,
        ageRange: req.body.ageRange,
        monetized: req.body.monetized,
        images:imageLinks
      });

      const allListing=await Listing.find()

      console.log("listing sent to DB")

      res.status(201).send(allListing);

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Image upload failed",
      });
    }
  }
);


