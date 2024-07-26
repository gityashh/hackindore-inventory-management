const mongoose = require('mongoose')
const dbgr = require('debug')('development:')

mongoose.connect('mongodb://127.0.0.1:27017/user-data');

let db = mongoose.connection;

module.exports = db;
