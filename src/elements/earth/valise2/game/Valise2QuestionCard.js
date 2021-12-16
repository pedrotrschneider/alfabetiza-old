/************************************************************************
 * Valise2QuestionCard.js
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

class Valise2QuestionCard extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {String} */
        this.str = "";

        /** @type {Color} */
        this.fillColor = new Color(200, 200, 200);
        /** @type {Tween} */
        this.tween = null;
    }

    _setup()
    {
        this.tween = new Tween("Tween");
        this.tween.interpolateProperty(this, "scale", PROPERTY_TYPE.VECTOR2, Vector2.ZERO(), Vector2.ONE(), 2, TRANS_TYPE.ELASTIC, EASE_TYPE.OUT);
        this.addChild(this.tween);
    }

    _update( /** @type {Number} */ delta)
    {
        if (this.visible) this.tween.startAll();
    }

    _draw( /** @type {Number} */ delta, /** @type {p5.Graphics} */ db)
    {
        db.strokeWeight(10);
        db.rectMode(CENTER);
        db.fill(this.fillColor.getP5Color());
        db.rect(0, 0, 275, 275, 10, 10);
        db.textAlign(CENTER, CENTER);
        db.fill(0);
        db.textSize(40);
        db.text(this.str, 0, 0);
    }
}