/************************************************************************
 * LetterHuntPlant.js
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

class LetterHuntPlant extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {String} */
        this.letter = "";
    
        /** @type {Area2D} */
        this.area = null;
        /** @type {Boolean} */
        this.mouseOver = false;
        /** @type {Boolean} */
        this.mosueIsDown = false;
        /** @type {Boolean} */
        this.selected = false;
        /** @type {Boolean} */
        this.selectable = true;
    
        /** @type {Number} */
        this.growSpeed = 2;
    }

    _initSignals()
    {
        this.addSignal("selected");
    }

    _setup()
    {
        this.area = new Area2D("Area2D", SHAPES.ELLIPSE, new Ellipse(40), true, false);
        this.area.connect("mouseEntered", this, "_onAreaMouseEntered");
        this.area.connect("mouseExited", this, "_onAreaMouseExited");
        this.addChild(this.area);

        this.setScale(0, 0);
    }

    _update( /** @type {Number} */ delta)
    {
        if (this.selectable && this.mouseOver)
        {
            if (InputHandler.mouseIsPressed)
                this.mosueIsDown = true;

            if (this.mosueIsDown)
            {
                this.scale.x = max(this.scale.x -= this.growSpeed * delta, 0.95);
                this.scale.y = max(this.scale.y -= this.growSpeed * delta, 0.95);

                if (InputHandler.mouseIsClicked)
                {
                    this.selected = true;
                    this.emitSignal("selected", this);
                }
            }
            else
            {
                this.scale.x = min(this.scale.x += this.growSpeed * delta, 1.3);
                this.scale.y = min(this.scale.y += this.growSpeed * delta, 1.3);
            }
        }
        else
        {
            if (this.scale.x >= 1)
            {
                this.scale.x = max(this.scale.x -= this.growSpeed * delta, 1);
                this.scale.y = max(this.scale.y -= this.growSpeed * delta, 1);
            }
            else
            {
                this.scale.x = min(this.scale.x += 2 * this.growSpeed * delta, 1);
                this.scale.y = min(this.scale.y += 2 * this.growSpeed * delta, 1);
            }
            this.mosueIsDown = false;
        }
    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        db.fill(255);
        db.ellipse(0, 0, 80);

        if (this.selectable)
        {
            db.fill(0);
            db.textAlign(CENTER, CENTER);
            db.textSize(40);
            db.text(this.letter, 0, 0);
        }
        else
        {
            db.fill(0, 200);
            db.ellipse(0, 0, 80);
        }
    }

    _onAreaMouseEntered()
    {
        this.mouseOver = true;
    }

    _onAreaMouseExited()
    {
        this.mouseOver = false;
    }
}