class MovableObject extends Phaser.GameObjects.Sprite {
	constructor(data) {
		super(data.scene, data.x, data.y, data.texture, data.frame);
		this.init(data);
	}

	init(data) {
		this.scene.add.existing(this); // выводим спрайт на страницу

		//следующие две строчки подключают к данному префабу физичиский движек
		this.scene.physics.add.existing(this);
		this.body.enable = true;

		this.velocity = data.velocity;

		this.scene.events.on('update', this.update, this); // отслеживаем, когда в сцене срабатывает метод update, каждый раз запускаем метод this.update с контекстом префаба
	}

	reset(x, y) {
		this.x = x;
		this.y = y;
		this.setAlive(true);
	}

	isDead() {
		return false;
	}

	update() {
		if (this.active && this.isDead()) { // проеверяем, активен ли спрайт и меньше ли координата x спрайта, чем отрицательная ширина самого объекта.
			this.setAlive(false);
		}
	}

	setAlive(status) {
		this.body.enable = status; // активируем / деактивируем физическое тело
		this.setVisible(status); // показываем / скрываем текстуру
		this.setActive(status); // активировать / деактивировать объект

		if (this.timer) {
			this.timer.paused = !status
		}

		if (!status) {
			this.emit('killed'); // создаем имя произошедшего события. По данному имени будем событие отслеживать
		}
	}

	move() {
		this.body.setVelocityX(this.velocity);
	}
}
