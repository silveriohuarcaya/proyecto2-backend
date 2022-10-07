const company = require('./api/company');
const job = require('./api/job');
const user = require('./api/user');
const payment = require('./api/payment');
const authLocal = require('./auth/local');

function routes(app) {
  app.use('/api/companies', company);
  app.use('/api/jobs', job);
  app.use('/api/users', user);
  app.use('/api/payments', payment);

  //auth routes
  app.use('/auth/local', authLocal);
  //app.use('/auth/facebook', facebook);
  //app.use('/auth/github', github);
  //app.use('/auth/gmail, gmail');
  //app.use('/auth/twitter', twitter);
  //app.use('/auth/linkedin', linkedin);
}
module.exports = routes;
