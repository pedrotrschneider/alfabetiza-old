/************************************************************************
 * FoodHuntTree.js
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

class FoodHuntTree extends Object2D
{
    _setup()
    {
        this.setPosition(1920 / 2, 1080 / 2 - 100);
    }

    _draw( /** @type {Number} */ delta, /** @type {p5.Graphics} */ db)
    {
        db.rectMode(CENTER);
        db.fill("#823c11");
        db.rect(0, 0, 300, 800);
        db.fill("#07630d");
        db.rect(0, -400,  1700, 600, 100, 100)
    }
}