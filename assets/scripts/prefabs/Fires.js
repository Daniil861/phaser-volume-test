class Fires extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene); // первый передаваемый параметр - это передача физического движка объектам группы. При создании врага - физический движок передавали другим способом - непосредственно в префабе объекта

	}
	createFire(source) { // метод вызываем из префаба Player, в котором передаем this - из него можно вытянуть координаты игрока
		let fire = this.getFirstDead();

		if (!fire) {
			fire = Fire.generate(this.scene, source); // создаем префаб в месте где находится объект, передавая его координаты
			this.add(fire);
		} else {
			fire.reset(source.x, source.y); // пересоздаем пулю из места, где находится дракон(передаем source)
		}
		fire.move();
	}
}

