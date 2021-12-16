/************************************************************************
 * Valise1Tutorial.js
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

class Valise1Tutorial extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {Object} */
        this.levelData = null;
        /** @type {Valise1QuestionCard} */
        this.questionCard = null;
        /** @type {Object2D} */
        this.optionCards = null;
        /** @type {Button} */
        this.backButton = null;
        /** @type {Valise1TutorialDialogue} */
        this.dialogue = null;
        /** @type {Timer} */
        this.timer = null;

        /** @type {Number} */
        this.points = 3;
        /** @type {Boolean} */
        this.gameFinished = false;
        /** @type {Number} */
        this.tutorialStep = 0;
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

        AssetHandler.loadTexture(this.levelData.questionCard.name, this.levelData.questionCard.path);
        this.questionCard = new Valise1QuestionCard("QuestionCard");
        this.questionCard.thumb = AssetHandler.getTextureByName(this.levelData.questionCard.name);
        this.questionCard.setPosition(1920 / 2, 300);
        this.addChild(this.questionCard);

        this.optionCards = new Object2D("OptionCards");
        this.addChild(this.optionCards);
        var idx = [0, 1, 2, 3];
        randomSeed(Date.now());
        idx = shuffle(idx);
        for (let i = 0; i < 4; i++)
        {
            AssetHandler.loadTexture(this.levelData.optionCards[idx[i]].name, this.levelData.optionCards[idx[i]].path);
            var newCard = new Valise1OptionCard(`OptionCard${i}`);
            newCard.thumb = AssetHandler.getTextureByName(this.levelData.optionCards[idx[i]].name);
            newCard.setPosition((i + 1) * 1920 / 5, 800);
            newCard.isAnswer = idx[i] == 0;
            newCard.connect("selected", this, "_onCardSelected");
            newCard.str = this.levelData.optionCards[idx[i]].name;
            newCard.selectable = false;
            this.optionCards.addChild(newCard);
        }

        this.dialogue = new Valise1TutorialDialogue("TutorialDialogue");
        this.dialogue.connect("continue", this, "_onTutorialContinue");
        this.addChild(this.dialogue);

        this.timer = new Timer("Timer", 2, false, true);
        this.timer.connect("timeout", this, "_onTimerTimeout");
        this.addChild(this.timer);
        this.timer.start();
    }

    _draw( /** @type {Number} */ delta, /** @type {p5.Graphics} */ db)
    {
        background(52);
    }

    _onCardSelected( /** @type {Boolean} */ isAnswer)
    {
        if (!isAnswer) this.points--;
        else
        {
            this.gameFinished = true;
            for (let i = 0; i < 4; i++)
                this.optionCards.children[i].selectable = false;
        }
    }

    _onTutorialContinue()
    {
        this.tutorialStep++;

        switch (this.tutorialStep)
        {
            case 2:
                this.timer.start(2);
                break;
            case 10:
                this._onBackClicked();
                break;
        }
    }

    _onTimerTimeout()
    {
        this.tutorialStep++;

        switch (this.tutorialStep)
        {
            case 3:
                this.optionCards.children[0].selectable = true;
                this.optionCards.children[0].mouseOver = true;
                this.optionCards.children[1].selectable = false;
                this.optionCards.children[1].mouseOver = false;
                this.optionCards.children[2].selectable = false;
                this.optionCards.children[2].mouseOver = false;
                this.optionCards.children[3].selectable = false;
                this.optionCards.children[3].mouseOver = false;
                this.timer.start(0.5);
                break;
            case 4:
                this.optionCards.children[0].selectable = false;
                this.optionCards.children[0].mouseOver = false;
                this.optionCards.children[1].selectable = true;
                this.optionCards.children[1].mouseOver = true;
                this.optionCards.children[2].selectable = false;
                this.optionCards.children[2].mouseOver = false;
                this.optionCards.children[3].selectable = false;
                this.optionCards.children[3].mouseOver = false;
                this.timer.start(0.5);
                break;
            case 5:
                this.optionCards.children[0].selectable = false;
                this.optionCards.children[0].mouseOver = false;
                this.optionCards.children[1].selectable = false;
                this.optionCards.children[1].mouseOver = false;
                this.optionCards.children[2].selectable = true;
                this.optionCards.children[2].mouseOver = true;
                this.optionCards.children[3].selectable = false;
                this.optionCards.children[3].mouseOver = false;
                this.timer.start(0.5);
                break;
            case 6:
                this.optionCards.children[0].selectable = false;
                this.optionCards.children[0].mouseOver = false;
                this.optionCards.children[1].selectable = false;
                this.optionCards.children[1].mouseOver = false;
                this.optionCards.children[2].selectable = false;
                this.optionCards.children[2].mouseOver = false;
                this.optionCards.children[3].selectable = true;
                this.optionCards.children[3].mouseOver = true;
                this.timer.start(0.5);
                break;
            case 7:
                this.optionCards.children[0].selectable = false;
                this.optionCards.children[0].mouseOver = false;
                this.optionCards.children[1].selectable = false;
                this.optionCards.children[1].mouseOver = false;
                this.optionCards.children[2].selectable = false;
                this.optionCards.children[2].mouseOver = false;
                this.optionCards.children[3].selectable = false;
                this.optionCards.children[3].mouseOver = false;
                this.timer.start(2);
                break;
            case 8:
                this.optionCards.children[0].selected = true;
                this.optionCards.children[1].selected = true;
                this.optionCards.children[2].selected = true;
                this.optionCards.children[3].selected = true;
                this.timer.start(1);
                break;
        }
    }

    _onBackClicked()
    {
        var vls = new Valise1LevelSelector("Valise1LevelSelector");
        GameHandler.addRootObject(vls);
        AssetHandler.clearTextureCache();
        this.queueFree();
    }
}