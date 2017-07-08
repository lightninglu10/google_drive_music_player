var passport = require('passport');
var GoogleTokenStrategy = require('passport-google-token').Strategy;
var GoogleUser = require('./googleUser');
var GoogleConfig = require('./google');

passport.use(new GoogleTokenStrategy({
		clientID: GoogleConfig.clientId,
    	clientSecret: GoogleConfig.clientSecret,
    	callbackURL: GoogleConfig.callbackURL
  	},
  	function(accessToken, refreshToken, profile, done) {
  		// asynchronous
        process.nextTick(function() {
  			// check google_users db for user
    		GoogleUser.where({ google_id: profile.id }).fetch().then(googleUser => {
	      		// user found in database
	      		if (googleUser) {
	      			// return user with no error
	      			return done(null, googleUser);
	      		} else {
	      			// if the user is not in the db then create them
	      			var attrs = {
	                    access_token: accessToken,
	                    google_id: profile.id,
	                    first_name: profile.name.givenName,
	                    last_name: profile.name.familyName,
	                    email: profile.emails[0].value,
	                }

	                GoogleUser.create(attrs).then(newUser => {
	                    return done(null, newUser);
	                });
	      		}
	    	});
	    });
  	}	
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
 	new GoogleUser({id: id}).fetch({require: true}).then(user => {
    	done(null, user);
    }).catch(err => {
        done(err, null);
    });
});

module.exports = passport;