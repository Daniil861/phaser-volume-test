class Player extends Enemy {
	constructor(scene) {
		super({
			scene,
			x: 150,
			y: config.height / 2,
			texture: 'dragon',
			frame: 'dragon1',
			velocity: 500,
			bullet: { delay: 500, texture: 'fire', velocity: 750 },
			origin: { x: 1, y: 0.5 }
		});

		// формируем микроанимацию полета дракона
		const frames = this.scene.anims.generateFrameNames('dragon', {
			prefix: 'dragon',
			start: 1,
			end: 6
		});

		this.scene.anims.create({
			key: 'fly', // идентификатор, формируем сами
			frames, // передаем массив созданных объектов выше
			frameRate: 10, // число кадров которое будет выполнено в секунду
			repeat: -1 // количество анимаций. -1 - значит бесконечно будет играть
		})

		this.play('fly');

	}

	move() {// данный метод запускается в сцене игры в методе update, соответственно зациклен

		this.body.setVelocity(0); // когда отпускаем клавишу - обнуляем скорость

		// Далее блок условий нажатий на кнопки вверх/вниз/вправо/влево и их условия срабатывания
		if (this.scene.cursors.left.isDown) {
			this.body.setVelocityX(-this.velocity);
		} else if (this.scene.cursors.right.isDown) {
			this.body.setVelocityX(this.velocity);
		}

		if (this.scene.cursors.up.isDown) {
			this.body.setVelocityY(-this.velocity);
		} else if (this.scene.cursors.down.isDown) {
			this.body.setVelocityY(this.velocity);
		}
	}
}
