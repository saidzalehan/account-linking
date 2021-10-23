const User = require('./models/user');
var scopes = ['identify', 'email', 'guilds', 'guilds.join'];
module.exports = function(app, passport){
	app.get('/', function(req, res){
		res.render('index.ejs', { message: req.flash('loginMessage') });
	});

	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', { user: req.user });
	});

	//Auth Google
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
	}));

	app.get('/auth/google/callback', 
	  passport.authenticate('google', {
		successRedirect: '/profile',
		failureRedirect: '/' 
	}));

	//Auth Discord
	app.get('/auth/discord', passport.authenticate('discord', {
		scope: scopes
	}));

	app.get('/auth/discord/callback', passport.authenticate('discord', {
		successRedirect: '/profile',
		failureRedirect: '/' 
	}));
	
	//Connect account
	app.get('/connect/discord', passport.authorize('discord', { scope: scopes }))

	//Unlink account
	app.get('/unlink/discord', function(req, res){
		var user = req.user;
		user.discord.token = null;

		user.save(function(err){
			if(err)
				throw err;
			res.redirect('/profile');
		});
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	})
};

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/login');
}