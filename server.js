var express = require('express');
var app = express();
const querystring = require('querystring');
var session = require('express-session');

// express middleware the automatically de-codes data encoded in a post request and allows it to be accessed through request.body
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: "MySecretKey", resave: true, saveUninitialized: true }));

// Set up session middleware
app.use(
    session({
       secret: 'secretkeyyy',
       resave: false,
       saveUninitialized: true
    })
 );

// starts the server; outputs the port in console
app.listen(8080, () => console.log(`listening on port 8080`))

/* enable server to respond to requests for static files (files that are not intended to have any server-processing); files must be located in a directory called "public"; the following uses the Express static middleware component */
app.use(express.static(__dirname + '/public'));

// monitor all requests; this manages what is output in the console for all requests
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);

    // utilize sessions to keep users logged in; initialize an object to store the login data in the session
   if (typeof request.session['login'] == 'undefined') {
    request.session['login'] = {};
 }

 // initialize a session array to store all the names that are currently logged in 
 if (typeof request.session['students'] == 'undefined') {
   request.session['students'] = [];
}

 // set flag, assume user is not logged in; if the session has the username, then change flag to true
 if (typeof request.session.login.username == 'undefined') {
    request.session.login.loggedIn = false;
 } else {
    request.session.login.loggedIn = true;
 }
 next();
});



// load file system (fs) interface
var fs = require('fs');

// read user_data file and parse into an object; this file is intended to maintain student login information 
var filename = __dirname + '/user_data.json';
var user_data_object_JSON = fs.readFileSync(filename, 'utf-8');
var user_data = JSON.parse(user_data_object_JSON);

// read teacher_data file and parse into an object; this file is intended to maintain teacher login information 
var newfile = __dirname + '/teacher_data.json';
var teacher_data_object_JSON = fs.readFileSync(newfile, 'utf-8');
var teacher_data = JSON.parse(teacher_data_object_JSON);






//THE FOLLOWING ROUTES PERTAIN TO THE LOGIN PROCESS OF THE SOFTWARE
//route for when users log in; direct to home page if successful
app.post("/login", function (request, response) {

    // Process login form POST and redirect to home page if ok, back to login page if not
 
    // assign variables to collect the values entered into the username and password fields
    var username = request.body[`uname`].toLowerCase();
    var password = request.body[`psw`];
 
    // assign empty variable to collect error; alert of incorrect password, or prompt user to create an account if username does not exist 
    var error_check = [];
 
    // check that all fields have been filled out
    if (username.length == 0 || password.length == 0) {
       error_check.push('Please fill out all fields');
       response.redirect('./login.html?' + querystring.stringify({ error_check: `${JSON.stringify(error_check)}` }));
    }
 
    // if username does not exist, redirect back to login.html, pass error via query string
    if (!user_data.hasOwnProperty(`${username}`) && !teacher_data.hasOwnProperty(`${username}`)) {
       error_check.push(`The email you've entered does not exist, please create a new account`);
       response.redirect('./login.html?' + querystring.stringify({ error_check: `${JSON.stringify(error_check)}` }));
    }
 
    // if username does exist, but password is incorrect, redict back to login.html, pass error via query string
    if (user_data.hasOwnProperty(`${username}`) && password !== user_data[username][`password`] || teacher_data.hasOwnProperty(`${username}`) && password !== teacher_data[username][`password`]) {
       error_check.push(`Incorrect password for ${username}`);
       response.redirect('./login.html?' + querystring.stringify({ error_check: `${JSON.stringify(error_check)}` }));
    }
 
    //for STUDENTS: check if the username exists in either the user_data file and that the password matches appropriately
    if (user_data.hasOwnProperty(`${username}`) && password == user_data[username][`password`]) {
 
       // store the user data in the session
       if (!request.session.login) {
          request.session.login = {};
       }
       
       //store the user's name in the session 
       request.session.login.name = user_data[username][`name`];

       // push user's name to the end of the session array that stores all name's of those currently logged in 
       request.session.students.push(request.session.login.name);
       console.log(request.session.students);

       // set the flag to indicate that the user is logged in
       request.session.login.loggedIn = true;

       console.log(request.session.login);
       response.redirect('./home_student.html');
    }

     //for TEACHERS: check if the username exists in either the user_data file and that the password matches appropriately
     if (teacher_data.hasOwnProperty(`${username}`) && password == teacher_data[username][`password`]) {
 
      // store the user data in the session
      if (!request.session.login) {
         request.session.login = {};
      }

      // set the flag to indicate that the user is logged in
      request.session.login.loggedIn = true;

      console.log(request.session.login);
      response.redirect('./home_teacher.html');
 }});
 







 // THE FOLLOWING ROUTES PERTAIN TO THE REGISTRATION PROCESS
 //store a 'succesful login' variable that will display when the user successfully creates a new account
 var successful_login = []
 
 // THIS FIRST PART DEALS WITH REGISTERING AS A STUDENT
 app.post('/registration_student.html', function (request, response) {
    // process a simple register form
    username = request.body.email.toLowerCase();
 
    var reg_errors = []; // an empty error to store errors; intended to be passed back to registration page via query string
 
    // check that all required fields have been filled out
    if (request.body.email == '' || request.body.name == '' || request.body.password == '' || request.body.repeat_password == '') {
       reg_errors.push('Please fill out all fields');
       response.redirect('./registration_student.html?' + querystring.stringify({ ...request.body, reg_errors: `${JSON.stringify(reg_errors)}` }));
 
    }
 
    // Check if the email address is in the correct format
    function validateEmail(email) {
       // Regular expression to validate email address
       const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
       return regex.test(String(email).toLowerCase());
    }
 
    // Check if the email address is already taken
    if (!validateEmail(request.body.email)) {
       reg_errors.push('Please enter a valid email address');
    } else if (user_data.hasOwnProperty(request.body.email.toLowerCase())) {
       reg_errors.push('This email address is already registered. Please use a different email address');
    }
 
    // Check if password is between 10 and 16 characters long
    if (request.body.password.length < 10 || request.body.password.length > 16) {
       reg_errors.push('Password must be between 10 and 16 characters long');
    }
 
    // Check if password contains spaces
    if (/\s/.test(request.body.password)) {
       reg_errors.push('Password cannot contain spaces');
    }
 
    // Check if password and confirm password match
    if (request.body.password !== request.body.repeat_password) {
       reg_errors.push('Passwords do not match.');
    }
 
    // if validations pass, write new user data to users_data.json file
    if (Object.keys(reg_errors).length == 0) {
       user_data[username] = {};
       user_data[username].name = request.body.name;
       user_data[username].password = request.body.password;
       fs.writeFileSync(filename, JSON.stringify(user_data));
 
       // push this to display when the user return to login after successfully registering a new account 
       successful_login.push(`Your account has been registered!`)
       response.redirect('./login.html?' + querystring.stringify({ successful_login: `${JSON.stringify(successful_login)}` }));
    } else if (reg_errors.length > 0) {
 
       //make user stay if registration page if there are errors. Pass errors via query string
       response.redirect('./registration_student.html?' + querystring.stringify({reg_errors: `${JSON.stringify(reg_errors)}` }));
    }
 
 });
 
 // clear registration errors from query string after the user gets an alert and hits "ok"
 app.get('/registration_student.html', function (request, response) {
    response.sendFile(__dirname + '/public' + '/registration_student.html');
 });




