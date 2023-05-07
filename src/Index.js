const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const path = require ('path');
const multer = require ('multer');
const mongoose = require('mongoose');
const Signup = require('./model/SignUp');

// constants
const app = express ();
const PORT = process.env.PORT || 5000;
mongoose.connect("mongodb+srv://ayush:ayush@cluster0.sggba.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
})
.then(()=>{
    console.log('connected to db');
})

// middleware
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true}));
app.use (cors ());

// storage engine for multer
const storageEngine = multer.diskStorage ({
  destination: './public/uploads/',
  filename: function (req, file, callback) {
    callback (
      null,
      file.fieldname + '-' + Date.now () + path.extname (file.originalname)
    );
  },
});

  // file filter for multer
  const fileFilter = (req, file, callback) => {
    let pattern = /jpg|png|svg|pdf/; // reqex

    if (pattern.test (path.extname (file.originalname))) {
      callback (null, true);
    } else {
      callback ('Error: not a valid file');
    }
  };


const upload = multer ({
  storage: storageEngine,
  fileFilter: fileFilter,
});

app.post ('/upload', upload.single ('uploadedFile'), async(req, res) => {
  try{
    res.json (req.file).status (200);
    console.log(req.file);
  }
  catch(e){
    console.log(e);
  }
  

});
app.post('/signup',async(req,res)=>{
  const signup = new Signup({
    name:req.body.name,
    email:req.body.email,
    password:req.body.pass
  })
  const insertR = await signup.save();
  res.send('data saved');
  console.log(insertR);
})

app.listen (PORT, () => console.log (`Server running on port: ${PORT}`));
