define(function() {
	var Data = function() {};

	var data = {
	"AUDIO-SAMPLE.MP3": "game-builder/assets/audio-sample.mp3?b=test",
	"AUDIO-SAMPLE.OGG": "game-builder/assets/audio-sample.ogg?b=test",
	"DELETEME.MD": "assets/DELETEME.md?b=test"
};

	Data.prototype.get = function() {
		return data;
	}

	return new Data();
});