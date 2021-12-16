/************************************************************************
 * FoodHuntBasket.js
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

class FoodHuntBasket extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {FoodHuntPlayer} */
        this.player = null;
    }

    _update( /** @type {Number} */ delta)
    {
        this.position = this.player.position;
    }

    _draw( /** @type {Number} */ delta, /** @type {p5.Graphics} */ db)
    {
        db.rectMode(CENTER);
        db.fill(200);
        db.rect(0, 0, 110, 110);
    }
}