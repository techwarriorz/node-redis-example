var redis  = require('../databases/redis');
var Record = require('../models/record');

module.exports.getRecord = function(req, res){
	redis.get(req.query.id, function(err, result){
		if (!result){
			return setRecord(req.query.id, res);
		};

		return res.json({
			record: JSON.parse(result)
		})
	})
}

module.exports.getAllRecords = function(req, res){
	//We know that this data is set whenever the app is used.

	redis.get('records-all', function(err, result){
		var records = [];
		
		if (result){
			records = JSON.parse(result);
		}

		res.json({
			records: records
		});
	});

}

module.exports.createRecord = function(req, res){
	var newRecord = new Record(req.body);

	newRecord.save(function(err){
		if (err){
			return res.status(400).send("unable to save at this time");
		}

		setAllRecords(res);
	})
}

function setRecord(id, res){
	Record.find({_id: id}, function(err, result){

		redis.set(id, JSON.stringify(result[0]));

		return res.json({
			record: result[0]
		});

	});
	
}

function setAllRecords(res){
	//Set The New Data
	Record.find({}, function(err, records){
		if (err){
			return res.status(400).send("record saved, but redis not set");
		}

		redis.set('records-all', JSON.stringify(records));
		return res.status(200).send("Saved and Stored");
	})
}