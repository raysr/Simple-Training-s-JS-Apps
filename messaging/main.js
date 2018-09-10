let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session');
let Message = require('./models/message');

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
	let messages = Message.all((messages)=>{
		response.render('templates/index',{error: request.session.error,success:request.session.success,messages:messages});
	});
	
});

app.get('/message/:id', (request, response)=>{
let mes = Message.find(request.params.id, (message)=>{
	response.render('templates/message',{message:message})
})

})

app.post('/', (request, response) => {
	if(request.body.message=== undefined || request.body.message===''){
		request.session.error=" Erreur de nul.";
		response.redirect('/');
	}
	else
	{

		Message.create(request.body.message, ()=>{
			request.session.success= ' Message bien envoyé ! ';
			response.redirect('/');
		});

	}
})
app.listen(8080);