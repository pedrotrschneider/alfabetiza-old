/************************************************************************
 * FoodHuntFruit.js
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

class FoodHuntFruit extends Object2D
{
    constructor(name)
    {
        super(name);
        
        /** @type {Number} */
        this.G = 10;
    
        /** @type {FoodHuntBasket} */
        this.basket = null;
        /** @type {Color} */
        this.color = new Color(0, 0, 0);
        /** @type {Number} */
        this.r = 50;
        /** @type {Number} */
        this.fallVel = 0;
        /** @type {Boolean} */
        this.collected = false;
    }

    _initSignals()
    {
        this.addSignal("collected");
    }

    _setup()
    {
        this.color.r = random(0, 255);
        this.color.g = random(0, 255);
        this.color.b = random(0, 255);
    }

    _update( /** @type {Number} */ delta)
    {
        this.fallVel += this.G;
        this.position.y += this.fallVel * delta;

        if (!this.collected && this.globalPosition.y >= 825 && this.globalPosition.y <= 850)
        {
            if (this.globalPosition.x <= this.basket.globalPosition.x + 55 && this.globalPosition.x >= this.basket.globalPosition.x - 55)
                this.collected = true;
        }
        else if (this.collected && this.position.y >= 900)
            this.onFruitCollected();
        else if (this.position.y >= 1200)
            this.queueFree();
    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        db.fill(this.color.getP5Color());
        db.ellipse(0, 0, this.r);
    }

    onFruitCollected()
    {
        this.queueFree();
        this.emitSignal("collected");
    }
}