export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
    }

    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;

        // Score
        context.fillText('Score: ' + this.game.score, 20, 50);

        // Timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);

        // Game Over Message
        if (this.game.gameOver) {
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;

            if (this.game.score > 5) {
                context.fillStyle = '#3AFBD6';
                context.fillText('YOU WIN!', this.game.width * 0.5, this.game.height * 0.5);
            } else {
                context.fillStyle = 'red';
                context.fillText('GAME OVER!', this.game.width * 0.5, this.game.height * 0.5);
            }
        }

        context.restore();
    }
}