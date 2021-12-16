/************************************************************************
 * RebusTutorial.js
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

class RebusTutorial extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {Object} */
        this.levelData = null;
        /** @type {Boolean} */
        this.gameFinished = false;
        /** @type {Number} */
        this.points = 3;
    
        /** @type {Button} */
        this.backButton = null;
        /** @type {Button} */
        this.continueButton = null;
        /** @type {Timer} */
        this.timer = null;
    
        /** @type {Number} */
        this.tutorialStep = 0;
        /** @type {Array} */
        this.questionCards = [];
        /** @type {Array} */
        this.optionCards = [];
        /** @type {Number} */
        this.answerIdx = 0;
    }

    _setup()
    {
        var arr = [];
        for (let i = 0; i < this.levelData.optionCards.length; i++)
            arr.push(i);
        arr = shuffle(arr);

        for (let i = 0; i < this.levelData.optionCards.length; i++)
        {
            var j = arr[i];
            var newCard = new RebusOptionCard("OptionCard" + j);
            AssetHandler.loadTexture(this.levelData.optionCards[j].name, this.levelData.optionCards[j].path);
            newCard.selectable = false;
            newCard.thumb = AssetHandler.getTextureByName(this.levelData.optionCards[j].name);
            newCard.imgName = this.levelData.optionCards[j].name;
            newCard.isAnswer = this.levelData.optionCards[j].answer;
            if (newCard.isAnswer) this.answerIdx = i;
            newCard.setPosition((i + 1) * (1920 / 4), 3 * (1080 / 4));
            this.addChild(newCard);
            this.optionCards.push(newCard);
            newCard.hide();
        }

        for (let i = 0; i < this.levelData.questionCards.length; i++)
        {
            var newCard = new RebusQuestionCard("OptionCard" + i);
            AssetHandler.loadTexture(this.levelData.questionCards[i].name, this.levelData.questionCards[i].path);
            newCard.thumb = AssetHandler.getTextureByName(this.levelData.questionCards[i].name);
            newCard.imgName = this.levelData.questionCards[i].name;
            newCard.setPosition((i + 1) * (1920 / (this.levelData.questionCards.length + 1)), 1080 / 4);
            this.addChild(newCard);
            this.questionCards.push(newCard);
            newCard.hide();
        }

        this.backButton = new Button("BackButton");
        this.backButton.setLabel("Voltar");
        this.backButton.setFontSize(30);
        this.backButton.setPosition(20, 20);
        this.backButton.setSize(110, 75);
        this.backButton.connect("mouseClicked", this, "_onBackClicked");
        this.addChild(this.backButton);

        this.continueButton = new Button("ContinueButton");
        this.continueButton.setLabel("Continuar");
        this.continueButton.setFontSize(40);
        this.continueButton.setPosition((1920 - this.continueButton.getSize().x) / 2, 1080 - 450);
        this.continueButton.hide();
        this.continueButton.connect("mouseClicked", this, "_onContinueClicked");
        this.addChild(this.continueButton);

        this.timer = new Timer("Timer", 2, true, true);
        this.timer.connect("timeout", this, "_onTimerTimeout");
        this.addChild(this.timer);

        this.addChild(new RebusTutorialVisualEffects);
    }

    _update( /** @type {Number} */ delta)
    {
        switch (this.tutorialStep)
        {
            case 2:
                for (let i = 0; i < this.questionCards.length; i++)
                    this.questionCards[i].show();
                this.timer.start(1);
                break;
            case 5:
                for (let i = 0; i < this.optionCards.length; i++)
                    this.optionCards[i].show();
                this.timer.start(2);
            case 6:
                this.timer.start(3);
                break;
        }
    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        background(52);
    }

    returnToMenu()
    {
        AssetHandler.clearTextureCache();
        GameHandler.addRootObject(new RebusLevelSelector("LevelSelector"));
        this.queueFree();
    }

    _onBackClicked()
    {
        this.returnToMenu();
    }

    _onContinueClicked()
    {
        this.continueButton.hide();
        this.tutorialStep++;

        switch (this.tutorialStep)
        {
            case 4:
                this.timer.start(2);
                break;
            case 8:
                this.returnToMenu();
                break;
        }
    }

    _onTimerTimeout()
    {
        switch (this.tutorialStep)
        {
            case 0:
                this.continueButton.show();
                this.timer.start(3);
                break;
            case 1:
                this.tutorialStep++;
                break;
            case 2:
                this.tutorialStep++;
                this.timer.start(2);
                break;
            case 3:
                this.continueButton.show();
                break;
            case 4:
                this.tutorialStep++;
                break;
            case 5:
                for (let i = 0; i < this.optionCards.length; i++)
                    this.optionCards[i].selected = true;
                this.tutorialStep++;
                break;
            case 6:
                this.tutorialStep++;
                this.timer.start(2);
                break;
            case 7:
                this.continueButton.show();
                break;
        }
    }
}