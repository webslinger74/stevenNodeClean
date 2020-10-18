const dotenv = require('dotenv');   // this is used to allow env variables in the .env file be passed
dotenv.config();

// setup of the express server
const express = require('express');
const app = express();

// this is used to obtain variables from front end such as in forms and attach the named variable to the body object req.body.name
const bodyParser = require('body-parser')

const mustacheExpress = require('mustache-express');

// add extra routes to be used via express.Router
var kudos = require('./routes/kudos');
const nominees = require('./routes/nominees');

// imports the mongoConnection deetails
const mongoClient = require('./mongoConnection');

// this sets up the static folders from the public so css can be easily loaded from the public folder at run time.
app.use(express.static(__dirname + '/public'));

//this sets up mustache as template engine and sets the views folder for easy rendering of templates from this folder
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/kudos', kudos);
app.use('/nominees', nominees);
app.use(bodyParser.urlencoded({ extended : true}));   // attaches variables from say name in form to the body property req.body.name

app.get('/', (req, res) => {
    res.render('index.html', {"name1": "Kudo Super App!"});
});

app.post('/', (req, res)=> {
  
    mongoClient.connect((err,client) => {
        console.log("connected to the database!!");
        const collection = mongoClient.db("stevenTest").collection("kudos");
         collection.insertOne({
            "nominee" : req.body.nominee,
            "nominator" : req.body.nominator,
            "reasons" : req.body.reasons
         }).then((res)=>{
             console.log(res);
         }).catch((err) => {
             console.log(err);
         })
             
        })
        mongoClient.close();
    res.render('results.html', {
        "reasons" : req.body.reasons,
        "nominee" : req.body.nominee,
        "nominator" : req.body.nominator
    });

});

app.post('/delete', (req, res) => {
    mongoClient.connect(err => {
        const collection = mongoClient.db("stevenTest").collection("kudos");
         collection.findOneAndDelete({nominee: req.body.nominee3},
           (err,data) => {
           });
        mongoClient.close();
});
res.render('index.html', 
{}
)

});

app.post('/update', (req, res) => {
    console.log("hit this point at least");
    mongoClient.connect(err => {
        const collection = mongoClient.db("stevenTest").collection("kudos");
         collection.findOneAndUpdate({nominee: req.body.nominee3},
            {$set:{"reasons": req.body.reasons2}},
            {}).then((result) => {
                console.log("the data has been updatd ", result);
            }).catch(err => {
                console.log("failed to update ", err);
            });
        mongoClient.close();

})
    res.render('index.html', 
        {
        "reasons" : req.body.reasons2 
        }
    )
});

app.listen(`${process.env.PORT}`, ()=> {
    console.log(`the server is listening on port ${process.env.PORT}`);
})
