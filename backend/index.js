const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const mongoose = require("mongoose");
const usermodel = require("./models/usermodel");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/api/getUsers", (req, res) => {
  usermodel
    .find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.post("/api/postUser", async (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // const userExists = usermodel.findOne({email});
  // if (userExists) {
  //   res.status(400).json({ msg: "Email already exists" });
  // }

  try {
    const user = await usermodel.create({
      name,
      email,
      age,
    });
    res.send("User registered successfully");
    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
  }
});


app.delete("/api/delete",(req,res)=>{
 const{userid}=req.params.userid;
 try {
  usermodel.deleteOne({_id : userid},(err,res)=>{

    console.log(err);
    res.send('Deleted Successfully');
  })

  
 } catch (error) {
  console.log(error);
 }
 
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
