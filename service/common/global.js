const base_dir = __dirname + '/../';

global._ = require('underscore');
global.Promises = require('bluebird');

/**
 * include      - get the relative path for the required modules.
 * @param file  - file name
 * @returns {*} - file as a required module
 */
global.include = function(file) {
    var includePath = base_dir.concat(file);
    return require(includePath);
};

global.dbConnectionSting = "postgres://postgres:12345@192.168.3.8:5432/merged0708";