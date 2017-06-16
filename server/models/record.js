var mongoose = require('mongoose');

module.exports = mongoose.model('record',{
	name: 'String',
	phoneNumber: 'String'
});