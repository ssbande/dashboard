const Router 					= require('restify-router').Router;
const routerInstance 	= new  Router();
const main			 			= include('dashboard/controller.js');

// All GET routes without any parameter. If there is any get method with params, must be declared above this. 
// Also getMethod will not suffice for that. 
routerInstance.get('/.*/', getMethod);

function getMethod(req, res, next){
  const reqMethod 		= req.url.replace('/', '');
  const controller 	= new main.Controller();
  controller.get(res, reqMethod);
  return next();
}

module.exports = routerInstance;
