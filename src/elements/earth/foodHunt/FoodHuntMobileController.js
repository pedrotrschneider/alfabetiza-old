class FoodHuntMobileController extends Object2D
{
    constructor(name)
    {
        super(name);
    }

    _initSignals()
    {
        this.addSignal("moveLeft");
        this.addSignal("stopLeft");
        this.addSignal("moveRight");
        this.addSignal("stopRight");
    }

    _setup()
    {
        var area = new Area2D("LeftArea", SHAPES.RECT, new Rect(100, 100), true, true);
        area.setPosition(70, 1080 - 70);
        area.connect("mouseEntered", this, "_onLeftAreaMouseEntered");
        area.connect("mouseExited", this, "_onLeftAreaMouseExited");
        this.addChild(area);

        var area2 = new Area2D("RightArea", SHAPES.RECT, new Rect(100, 100), true, true);
        area2.setPosition(1920 - 70, 1080 - 70);
        area2.connect("mouseEntered", this, "_onRightAreaMouseEntered");
        area2.connect("mouseExited", this, "_onRightAreaMouseExited");
        this.addChild(area2);
    }

    _onLeftAreaMouseEntered()
    {
        this.emitSignal("moveLeft")
    }

    _onLeftAreaMouseExited()
    {
        this.emitSignal("stopLeft");
    }

    _onRightAreaMouseEntered()
    {
        this.emitSignal("moveRight");
    }

    _onRightAreaMouseExited()
    {
        this.emitSignal("stopRight");
    }
}