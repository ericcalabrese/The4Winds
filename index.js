var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser')

var app = express();



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())


var port = process.env.PORT || 3000;

app.get('/', function(req, res){
	res.render('public');
});

app.post('/send',function(req,res){
    var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "t4wmessage@gmail.com",
        pass: "chasedabass123"
    }
}); 
    console.log(req.body)
    var message2 = `Name: ${req.body.name} 
                    Email Address: ${req.body.email} 
                    Phone Number: ${req.body.number}
                    Message: ${req.body.text}`
    var message = req.body.text + ' \nsent from  ' + req.body.number + ' using eric\'s app'
    var mailOptions={
    	from: req.body.email,
        // from: req.body.name, `<${req.body.email}>`,
    	to: 'calabrese.eric@gmail.com',
    	subject: 'New Message from your Website',
        // number: req.body.number,
        text : message2,
        html: `<h3>Name: ${req.body.name}</h3>
                <p>Message: ${req.body.text}</p>
                <p>Email: ${req.body.email}</p>
                <p>Phone Number: ${req.body.number}</p>`
    }
    console.log(mailOptions);
    console.log(req.body.number);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
          return  console.log(error);
        // res.end("error");
     }else{
            console.log("Message sent: ");
        // res.render('public');
            res.redirect("/contact.html");
         }
});
});

app.listen(port, function(){
	console.log("Server started on " + port)
});