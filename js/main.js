import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from './enemies.js';
import { UI } from './UI.js';
/*import { Input } from './input.js'; //added from here
import { State } from './playerStates.js';
import { CollisionAnimation } from './collisionAnimation.js';*/


window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 75;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.maxParticles = 50;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 60000;
            this.gameOver = false;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            /*this.input = []; //added from here
            this.State = [];
            this.CollisionAnimation = [];*/
        }
        update(deltaTime){
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            // handleEnemies
            if (this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            })
            // handle particles
            this.particles.forEach((particle, index) => {
                particle.update();
                if (particle.markedForDeletion) this.particles.splice(index, 1);
            });
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }
            // handle collision sprites
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
                if (collision.markedForDeletion) this.collisions.splice(index, 1);
            });
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
            enemy.draw(context);
            });
            this.particles.forEach(particle => {
            particle.draw(context);
            });
            this.collisions.forEach(collision => {
            collision.draw(context);
            });
            this.UI.draw(context);
        }
        addEnemy(){
            if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    const game = new Game( canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;

        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
});