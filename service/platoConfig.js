const plato = require('plato');

const files = [
  'dashboard/*.js',
  'common/*.js'
];

const outputDir = './../Reports/Service/StaticAnalysis';
// null options for this example

const options = {
  title: 'Monitoring Dashboard'
};

function callback(report){
// once done the analysis,
// execute this
  console.log("completed analysis");
  console.log("option title: ", options.title);
}

plato.inspect(files, outputDir, options, callback);
