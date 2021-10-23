var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var DiscordStrategy = require('passport-discord').Strategy;

var scopes = ['identify', 'email', 'guilds', 'guilds.join'];

var User = require('../models/user');
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

module.exports = function(passport) {


	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	passport.use(new GoogleStrategy({
	    clientID: process.env.GOOGLE_CLIENT_ID,
	    clientSecret: process.env.GOOGLE_SECRET_ID,
	    callbackURL: process.env.GOOGLE_CALLBACK_URL,
	    passReqToCallback: true
	  },
	  function(req, accessToken, refreshToken, profile, done) {
		  //passport callback function
        	console.log(profile)
	    	process.nextTick(function(){

	    		if(!req.user){
	    			User.findOne({'google.id': profile.id}, function(err, user){
		    			if(err)
		    				return done(err);
		    			if(user){
		    				if(!user.google.token){
		    					user.google.token = accessToken;
								
		    					user.save(function(err){
		    						if(err)
		    							throw err;
		    					});
		    				}
		    				return done(null, user);
		    			}
		    			else {
		    				var newUser = new User();
		    				newUser.google.id = profile.id;
		    				newUser.google.token = accessToken;
		    				newUser.google.name = profile.displayName;
		    				newUser.google.email = profile._json.email;
							newUser.google.picture = profile._json.picture;

		    				newUser.save(function(err){
		    					if(err)
		    						throw err;
		    					return done(null, newUser);
		    				})
		    			}
		    		});
	    		} else {
	    			var user = req.user;
	    			user.google.id = profile.id;
					user.google.token = accessToken;
					user.google.name = profile.displayName;
					user.google.email = profile._json.email;
					user.google.picture = profile._json.picture;

					user.save(function(err){
						if(err)
							throw err;
						return done(null, user);
					});
	    		}
	    		
	    	});
	    }

	));

	passport.use(new DiscordStrategy({
	    clientID: process.env.DISCORD_CLIENT_ID,
	    clientSecret: process.env.DISCORD_SECRET_ID,
	    callbackURL: process.env.DISCORD_CALLBACK_URL,
	    passReqToCallback: true,
		scope : scopes
	  },
	  function(req, accessToken, refreshToken, profile, done) {
		  //passport callback function
        	console.log(profile)
	    	process.nextTick(function(){

	    		if(!req.user){
	    			User.findOne({'discord.id': profile.id}, function(err, user){
		    			if(err)
		    				return done(err);
		    			if(user){
		    				if(!user.discord.token){
		    					user.discord.token = accessToken;
								
		    					user.save(function(err){
		    						if(err)
		    							throw err;
		    					});
		    				}
		    				return done(null, user);
		    			}
		    			else {
		    				var newUser = new User();
		    				newUser.discord.id = profile.id;
		    				newUser.discord.token = accessToken;
		    				newUser.discord.name = profile.username;
							newUser.discord.email = profile.email;
							newUser.discord.picture = profile.avatar;

		    				newUser.save(function(err){
		    					if(err)
		    						throw err;
		    					return done(null, newUser);
		    				})
		    			}
		    		});
	    		} else {
	    			var user = req.user;
	    			user.discord.id = profile.id;
					user.discord.token = accessToken;
					user.discord.name = profile.username;
					user.discord.email = profile.email;
					user.discord.picture = profile.avatar

					user.save(function(err){
						if(err)
							throw err;
						return done(null, user);
					});
	    		}
	    		
	    	});
	    }

	));
};