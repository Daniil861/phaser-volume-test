class PrivacyScene extends Phaser.Scene {
	constructor() {
		super('Privacy');
		this.config = {
			nameGame: 'PENALTY AREA',
			x: 0,
			y: 0
		}
	}
	create() {
		console.log('Загрузился PrivacyScene');
		this.createBackground();
		this.createTextBlock();
		this.createButton();
	}

	createBackground() {
		this.add.sprite(0, 0, 'bg').setOrigin(0);
	}
	createRect() {

	}
	createTextBlock() {
		let content = [
			'PRIVACY POLICY',
			'LAST MODIFIED 1 MARCH 2021',
			'PRIVACY POLICY IS UPDATED IN ACCORDANCE WITH THE GENERAL DATA PROTECTION REGULATION (GDPR).',
			'1. INTRODUCTION',
			'THIS IS PRIVACY POLICY ${this.config.nameGame}, WHICH EXPLAINS HOW IS COLLECT, USE AND SHARE DATA THROUGH MOBILE APPLICATIONS, OUR PAGES OR PRESENCE ON THIRD PARTY WEBSITES AND OTHER PLATFORMS, WEBSITES PRODUCTS, OFFERS AND SERVICES THAT WE OFFER FROM TIME TO TIME, ALL OF WHICH TOGETHER WE REFER AS SERVICES OR SERVICES',
			'2. COLLECT OF PERSONAL DATA',
// 			`${this.config.nameGame} COLLECTS AND PROCESS THROUGH THE MOBILE APPLICATIONS THE PLAYER'S PERSONAL DATA.`,
// 			`PERSONAL DATA MEANS ANY INFORMATION FROM WHICH THE PLAYER CAN BE DIRECTLY	OR INDIRECTLY IDENTIFIED SUCH AS A NAME, LOCATION, EMAIL ADDRESS,	COMMUNICATION LANGUAGE, IP ADDRESS, IDFV (ID FOR VENDOR) OR ANDROID ID,	ADVERTISEMENT ID, PUSH NOTIFICATIONS TOKEN, GAME HISTORY, NETWORK LOGS,	COOKIE ONLINE IDENTIFIER, GENDER, FINANCIAL DATA, ETC., (“PERSONAL DATA”). YOUR PERSONAL DATA ARE PROCESSED ONLY TO THE EXTENT STRICTLY NECESSARY,	DEPENDING ON THE PARTICULAR PURPOSE OF THE PROCESSING, AS DEFINED IN POINT 6.`,
		]
		let txtCont = [
			'1. QQQQQQQQQQQQQQQQQQQ QQQQQQQQQQQQQQQQQQQQQQQQQQQ ${this.config.nameGame}',
			`2. RRRRRRRRRRRRRRRRRRRRWEWWDD VDSDGSDGS              DDDDDDDDDDDDDDDDDDDDDDDDDD`,
			'3. KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK',
			`4. FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF ${this.config.nameGame}`
		];
		// this.graphics = this.make.graphics();
		let graphics = this.add.graphics();
		graphics.fillStyle(0xff0000);
		graphics.fillRect(this.config.x + 30, this.config.y + 50, config.width, config.height);
		// this.graphics.fillRect(60, 60, 100, 100);

// 		let mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

		this.firstText = this.add.text(this.config.x + 90, this.config.y + 20, content, {
			font: '26px Inter-bold',
			color: '#fff',
// 			wordWrap: { width: config.width - 250 }
		});
		 this.newText = this.add.text(50, 100, 'Обычный тестовый текст', {
			 font: '26px Inter-bold',
			 color: '#fff'
		 })
		
		this.newSecondText = this.add.text(50, 300, txtCont, {
			 font: '26px Inter-bold',
			 color: '#fff'
		 })

		// let minY = config.height - text.height - 20;

		// if (text.height <= config.height - 20) {

		// 	minY = this.config.y + 20;

		// }
// 		text.setMask(mask);

// 		let zone = this.add.zone(this.config.x, this.config.y, config.width - 250, config.height)
// 			.setOrigin(0)
// 			.setInteractive();

// 		this.input.dragDistanceThreshold = 100;

// 		let y = this.config.y;

		// zone.on('drag', function (pointer) {
		// 	if (pointer.isDown) {
		// 		text.y += pointer.velocity.y / 5;
		// 		text.y = Phaser.Math.Clamp(text.y, minY, y + 20);
		// 	}
		// })
		// 	.on('dragend', () => {
		// 		zone.x = this.config.x;
		// 		zone.y = this.config.y - 3;
		// 	});
// 		zone.on('pointermove', function (pointer) {

// 			if (pointer.isDown) {
// 				text.y += (pointer.velocity.y / 10);

// 				text.y = Phaser.Math.Clamp(text.y, -400, 300);
// 			}

// 		});
	}
	createButton() {
		let btn = this.add.sprite(config.scale.width - 100, config.scale.height - 100, 'btn-preload').setInteractive();
		btn.on('pointerdown', this.onBtnClick, btn);
		btn.scale = 1.5;
	}
	onBtnClick() {
		this.scene.tweens.add({
			targets: this,
			scale: 1.4,
			ease: 'Linear',
			duration: 150,
			onComplete: () => {
				this.scene.tweens.add({
					targets: this,
					scale: 1.5,
					ease: 'Linear',
					duration: 150,
				})
				sessionStorage.setItem('privacy', true);
				this.scene.scene.start('Preload');
			}
		})
	}
}
