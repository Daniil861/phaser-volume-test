class GameScene extends Phaser.Scene {
	constructor() {
		super('Game');
	}
	init() {
		this.createCursors();
		this.score = 0;
	}
	createSounds() {
		this.sounds = { // создаем объект в который размещаем все загруженные звуки
			theme: this.sound.add('theme', { volume: 0.2, loop: true }), // с помощью метода this.sound.add - добавляем в сцену звук
			boom: this.sound.add('boom', { volume: 0.1 }),
		};

		this.sounds.theme.play();
	}
	create() {
		if (!this.sounds) { // для того чтобы при повторном переходе на игровой уровень не создавать новый звуковой файл - проверяем создан ли он
			this.createSounds(); // создаем метод в котором загрузим аудио файлы
		}

		this.createBacground();
		this.createFullscreen();
		this.player = new Player(this);
		this.enemies = new Enemies(this);
		this.addOverlap();
		this.createCompleteEvents();
		this.createText();
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
	createText() {
		this.scoreText = this.add.text(50, 50, 'Score: 0', {
			font: '50px washYourHand',
			fill: '#000'
		})
	}
	createCompleteEvents() {
		this.player.once('killed', this.onComplete, this);
		this.events.once('enemies-killed', this.onComplete, this);
	}
	onComplete() { // данный метод переводит игрока на стартовый экран
		this.sounds.theme.stop();
		this.scene.start('Start', {
			score: this.score,
			completed: this.player.active
		});
	}

	//=== отслеживаем коллизии
	addOverlap() {
		// проверяем столкновения группы пуль игрока и группы врагов 
		// таким образом мы проверяем столкновение любой пули дракона
		// с любым вертолетом противника, запуская при этом метод onOverlap
		this.physics.add.overlap(this.player.fires, this.enemies, this.onOverlap, undefined, this); // данный метод позволяет прописать правила столкновений двух объектов
		this.physics.add.overlap(this.enemies.fires, this.player, this.onOverlap, undefined, this);
		this.physics.add.overlap(this.player, this.enemies, this.onOverlap, undefined, this);
	}

	onOverlap(source, target) { // при вызове callback по умолчанию передается два параметра - первый и второй объекты
		const enemy = [source, target].find(item => item.texture.key === 'enemy'); // таким образом, с помощью item.texture.key проверяем какое название текстуры находится и в source и в target, и если это враг - записываем его в константу

		if (enemy) {
			this.score++;
			this.scoreText.setText(`Score: ${this.score}`);
			Boom.generate(this, enemy.x, enemy.y);
			this.sounds.boom.play();
		}

		source.setAlive(false);
		target.setAlive(false);
	}
	//===

	createBacground() {
		this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'bg').setOrigin(0); // таким образом загрузили фон как tileSprite, что означает что сможем его двигать
	}

	createCursors() {
		this.cursors = this.input.keyboard.createCursorKeys();
	}
	update() {
		this.bg.tilePositionX += 0.5; // таким образом задаем смещение фона
		this.player.move();

	}
}