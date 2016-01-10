var express = require('express');
var bodyParser = require('body-parser');
var load = require('express-load');

module.exports = function() {
	var app = express();

	//configuração de ambiente
	app.set('port', 3000);

	//middleware
	app.use(express.static('./public'));

	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	load('models', {cwd: 'app'})
		.then('controllers')
		.then('routers')
		.into(app);

	app.use(express.static('./public'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json);
	app.use(require('method-override')());

	return app;
};