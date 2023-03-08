'use strict';

console.log('こんばんは');

const gameBox = document.querySelector('.game-box');
const ctx = gameBox.getContext('2d');

class HealthBar {
	constructor() {
		// Frame Data
		this.frame = 0;
		this.frameMax = 9;
		this.aniStop = false;
		// Keyframes
		this.keyFrames = {
			keyFrame01: {
				startFrame: 1,
				dx: 1,
				dy: 4,
				dw: 2,
				dh: 6,
				red: 255,
				green: 0,
				blue: 0,
			},
			keyFrame02: {
				startFrame: 8,
				dx: 1,
				dy: 4,
				dw: 14,
				dh: 6,
				red: 0,
				green: 255,
				blue: 0,
			},
		};
	}

	preRender() {
		if (this.frame < this.frameMax) {
			const framePercentage = this.frame / this.frameMax;
			console.log(framePercentage);
			console.log(Math.floor((2 + 14) * framePercentage));
		} else {
			const framePercentage = this.frame / this.frameMax;
			if (!this.aniStop) {
				this.aniStop = true;
				console.log(framePercentage);
				console.log(Math.floor((2 + 14) * framePercentage));
			}
		}
	}

	render(ctx) {
		const framePercentage = this.frame / this.frameMax;

		const tweenPointR = this.lerp(
			this.keyFrames.keyFrame01.red,
			this.keyFrames.keyFrame02.red,
			framePercentage,
		);

		const tweenPointG = this.lerp(
			this.keyFrames.keyFrame01.green,
			this.keyFrames.keyFrame02.green,
			framePercentage,
		);

		const tweenPointB = this.lerp(
			this.keyFrames.keyFrame01.blue,
			this.keyFrames.keyFrame02.blue,
			framePercentage,
		);

		const tweenPointDX = this.lerp(
			this.keyFrames.keyFrame01.dx,
			this.keyFrames.keyFrame02.dx,
			framePercentage,
		);

		const tweenPointDY = this.lerp(
			this.keyFrames.keyFrame01.dy,
			this.keyFrames.keyFrame02.dy,
			framePercentage,
		);

		const tweenPointDW = this.lerp(
			this.keyFrames.keyFrame01.dw,
			this.keyFrames.keyFrame02.dw,
			framePercentage,
		);

		const tweenPointDH = this.lerp(
			this.keyFrames.keyFrame01.dh,
			this.keyFrames.keyFrame02.dh,
			framePercentage,
		);

		ctx.clearRect(0, 0, 16, 16);

		ctx.fillStyle = `rgb(${tweenPointR}, ${tweenPointG}, ${tweenPointB})`;
		// console.log(ctx.fillStyle);

		ctx.fillRect(tweenPointDX, tweenPointDY, tweenPointDW, tweenPointDH);
	}

	update() {
		if (this.frame < this.frameMax) {
			this.frame++;
		}
	}

	lerp(start, end, time) {
		if (time === 0) return start;
		if (time >= 1) return end;
		return Math.floor(start + (end - start) * time);
	}
}

const healthBar01 = new HealthBar();

setInterval(() => {
	healthBar01.preRender();
	healthBar01.render(ctx);
	healthBar01.update();
}, 1000);
