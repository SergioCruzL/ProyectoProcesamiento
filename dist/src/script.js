"use strict";
var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var numberOfParticles = 200;
var ParticlesArrays = [];
var plantilla = new Image();
plantilla.src = 'corazones.png';
window.addEventListener('mousemove', handleMouse);
var file = document.getElementById('fileupload');
file.addEventListener('change', function () {
    plantilla.src = URL.createObjectURL(file.files[0]);
});
var mouse = {
    x: null,
    y: null,
    radius: 100
};
function handleMouse(e) {
    mouse.x = e.x;
    mouse.y = e.y;
}
var Particle = /** @class */ (function () {
    function Particle() {
        this.radius = Math.random() * 200 + 20;
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + this.radius * 2;
        this.speedY = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.angle = Math.random() * 360;
        this.spin = Math.random() < 0.5 ? 1 : -1;
        //sprite sheet control
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.spriteSize = 900 / 3;
    }
    Particle.prototype.draw = function () {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 360 * this.spin);
        ctx.drawImage(plantilla, this.frameX * this.spriteSize, this.frameY
            * this.spriteSize, this.spriteSize, this.spriteSize, 0 - this.
            radius / 2, 0 - this.radius / 2, this.radius, this.radius);
        ctx.translate(-this.x, -this.x);
        ctx.restore();
    };
    Particle.prototype.update = function () {
        this.angle += 5;
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.radius > 1)
            this.radius -= 0.5;
    };
    return Particle;
}());
function init() {
    for (var i = 0; i < numberOfParticles; i++) {
        ParticlesArrays.push(new Particle());
    }
}
init();
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (ParticlesArrays.length < numberOfParticles) {
        ParticlesArrays.push(new Particle);
    }
    connect();
    for (var i = 0; i < ParticlesArrays.length; i++) {
        if (ParticlesArrays[i].radius <= 1) {
            ParticlesArrays.splice(i, 1);
        }
        ParticlesArrays[i].update();
        ParticlesArrays[i].draw();
    }
    requestAnimationFrame(animate);
}
animate();
function connect() {
    for (var i = 0; i < ParticlesArrays.length; i++) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = ParticlesArrays[i].radius / 5;
        ctx.beginPath();
        ctx.moveTo(ParticlesArrays[i].x, ParticlesArrays[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        ctx.closePath();
    }
}
