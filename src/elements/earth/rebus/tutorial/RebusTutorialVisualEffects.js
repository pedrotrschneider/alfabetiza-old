/************************************************************************
 * RebusTutorialVisualEffects.js
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

class RebusTutorialVisualEffects extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {String} */
        this.text = "";
        /** @type {Number} */
        this.bgOpacity = 0;
        /** @type {Number} */
        this.textOpacity = 0;
    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        switch (this.parent.tutorialStep)
        {
            case 0:
                this.bgOpacity = min(this.bgOpacity + 150 * delta, 200);
                this.textOpacity = min(this.textOpacity + 150 * delta, 255);
                this.text = `Vamos ler rébus?\nRébus é uma palavra formada quando juntamos os primeiros\npedacinhos de outras palavras.\nVeja!`;
                break;
            case 1:
                this.bgOpacity = max(this.bgOpacity - 150 * delta, 0);
                this.textOpacity = max(this.textOpacity - 150 * delta, 0);
                this.text = `Vamos ler rébus?\nRébus é uma palavra formada quando juntamos os primeiros\npedacinhos de outras palavras.\nVeja!`;
                break;
            case 2:
                this.bgOpacity = 0;
                this.textOpacity = 0;
                break;
            case 3:
                this.bgOpacity = min(this.bgOpacity + 150 * delta, 200);
                this.textOpacity = min(this.textOpacity + 150 * delta, 255);
                this.text = `Que palavra será formada ao juntarmos o começo dessas duas palavras?`;
                break;
            case 4:
                this.bgOpacity = max(this.bgOpacity - 150 * delta, 0);
                this.textOpacity = max(this.textOpacity - 150 * delta, 0);
                this.text = `Que palavra será formada ao juntarmos o começo dessas duas palavras?`;
                break;
            case 5:
                this.bgOpacity = 0;
                this.textOpacity = 0;
                break;
            case 7:
                this.bgOpacity = min(this.bgOpacity + 150 * delta, 200);
                this.textOpacity = min(this.textOpacity + 150 * delta, 255);
                this.text = `Agora é sua vez!`;
                break;
        }

        db.noStroke();
        db.fill(0, this.bgOpacity);
        db.rectMode(CENTER);
        db.rect(db.width / 2, db.height / 2, 1800, 600, 40, 40);
        db.textAlign(CENTER, CENTER);
        db.fill(255, this.textOpacity);
        db.textSize(40);
        db.text(this.text, db.width / 2, db.height / 2 - 100);
    }
}