//THIS SECOND PART DEALS WITH REGISTERING AS A TEACHER
app.post('/registration_teacher.html', function (request, response) {
   // process a simple register form
   username = request.body.email.toLowerCase();

   var reg_errors = []; // an empty error to store errors; intended to be passed back to registration page via query string

   // check that all required fields have been filled out
   if (request.body.email == '' || request.body.name == '' || request.body.password == '' || request.body.repeat_password == '') {
      reg_errors.push('Please fill out all fields');
      response.redirect('./registration_teacher.html?' + querystring.stringify({ ...request.body, reg_errors: `${JSON.stringify(reg_errors)}` }));

   }

   // Check if the email address is in the correct format
   function validateEmail(email) {
      // Regular expression to validate email address
      const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      return regex.test(String(email).toLowerCase());
   }

   // Check if the email address is already taken
   if (!validateEmail(request.body.email)) {
      reg_errors.push('Please enter a valid email address');
   } else if (teacher_data.hasOwnProperty(request.body.email.toLowerCase())) {
      reg_errors.push('This email address is already registered. Please use a different email address');
   }

   // Check if password is between 10 and 16 characters long
   if (request.body.password.length < 10 || request.body.password.length > 16) {
      reg_errors.push('Password must be between 10 and 16 characters long');
   }

   // Check if password contains spaces
   if (/\s/.test(request.body.password)) {
      reg_errors.push('Password cannot contain spaces');
   }

   // Check if password and confirm password match
   if (request.body.password !== request.body.repeat_password) {
      reg_errors.push('Passwords do not match.');
   }

   // if validations pass, write new user data to teacher_data.json file
   if (Object.keys(reg_errors).length == 0) {
      teacher_data[username] = {};
      teacher_data[username].name = request.body.name;
      teacher_data[username].password = request.body.password;
      fs.writeFileSync(newfile, JSON.stringify(teacher_data));

      // push this to display when the user return to login after successfully registering a new account 
      successful_login.push(`Your account has been registered!`)
      response.redirect('./login.html?' + querystring.stringify({ successful_login: `${JSON.stringify(successful_login)}` }));
   } else if (reg_errors.length > 0) {

      //make user stay if registration page if there are errors. Pass errors via query string
      response.redirect('./registration_teacher.html?' + querystring.stringify({reg_errors: `${JSON.stringify(reg_errors)}` }));
   }

});

// clear registration errors from query string after the user gets an alert and hits "ok"
app.get('/registration_teacher.html', function (request, response) {
   response.sendFile(__dirname + '/public' + '/registration_teacher.html');
});








// THE FOLLOWING ROUTES PERTAIN TO THE "GROUP" MODE OF THE SOFTWARE
 //create a route to validate the group mode of the 
 app.post('/group_sort', function (request, response) {
   var group_number = request.body.desired_groups;
   var errors = []; // an empty array to store validation errors; number of groups must be more than 0 and must not exceed (the number of students currently logged in)/2

   var students = request.session.students.length;
   if (group_number <= 1){
      errors.push('Please enter a number greater than 1');
      response.redirect('./group.html?' + querystring.stringify({ errors: `${JSON.stringify(errors)}` }));
   }if (group_number > (students/2)){
      errors.push('Students must be sorted into groups of 2 or more'); 
      response.redirect('./group.html?' + querystring.stringify({ errors: `${JSON.stringify(errors)}` }));
   } else{
      response.redirect("./index.html")
   }
});

