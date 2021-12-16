/************************************************************************
 * LetterHuntDialogue.js
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

class LetterHuntDialogue extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {String} */
        this.text = ``;
    
        /** @type {Number} */
        this.bgOpacity = 0;
        /** @type {Number} */
        this.textOpacity = 0;
    
        /** @type {Button} */
        this.continueButton = null;
        /** @type {Tween} */
        this.tween = null;
        /** @type {Timer} */
        this.buttonTimer = null;
    }

    _initSignals()
    {
        this.addSignal("dialogueFinished");
    }

    _setup()
    {

        this.setPosition(1920 / 2, 1080 - 300);
        this.continueButton = new Button("Continue", "Continuar")
        this.continueButton.setFontSize(40)
        this.continueButton.setPosition(-this.continueButton.getSize().x / 2, -this.continueButton.getSize().y / 2 + 100);
        this.continueButton.connect("mouseClicked", this, "_onContinueClicked");
        this.continueButton.hide();
        this.addChild(this.continueButton);

        this.tween = new Tween("Tween");
        this.tween.interpolateProperty(this, "bgOpacity", PROPERTY_TYPE.NUMBER, 0, 200, 2, TRANS_TYPE.LINEAR);
        this.tween.interpolateProperty(this, "textOpacity", PROPERTY_TYPE.NUMBER, 0, 255, 2, TRANS_TYPE.LINEAR);
        this.addChild(this.tween);

        this.buttonTimer = new Timer("ButtonTimer");
        this.buttonTimer.connect("timeout", this, "_onTimerTimeout");
        this.addChild(this.buttonTimer);
    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        this.text = `ACABOU O JOGO!\n\nVOCÊ GANHOU ${this.parent.points} PONTOS!`;
        db.noStroke();
        db.fill(0, this.bgOpacity);
        db.rectMode(CENTER);
        db.rect(0, 0, 1800, 400, 40, 40);
        db.textAlign(CENTER, CENTER);
        db.fill(255, this.textOpacity);
        db.textSize(40);
        db.text(this.text, 0, -100);
    }

    _initDialogue()
    {
        this.tween.startAll();
        this.buttonTimer.start(3);
    }

    _onTimerTimeout()
    {
        this.continueButton.show();
    }

    _onContinueClicked()
    {
        this.continueButton.hide();
        this.emitSignal("dialogueFinished");
    }
}