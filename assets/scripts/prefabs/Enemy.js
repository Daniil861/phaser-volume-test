class Enemy extends MovableObject {
	static generateAttributes() {
		const x = config.width + 200;
		const y = Phaser.Math.Between(100, config.height - 100);
		return { x, y, frame: `enemy${Phaser.Math.Between(1, 4)}` };
	}
	static generate(scene, fires) {
		let data = Enemy.generateAttributes();
		return new Enemy({
			scene,
			fires,
			x: data.x,
			y: data.y,
			texture: 'enemy',
			frame: data.frame,
			velocity: -250,
			bullet: { delay: 1000, texture: 'bullet', velocity: -500 },
			origin: { x: 0, y: 0.5 }
		});
	}
	reset() {
		const data = Enemy.generateAttributes();
		super.reset(data.x, data.y);
		this.setFrame(data.frame);
	}

	init(data) {
		super.init(data); // вызываем метод init из базового класса Enemy. Там указан такой же код, отличие только в величине переменной velocity
		this.setOrigin(data.origin.x, data.origin.y);
		this.fires = data.fires || new Fires(this.scene);

		this.timer = this.scene.time.addEvent({
			delay: data.bullet.delay,
			callback: this.fire,
			callbackScope: this,
			loop: true
		})
		this.bullet = data.bullet;
	}

	fire() {
		this.fires.createFire(this);
	}

	isDead() {
		return this.x < -this.width;
	}
}
