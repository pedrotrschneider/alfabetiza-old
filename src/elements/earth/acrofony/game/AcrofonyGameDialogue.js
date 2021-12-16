/************************************************************************
 * AcrofonyGameDialogue.js
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

class AcrofonyGameDialogue extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {Button} */
        this.continueButton = null;
        /** @type {Timer} */
        this.timer;

        /** @type {String} */
        this.suffix = "";
        /** @type {number} */
        this.bgOpacity = 0;
        /** @type {number} */
        this.textOpacity = 0;
    }

    _initSignals()
    {
        this.addSignal("endGame");
    }

    _setup()
    {
        this.timer = new Timer("Timer", 2, false, true);
        this.timer.connect("timeout", this, "_onTimerTimeout");
        this.addChild(this.timer);

        this.continueButton = new Button("ContinueButton", "Continuar");
        this.continueButton.setFontSize(40);
        this.continueButton.setPosition(1920 / 2 - this.continueButton.getSize().x / 2, 600);
        this.continueButton.connect("mouseClicked", this, "_onContinueButtonClicked");
        this.addChild(this.continueButton);
        this.continueButton.hide();
    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        if (this.parent.gameFinished)
        {
            this.timer.start();
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

    _onTimerTimeout()
    {
        this.continueButton.show();
    }

    _onContinueButtonClicked()
    {
        this.emitSignal("endGame");
    }
}