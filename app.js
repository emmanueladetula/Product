const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const { createUser } = require("./validation");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT ||3500;

dotenv.config({ path: "./config.env" });

mongoose.connect("mongodb://127.0.0.1:27017/createUser", {
  useNewUrlParser:true,
});

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password:{
    type: String,
  },
  createAt: String,
});
const UserName = mongoose.model("UserName",userSchema);
app.post("/Signup-account", (req, res) => {
  const { error, value } = createUser(req.body);
  if (error) {
    return res.status (404)
  }
  try {
    const Signup = new UserName({
      userName: value.UserName,
      emailAddress: value.email,
      password: value.password,
      phone: value.Number,
      createAt: Date(),
    });
    Signup.save();
    res.status(200).send("newUser created successfully!!!");
  } catch (error) {
    console.error(error);
  }
  console.log(process.env);
  res.send("Signup-account");
});
app.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      const passwordMatch = await user.comparePassword(password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  });

app.post('/Product', async (req, res)=>{
    const { error, value}=schema.validate(req.body)
    console.log(req,body);
    if(error){
        console.log(error);
    }
    console.log(value)
    try{
        const prod = Goods({
            name:value.name,
            price:value.price,
            description:value.description,
            rating:value.rating,
            category:value.category
        })
        const pro = await product.save();
        res.status(200).send("product created")
        console.log(product)
    } catch (error) {
        console.error('Error creating Product:', err.message);
    }
    }
)
  app.put ('/update items', async (req, res)=>{
    const {id, price}= req.body;
    try{
        await product.updateOne({_id : id}, {$set:{price:price}});
        res.status(201).send("updated successfull");

    } catch (error){
        console.log(error);
    }
  });
  app.delete("/delete", async (req, res)=>{
    try{
        const deleteProduct= await product.deleteOne({
            _id:req.body.id,
        });
        res.status(201).send("deleteProduct");
    }catch(error){
        console.log(err);
    }
  });


app.listen(3500, console.log("server running"))

