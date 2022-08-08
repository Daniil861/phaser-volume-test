class Boom extends Phaser.GameObjects.Sprite {
	static generate(scene, x, y) {
		return new Boom({ scene, x, y });
	}
	constructor(data) {
		super(data.scene, data.x, data.y, 'boom', 'boom1');
		this.scene.add.existing(this);

		// формируем микроанимацию полета дракона
		const frames = this.scene.anims.generateFrameNames('boom', {
			prefix: 'boom',
			start: 1,
			end: 4
		});

		this.scene.anims.create({
			key: 'boom', // идентификатор, формируем сами
			frames, // передаем массив созданных объектов выше
			frameRate: 24, // число кадров которое будет выполнено в секунду
			repeat: 0 // количество анимаций. 0 - значит Проиграть один раз
		})

		this.play('boom');

		// Проверяем когда завершится анимация, после этого удаляем текстуру взрыва
		this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
			this.destroy();
		});
	}

}

