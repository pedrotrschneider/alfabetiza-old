/************************************************************************
 * FoodHuntPlayer.js
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

class FoodHuntPlayer extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {Number} */
        this.direction = 0;

        /** @type {Boolean} */
        this.moveLeft = false;
        /** @type {Boolean} */
        this.moveRight = false;
    }

    _setup()
    {
        this.setPosition(1920 / 2, 1080 - 200);
    }

    _update( /** @type {Number} */ delta)
    {
        this.direction = 0;
        if (keyIsDown(LEFT_ARROW) || this.moveLeft) this.direction -= 1;
        if (keyIsDown(RIGHT_ARROW) || this.moveRight) this.direction += 1;
    }

    _draw( /** @type {Number} */ delta, /** @type {p5.Graphics} */ db)
    {
        db.rectMode(CENTER);
        db.rect(0, 0, 100, 200);

        this.position.x += 400 * this.direction * delta;
        if (this.position.x >= 1920 - 50) this.position.x = 1920 - 55;
        else if (this.position.x <= 55) this.position.x = 55;
    }

    _onMobileControllerMoveLeft()
    {
        this.moveLeft = true;
    }

    _onMobileControllerStopLeft()
    {
        this.moveLeft = false;
    }

    _onMobileControllerMoveRight()
    {
        this.moveRight = true;
    }

    _onMobileControllerStopRight()
    {
        this.moveRight = false;
    }
}