const express = require('express');
const app = express();
app.use(express.static('/js'));
app.use(express.json());
const Datastore = require('nedb');
const fetch = require('node-fetch');


const database = new Datastore('database.db');
database.loadDatabase();


app.use(express.static('assets'));

app.listen(3000,()=>{
  console.log('Server is running at 3000');
})


// database.insert({"Country" : "India", "State": "Maharashtra", "City": "Mumbai", "Address": "ABC", "Blood_Type": "O +", "Donor_Type": "Plasma", "Name": "Parth"});



app.get('/',function(req,res){
  console.log('Running Server');
  res.sendFile(__dirname + '/index.html');
})
//send users data
app.get ('/data',function(req,res){
  database.find({},(err,data)=>{
    if(err){
      console.log(err);
      res.end();
      return
    }
    res.json(data)
    console.log(data);
  })
});


app.route('/register')
 	.get(function (req, res) {
		res.sendFile(__dirname + '/Register.html');
	});

app.get('/success', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

//inser user data to database
app.post('/api', (req,res)=>{
  console.log(req.body);
  const data = req.body;
  data.timestamp = Date.now();
  database.insert(data);
  res.send('Success');
  // res.sendFile(__dirname + '/index.html'); //here the redirect takes place
  // res.redirect(__dirname + '/success')

});
