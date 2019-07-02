const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('pool')

const pgsqlStrategy = new LocalStrategy((username, password, done) => {
  db.query('SELECT id, password FROM users WHERE username = $1', [username], (queryErr, queryRes) => {
    if (queryErr) {
      return console.error('Query error', queryErr)
    }

    if (queryRes.rows[0] !== undefined) {
      bcrypt.compare(password, queryRes.rows[0].password, (err, res) => {
        if (err) {
          return console.error('bcrypt error', err)
        }
        if (res) {
          done(null, { id: queryRes.rows[0].id })
        } else {
          done(null, null)
        }
      })
    } else {
      // User not found
      done(null, null)
    }
  })
})

module.exports = {
  pgsqlStrategy
}

/* passport.use('local', new LocalStrategy({passReqToCallback : true}, (req, username, password, done) => {
  loginAttempt();
  async function loginAttempt() {
  
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      var currentAccountsData = await JSON.stringify(client.query('SELECT id, 'firstName', 'email', 'password' FROM 'users' WHERE 'email'=$1', [username], function(err, result) {
        if(err) {
          return done(err)
        } 
        if (result.rows[0] == null) {
        req.flash('danger', 'Oops. Incorrect login details.');
        return done(null, false);
        } else {
          bcrypt.compare(password, result.rows[0].password, function(err, check) {
            if (err) {
            console.log('Error while checking password');
            return done();
            } else if (check) {
            return done(null, [{email: result.rows[0].email, firstName: result.rows[0].firstName}]);
            } else {
              req.flash('danger', 'Oops. Incorrect login details.');
              return done(null, false);
            }
          })
        }
      }))
    } catch(e) { throw (e) }
  }
}))
 
passport.serializeUser(function(user, done) {
  done(null, user)
})
 
passport.deserializeUser(function(user, done) {
  done(null, user)
}) */