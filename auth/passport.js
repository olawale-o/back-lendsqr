const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserService = require('../services/usersService');
const { env: { JWT_SECRET } } = require('../constants');

passport.use('local-register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, async (req, email, password, done) => {
  try {
    const user = await UserService.findBy({ email });
    if (user) {
      return done(null, false, { message: 'Please provide valid credentials' });
    }
    const credentials = { ...req.body, password: bcrypt.hashSync(password, 10), accountNo: uuidv4() };
    const newUser = await UserService.create(credentials);
    return done(null, newUser, { message: 'User created successfully',});
  } catch (err) {
    return done(null, false, { message: err.message, });
  }
}));

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await UserService.findBy({email})
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }
    const validate = bcrypt.compareSync(password, user.password);
    if (!validate) {
      return done(null, false, { message: 'Wrong Password' });
    }
    done(null, user, { message: 'Welcome back' });
  } catch(err) {
    return done(null, false, { message: err.message });
  }
}));

passport.use(new JwtStrategy({
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken("JWT"),
}, async (payload, done) => {
  try {
    return done(null, payload);
  } catch (error) {
    return done(error);
  }
}));
