/************************************************************************
 * AcrofonyLevelManager.js
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

class AcrofonyLevelManager extends Object2D
{

    constructor(name)
    {
        super(name);

        /** @type {AcrofonyGame} */
        this.curGame = null;
        /** @type {Button} */
        this.continueButton = null;
        /** @type {Button} */
        this.backButton = null;
        /** @type {Timer} */
        this.timer = null;

        /** @type {Array} */
        this.levels = [];
        /** @type {Number} */
        this.curLevel = -1;
        /** @type {Number} */
        this.totalPoints = 0;
        /** @type {Number} */
        this.totalLevels = 15;
        /** @type {Boolean} */
        this.doTutorial = true;

        /** @type {Number} */
        this.bgOpacity = 0;
        /** @type {Number} */
        this.textOpacity = 0;
    }

    _setup()
    {
        this.backButton = new Button("BackButton");
        this.backButton.setLabel("Voltar");
        this.backButton.setFontSize(30);
        this.backButton.setPosition(20, 20);
        this.backButton.setSize(110, 75);
        this.backButton.connect("mouseClicked", this, "_onBackClicked");
        this.addChild(this.backButton);

        this.continueButton = new Button("ContinueButton", "Continuar");
        this.continueButton.setPosition(1920 / 2 - this.continueButton.getSize().x / 2, 600);
        this.continueButton.setFontSize(40);
        this.continueButton.connect("mouseClicked", this, "_onContinueButtonMouseClicked");
        this.continueButton.hide();
        this.addChild(this.continueButton);

        this.timer = new Timer("Timer", 2, false, true);
        this.timer.connect("timeout", this, "_onTimerTimeout");
        this.addChild(this.timer);

        for (let i = 0; i < 45; i++)
            this.levels.push(i + 1);

        randomSeed(Date.now());
        this.levels = shuffle(this.levels);

        if (this.doTutorial)
            this.startTutorial();
        else
            this.nextLevel();
    }

    _draw( /** @type {Number} */ delta, /** @type {p5.Graphics} */ db)
    {
        background(52);

        if (this.curLevel < this.totalLevels)
        {
            db.fill(255);
            db.textSize(70);
            db.textAlign(CENTER, CENTER);
            if (this.curLevel >= 0)
                db.text(`Nível ${this.curLevel+1}`, 1920 / 2, 100);
            else
                db.text(`Tutorial`, 1920 / 2, 100);

        }
        else
        {
            this.timer.start();
            db.noStroke();
            db.fill(0, min(this.bgOpacity += 75 * delta, 200));
            db.rectMode(CENTER);
            db.rect(db.width / 2, db.height / 2, 1800, 600, 40, 40);
            db.textAlign(CENTER, CENTER);
            db.fill(255, min(this.textOpacity += 80 * delta, 255));
            db.textSize(40);
            db.text(`PARABÉNS, TODOS OS NÍVEIS FORAM CONCLUÍDOS\n\nVOCÊ GANHOU ${this.totalPoints} PONTOS!`, db.width / 2, db.height / 2 - 100);
        }
    }

    startTutorial()
    {
        this.curGame = new AcrofonyTutorial("Tutorial");
        this.curGame.levelData = ACROFONY_LEVELS.tutorial;
        this.curGame.connect("endGame", this, "_onEndLevel");
        this.addChild(this.curGame);
    }

    nextLevel()
    {
        this.curLevel++;
        if (this.curGame) this.curGame.queueFree();
        if (this.curLevel >= this.totalLevels) return;
        this.curGame = new AcrofonyGame("AcrofonyGame");
        this.curGame.levelData = ACROFONY_LEVELS[`level${this.levels[this.curLevel]}`];
        this.curGame.connect("endGame", this, "_onEndLevel");
        this.addChild(this.curGame);
    }

    _onEndLevel(points)
    {
        this.totalPoints += points;
        this.nextLevel();
    }

    _onTimerTimeout()
    {
        this.continueButton.show();
    }

    _onContinueButtonMouseClicked()
    {
        var ems = new EarthMinigameSelector("EarthMinigameSelector");
        GameHandler.addRootObject(ems);
        this.queueFree();
    }

    _onBackClicked()
    {
        var ems = new EarthMinigameSelector("EarthMinigameSelector");
        GameHandler.addRootObject(ems);
        this.queueFree();
    }
}