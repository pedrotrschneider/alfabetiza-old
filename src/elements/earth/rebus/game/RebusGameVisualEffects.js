/************************************************************************
 * RebusGameVisualEffects.js
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

class RebusGameVisualEffects extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {String} */
        this.suffix = "";
        /** @type {Number} */
        this.bgOpacity = 0;
        /** @type {Number} */
        this.textOpacity = 0;
    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        if (this.parent.gameFinished)
        {
            db.noStroke();
            db.fill(0, min(this.bgOpacity += 75 * delta, 200));
            db.rectMode(CENTER);
            db.rect(db.width / 2, db.height / 2, 1800, 600, 40, 40);
            db.textAlign(CENTER, CENTER);
            db.fill(255, min(this.textOpacity += 80 * delta, 255));
            db.textSize(40);
            this.parent.points > 1 ? this.suffix = "S" : this.suffix = "";
            db.text(`PARABÉNS, NÍVEL CONCLUÍDO\n\nVOCÊ GANHOU ${this.parent.points} PONTO${this.suffix}!`, db.width / 2, db.height / 2 - 100);
        }
    }
}