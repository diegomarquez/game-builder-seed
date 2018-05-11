define(function() {
	var Data = function() {};

	var data = {
		"DELETEME.MD": "assets/DELETEME.md"
	};

	Data.prototype.get = function() {
		return data;
	}

	return new Data();
});
