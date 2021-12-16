/************************************************************************
 * LetterHuntGame.js
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

class LetterHuntGame extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {Button} */
        this.backButton = null;
        /** @type {Object2D} */
        this.plants = null;
        /** @type {LetterHuntDialogue} */
        this.dialogue = null;
        /** @type {Timer} */
        this.initialTimer = null;
        /** @type {Timer} */
        this.roundTimer = null;
        /** @type {Timer} */
        this.gameTimer = null;

        /** @type {Boolean} */
        this.gameStarted = false;
        /** @type {Boolean} */
        this.gameEnded = false;
        /** @type {Number} */
        this.points = 0;
        /** @type {String} */
        this.answerLetter = "";
    }

    _setup()
    {
        // this.drawOnTopOfChildren = true;

        this.backButton = new Button("BackButton");
        this.backButton.setLabel("Voltar");
        this.backButton.setFontSize(30);
        this.backButton.setPosition(20, 20);
        this.backButton.setSize(110, 75);
        this.backButton.connect("mouseClicked", this, "_onBackClicked");
        this.addChild(this.backButton);

        this.initialTimer = new Timer("InitialTimer", 4, true, true);
        this.initialTimer.connect("timeout", this, "_onInitialTimerTimeout");
        this.addChild(this.initialTimer);

        this.roundTimer = new Timer("RoundTimer", 10, false, true);
        this.roundTimer.connect("timeout", this, "_onRoundTimerTimeout");
        this.addChild(this.roundTimer);

        this.gameTimer = new Timer("GameTimer", 60, false, true);
        this.gameTimer.connect("timeout", this, "_onGameTimerTimeout");
        this.addChild(this.gameTimer);

        this.plants = new Object2D("Plants");
        this.addChild(this.plants);
        // this.startNewRound();

        this.dialogue = new LetterHuntDialogue("Dialogue");
        this.dialogue.connect("dialogueFinished", this, "_onDialogueEnded");
        this.addChild(this.dialogue);
    }

    _update( /** @type {Number} */ delta)
    {

    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        background("#657518");

        db.fill(0);
        if (!this.gameStarted)
        {
            db.textAlign(CENTER, CENTER);
            db.textSize(200);
            var tl = int(this.initialTimer.timeLeft - 0.00001);
            if (tl >= 1)
                db.text(`${tl}`, 1920 / 2, 300);
            else
            {
                db.textSize(100);
                db.text(`Começar!`, 1920 / 2, 300);
            }

        }
        db.textAlign(RIGHT, TOP);
        db.textSize(50);

        if (this.gameStarted && !this.gameEnded)
        {
            db.text(`t: ${int(this.gameTimer.timeLeft - 0.0001 + 1)}`, 1920 - 10, 10);
            db.text(`t2: ${int(this.roundTimer.timeLeft - 0.0001 + 1)}`, 1920 - 10, 60);
            db.push();
            db.textAlign(CENTER, CENTER);
            db.textSize(80);
            db.text(`Onde está a letra ${this.answerLetter}?`, 1920 / 2, 100);
            db.pop();
        }
        else
        {
            db.text(`t: 0`, 1920 - 10, 10);
            db.text(`t2: 0`, 1920 - 10, 60);
        }
        db.text(`p: ${this.points}`, 1920 - 10, 110);

    }

    startNewRound()
    {
        var l = [];
        this.answerLetter = String.fromCharCode(random(65, 90));
        var n = random(2, 4);
        for (let i = 0; i < n; i++)
            l.push(this.answerLetter);
        for (let i = 0; i < 20 - n; i++)
            l.push(String.fromCharCode(random(65, 90)));
        this.l = shuffle(l);

        if (this.plants.children.length > 0)
            for (let i = 0; i < 20; i++)
                this.plants.children[i].queueFree();

        for (let i = 0; i < 5; i++)
        {
            for (let j = 0; j < 4; j++)
            {
                var newPlant = new LetterHuntPlant(`Plant${i}_${j}`);
                newPlant.setPosition((i * 1920 / 5) + random(50, 1920 / 5 - 50), (200 + j * (1080 - 200) / 4) + random(50, (1080 - 200) / 4 - 50));
                newPlant.letter = this.l[i * 4 + j];
                newPlant.connect("selected", this, "_onPlantSelected");
                this.plants.addChild(newPlant);
            }
        }

        this.roundTimer.reset();
    }

    _onPlantSelected( /** @type {LetterHuntPlant} */ plant)
    {
        if (plant.letter === this.answerLetter)
        {
            this.points += 3;
            this.startNewRound();
        }
        else
            plant.selectable = false;
    }

    _onBackClicked()
    {
        var ems = new EarthMinigameSelector("EarthMinigameSelector");
        GameHandler.addRootObject(ems);
        this.queueFree();
    }

    _onInitialTimerTimeout()
    {
        // for (let i = 0; i < 20; i++)
        //     this.plants.children[i].selectable = true;
        this.gameStarted = true;
        this.gameTimer.start();
        this.roundTimer.start();
        this.startNewRound();
    }

    _onRoundTimerTimeout()
    {
        this.startNewRound();
        this.roundTimer.start();
    }

    _onGameTimerTimeout()
    {
        this.gameEnded = true;
        this.roundTimer.stop();
        for (let i = 0; i < 20; i++)
            this.plants.children[i].selectable = false;
        this.dialogue._initDialogue();
    }

    _onDialogueEnded()
    {
        this._onBackClicked();
    }
}