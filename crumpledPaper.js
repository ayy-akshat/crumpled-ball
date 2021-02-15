class CrumpledPaper
{
    constructor(x, y, width, height)
    {
        var bodyOptions=
        {
            restitution:0.1,
            frictionAir:0,
            friction:1,
            frictionStatic:1,
            density:1
        }
        
        this.width = width;
        this.height = height;
        this.body = Bodies.rectangle(x, y, 50, 50, bodyOptions);
        World.add(world,this.body);

        this.image = loadImage('paper.png');
        this.sprite = createSprite(x, y, this.width, this.height);
        this.sprite.addImage("img", this.image);
        this.sprite.scale = 0.5;
    }

    updateSprite()
    {
        this.sprite.rotation = 360*this.body.angle/(2*PI);
        this.sprite.x = this.body.position.x;
        this.sprite.y = this.body.position.y;
    }
}