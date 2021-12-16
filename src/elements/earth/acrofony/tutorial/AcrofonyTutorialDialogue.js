/************************************************************************
 * AcrofonyTutorialDialogue.js
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

class AcrofonyTutorialDialogue extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {Button} */
        this.continueButton = null;
        /** @type {Timer} */
        this.timer;

        /** @type {String} */
        this.text = "";
        /** @type {number} */
        this.bgOpacity = 0;
        /** @type {number} */
        this.textOpacity = 0;
    }

    _initSignals()
    {
        this.addSignal("continue");
    }

    _setup()
    {
        this.continueButton = new Button("ContinueButton", "Continuar");
        this.continueButton.connect("mouseClicked", this, "_onContinueButtonMouseClicked");
        this.continueButton.hide();
        this.continueButton.setFontSize(40);
        this.continueButton.setPosition(1920 / 2 - this.continueButton.getSize().x / 2, 600);
        this.addChild(this.continueButton);
    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        switch (this.parent.tutorialStep)
        {
            case 0:
                this.bgOpacity = 0;
                this.textOpacity = 0;
                break;
            case 1:
                this.bgOpacity = min(this.bgOpacity + 150 * delta, 200);
                this.textOpacity = min(this.textOpacity + 150 * delta, 255);
                this.text = "Qual o primeiro pedacinho da palavra RELÓGIO?"
                if (this.textOpacity == 255) this.continueButton.show();
                break;
            case 2:
                this.continueButton.hide();
                this.bgOpacity = max(this.bgOpacity - 150 * delta, 0);
                this.textOpacity = max(this.textOpacity - 150 * delta, 0);
                this.text = "Qual o primeiro pedacinho da palavra RELÓGIO?"
                break;
            case 3:
                this.bgOpacity = 0;
                this.textOpacity = 0;
                break;
            case 8:
                this.bgOpacity = min(this.bgOpacity + 150 * delta, 200);
                this.textOpacity = min(this.textOpacity + 150 * delta, 255);
                this.text = "O primeiro pedacinho de RELÓGIO é RE\n\nAgora é sua vez!"
                if (this.textOpacity == 255) this.continueButton.show();
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

    _onContinueButtonMouseClicked()
    {
        this.emitSignal("continue");
    }
}