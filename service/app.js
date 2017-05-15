require('./common/global.js');
const routes = require('./common/routes.js');
const restify = require('restify');
const server = restify.createServer();
server.server.setTimeout(10000*5);
server.use(restify.bodyParser());
server.use(restify.CORS());
server.opts(/.*/, function (req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
  res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
  res.send(200);
  return next();
});

// add routes
routes.applyRoutes(server);
server.listen(3131, function() {
  console.log('%s listening at %s', server.name, server.url);
});
