let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session');
// Middlewares 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('trust proxy', 1) ;
app.use(session({
  secret: 'qdfkdslfkmqlk',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));









// Template Engine
app.set('view engine','ejs');
app.use(express.static('public'));


// Routes
app.get('/', (request, response) => {
	response.render('templates/index',{error: request.session.error});
});


app.get('/post', (request, response) => {
	response.send('Let\'s begin bruh ! ');
});


app.post('/', (request, response) => {
	if(request.body.message=== undefined || request.body.message===''){
		request.session.error=" Erreur de nul.";
		response.redirect('/');
	}
})
app.listen(8080);