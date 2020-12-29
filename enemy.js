var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.r = 5;

    this.xv = 1; 

    this.show = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r*2, 0, Math.PI*2);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    }

    this.touching = function(shotX, shotY) {
        return  this.x - this.r >= shotX - 10 && this.x + this.r <= shotX + 20 &&
                this.y - this.r >= shotY && this.y + this.r <= shotY + 20;
    }
}