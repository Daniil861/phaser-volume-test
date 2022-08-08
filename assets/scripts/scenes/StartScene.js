class StartScene extends Phaser.Scene {
	constructor() {
		super('Start');
	}

	create(data) { // data - объект с которым данную сцену загружают из предыдущей сцены
		this.createBacground();
		this.createFullscreen();
		if (data.score !== undefined) {
			this.createStats(data);
		}
		this.createText();
		this.setEvents();
	}
	createFullscreen() {
		this.fullscreen = this.add.sprite(20, 10, 'fullscreen')
			.setOrigin(0)
			.setInteractive();
		this.fullscreen.scale = 0.5
		this.fullscreen.on('pointerup', function () {
			if (!this.scale.isFullscreen) {
				this.scale.startFullscreen();
			} else {
				this.scale.stopFullscreen();
			}
		}, this);
	}
	createStats(data) {
		this.add.graphics() // создаем объект
			.fillStyle(0x000000, 0.5) // указываем цвет заливки
			.fillRoundedRect(config.width / 2 - 200, config.height / 2 - 200, 400, 400); // создаем прямоугольник

		const textTitle = data.completed ? 'Level completed!' : 'Game Over';
		const textScore = `Score: ${data.score}`;
		const textStyle = {
			font: '50px washYourHand',
			fill: '#fff'
		}

		this.add.text(config.width / 2, 250, textTitle, textStyle).setOrigin(0.5);
		this.add.text(config.width / 2, 350, textScore, textStyle).setOrigin(0.5);
	}
	createBacground() {
		this.add.sprite(0, 0, 'bg').setOrigin(0);
	}
	createText() {
		this.add.text(config.width / 2, config.height / 2 + 200, 'Tap to start', {
			font: '50px washYourHand',
			fill: '#000'
		}).setOrigin(0.5)
	}
	setEvents() {
		this.input.on('pointerdown', this.startGame, this);
	}
	startGame() {
		this.scene.start('Game');
	}
}