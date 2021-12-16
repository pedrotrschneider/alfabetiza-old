/************************************************************************
 * Valise2OptionCard.js
 ************************************************************************
 * Copyright (c) 2021 Pedro Tonini Rosenberg Schneider.
 *
 * This file is part of Alfabetiza.
 *
 * Alfabetiza is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfabetiza is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *     
 * You should have received a copy of the GNU General Public License     
 * along with Alfabetiza.  If not, see <https://www.gnu.org/licenses/>.
 *************************************************************************/

class Valise2OptionCard extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {String} */
        this.str = "";
        /** @type {Boolean} */
        this.isAnswer = false;
        /** @type {Boolean} */
        this.selected = false;
        /** @type {Boolean} */
        this.selectable = true;
        /** @type {Boolean} */
        this.mouseOver = false;
        /** @type  {Boolean} */
        this.mousePress = false;

        /** @type {TextureRes} */
        this.thumb = null;
        /** @type {Color} */
        this.fillColor = new Color(200, 200, 200);
        /** @type {Boolean} */
        this.tweenStarted = false;
        /** @type {Tween} */
        this.tween = null;
        /** @type {Timer} */
        this.timer = null;
    }

    _initSignals()
    {
        this.addSignal("selected");
    }

    _setup()
    {
        var area = new Area2D("area", SHAPES.RECT, new Rect(275, 275), true);
        area.connect("mouseEntered", this, "_onMouseEntered");
        area.connect("mouseExited", this, "_onMouseExited");
        this.addChild(area);

        this.addChild(new Valise2CardVisualEffect("CardVfx"));

        this.tween = new Tween("Tween");
        this.tween.interpolateProperty(this, "scale", PROPERTY_TYPE.VECTOR2, Vector2.ZERO(), Vector2.ONE(), 2, TRANS_TYPE.ELASTIC, EASE_TYPE.OUT);
        this.addChild(this.tween);
        this.setScale(0, 0);

        this.timer = new Timer("Timer", 1, false, true);
        this.timer.connect("timeout", this, "_onTimerTimeout");
        this.addChild(this.timer);
    }

    _update( /** @type {Number} */ delta)
    {
        if (this.visible && !this.tweenStarted)
        {
            this.timer.start();
            this.tween.startAll();
            this.tweenStarted = true;
        }

        if (this.selectable && this.mouseOver)
        {
            if (InputHandler.mouseIsClicked)
            {
                this.selected = true;
                this.selectable = false;
                this.emitSignal("selected", this.isAnswer);

            }

            if (InputHandler.mouseIsPressed)
            {
                this.scale.x = max(this.scale.x - 3.0 * delta, 0.95);
                this.scale.y = max(this.scale.y - 3.0 * delta, 0.95);
            }
            else
            {
                this.scale.x = min(this.scale.x + 2.0 * delta, 1.2);
                this.scale.y = min(this.scale.y + 2.0 * delta, 1.2);
            }
        }

        else
        {
            this.scale.x = max(this.scale.x - 2.0 * delta, 1);
            this.scale.y = max(this.scale.y - 2.0 * delta, 1);
        }
    }

    _draw( /** @type {Number} */ delta, /** @type {p5.Graphics} */ db)
    {
        db.rectMode(CENTER);
        db.fill(this.fillColor.getP5Color());
        db.rect(0, 0, 275, 275, 10, 10);
        db.textAlign(CENTER, CENTER);
        db.fill(0);
        db.textSize(40);
        db.text(this.str, 0, 0);
    }

    _onMouseEntered()
    {
        this.mouseOver = true;
        console.log(this.str);
    }

    _onMouseExited()
    {
        this.mouseOver = false;
    }

    _onTimerTimeout()
    {
        this.tween.stopAll();
    }
}