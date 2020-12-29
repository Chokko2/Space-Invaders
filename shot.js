var Shot = function() {
    this.x = ship.x+5;
    this.y = ship.y;
    
    this.show = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 10, 20);
        ctx.fillStyle = "rgb(0, 255, 0)";
        ctx.fill();
        ctx.closePath();
    }
}