var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	audio: {
		disableWebAudio: true
	},
	scene: {
		preload: preload,
		create: create
	}
};

var text;
var game = new Phaser.Game(config);

function preload() {
	text = this.add.text(10, 10, 'Loading audio ...', { font: '16px Courier', fill: '#00ff00' });

	this.load.audio('dafunk', 'assets/audio/Dafunk - Hardcore Power (We Believe In Goa - Remix).mp3');
}

function create() {
	this.sound.pauseOnBlur = false;
	console.log(this);

	this.input.on('pointerdown', function () {
		this.sound.unlock();
		var music = this.sound.add('dafunk');
		console.log(music);
		if (!this.sound.locked) {
			music.play();
		}
		else {  // IF Not wait on unlock event 
			this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
				music.play();
			})
		}
		console.log(music);
	}, this)

	text.setText('Playing Dafunk - Hardcore Power (We Believe In Goa - Remix)');
}
