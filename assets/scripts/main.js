const config = {
	type: Phaser.AUTO,
	width: 1270,
	height: 720,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	scene: [BootScene, PrivacyScene, PreloadScene, StartScene, GameScene],
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	}
}

const game = new Phaser.Game(config);

