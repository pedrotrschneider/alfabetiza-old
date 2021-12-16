/************************************************************************
 * RebusCardVisualEffect.js
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

class RebusCardVisualEffect extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {number} */
        this.glowIterations = 7;
        /** @type {number} */
        this.glowAmount = 0;
    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        db.rectMode(CENTER);
        if (this.parent.selected)
        {
            if (!this.parent.isAnswer)
            {
                db.fill(0, 80);
                db.rect(0, 0, 300, 400, 10, 10);
            }
            else
            {
                db.noFill();
                this.glowAmount = min(1.0, this.glowAmount + 0.03);
                for (let i = 0; i < this.glowIterations; i++)
                {
                    db.stroke(255, 255, 100, this.glowAmount * 200 / (this.glowIterations + 1 - i));
                    db.strokeWeight((this.glowIterations - i) * 6);
                    db.rect(0, 0, 300, 400, 10);
                }
            }
        }
    }
}