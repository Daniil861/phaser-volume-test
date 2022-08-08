class Enemies extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene);
		this.scene = scene;

		this.fires = new Fires(this.scene);

		this.countMax = 10;
		this.countCreated = 0;
		this.countKilled = 0;

		this.timer = this.scene.time.addEvent({ // аналог функции settimeout, если параметр loop не задан или задан со значением false
			delay: 1000, // задержка с которой воспроизводится событие
			callback: this.tick, // функция, которая выполнятся с задержкой delay 
			callbackScope: this, // в момент вызова функции callback передаем в нее контекст
			loop: true // позволяет сделать зацикливание - функция callback будет выполняться с интервалом delay

		})
	}
	onEnemyKilled() {
		++this.countKilled;

		if (this.countKilled >= this.countMax) {
			this.scene.events.emit('enemies-killed');
		}
	}

	createEnemy() {
		let enemy = this.getFirstDead(); // используем встроенный метод и получаем в переменную не активный объект, если он есть

		if (!enemy) { // если не активного объекта нет - создаем новый объект
			enemy = Enemy.generate(this.scene, this.fires);
			enemy.on('killed', this.onEnemyKilled, this);
			this.add(enemy);
		} else {
			enemy.reset(); // обращаемся к методу префаба Enemy - перезаписываем новые параметры, активируем объект
		}

		enemy.move();
		++this.countCreated;
	}

	tick() { // метод, который запускается из таймера - он создает новых либо переиспользует активных врагов
		if (this.countCreated < this.countMax) { // создаем новых врагов если максимальное количество врагов больше чем количество созданных врагов
			this.createEnemy();
		} else {
			this.timer.remove();
		}
	}
}