const port = 4000;

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { error } = require('console');
const { type } = require('os');

app.use(express.json());

app.use(cors());

// DataBase Connection with Mongodb
mongoose.connect('mongodb+srv://Shop:Siva123456789@cluster0.rophuai.mongodb.net/Shop');


//API Creation

app.get('/', (req,res) => {
    res.send('Expree App is Running');
});

// Image Storage Engine
const Storage = multer.diskStorage({
    destination: './Upload/Images',
    filename: (req,file,cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({storage:Storage});

app.use('/images',express.static('Upload/Images'));

// Creating Upload Endpoint for Images
app.post('/upload', upload.single('product'), (req,res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
});

// Schema for creating products
const Product = mongoose.model('Product', {
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }
});

// Schema for creating products
const NewCollection = mongoose.model('NewCollection', {
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }
});

//Endpoint for AddProduct
app.post('/addproduct', async (req,res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product = products.slice(-1)[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });
    await product.save();
    res.json({
        success: true,
        product: req.body.name
    })
});

//Endpoint for AddCollectionProduct
app.post('/addCollectionProduct', async (req,res) => {
    let Collectionproducts = await NewCollection.find({});
    let id;
    if (Collectionproducts.length > 0) {
        let last_product = Collectionproducts.slice(-1)[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const Collectionproduct = new NewCollection({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });
    await Collectionproduct.save();
    res.json({
        success: true,
        product: req.body.name
    })
});

//Creating API for deleting products
app.post('/removeproduct', async (req,res) => {
    await Product.findOneAndDelete({id:req.body.id});
    res.json({
        success: true,
        name: req.body.name
    })
});

//Creating API for getting allProducts
app.get('/allproducts', async (req,res) => {
    let products = await Product.find({});
    res.send(products);
});

//Creating API for getting newcollectionproducts
app.get('/allNewCollections', async (req,res) => {
    let products = await NewCollection.find({});
    res.send(products);
});


// Schema for Users
const User = mongoose.model('User', {
    name: {
        type: String,
    },
    mobile: {
        type: Number,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    email: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

// API Endpoint for User Login
app.post('/login', async (req,res) => {
    let users = await User.find({});
    let existUser = users.filter((product) =>{ return product.mobile === Number(req.body.mobile)});
    if (existUser.length > 0) {
        res.json({
            success: true,
            mobile: req.body.mobile,
            status: 'Exist User'
        })
    } else {
        const user = new User({
            mobile: req.body.mobile,
            otp: req.body.otp,
            email: req.body.email ? req.body.email : '',
            name: req.body.name ? req.body.name : '',
        });
        await user.save();
        res.json({
            success: true,
            mobile: req.body.mobile,
            status: 'New User'
        });
    }
    
});

app.get('/users', async (req,res)=> {
    let users = await User.find({});
    res.send(users);
    console.log(users);
})

app.listen(port,(error) => {
    if (!error) {
        console.log('Server Running on Port' + port);
    } else {
        console.log('Error : ' + error);
    }
})