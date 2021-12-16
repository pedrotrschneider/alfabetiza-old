/************************************************************************
 * RebusGame.js
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

class RebusGame extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {Object} */
        this.levelData = null;
        /** @type {Boolean} */
        this.gameFinished = false;
        /** @type {number} */
        this.points = 3;

        /** @type {Button} */
        this.backButton = null;
        /** @type {Button} */
        this.continueButton = null;
        /** @type {Button} */
        this.timer = null;
    }

    _initSignals()
    {
        this.addSignal("slected");
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
            newCard.thumb = AssetHandler.getTextureByName(this.levelData.optionCards[j].name);
            newCard.imgName = this.levelData.optionCards[j].name;
            newCard.isAnswer = this.levelData.optionCards[j].answer;
            newCard.setPosition((i + 1) * (1920 / 4), 3 * (1080 / 4));
            newCard.connect("selected", this, "_onCardSelected");
            this.addChild(newCard);
        }

        for (let i = 0; i < this.levelData.questionCards.length; i++)
        {
            var newCard = new RebusQuestionCard("OptionCard" + i);
            AssetHandler.loadTexture(this.levelData.questionCards[i].name, this.levelData.questionCards[i].path);
            newCard.thumb = AssetHandler.getTextureByName(this.levelData.questionCards[i].name);
            newCard.imgName = this.levelData.questionCards[i].name;
            newCard.setPosition((i + 1) * (1920 / (this.levelData.questionCards.length + 1)), 1080 / 4);
            this.addChild(newCard);
        }

        this.addChild(new RebusGameVisualEffects("GameVisualEffects"));

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

        this.timer = new Timer("Timer", 2, false, true);
        this.timer.connect("timeout", this, "_onTimerTimeout");
        this.addChild(this.timer);
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

    _onCardSelected( /** @type {Boolean} */ isAnswer)
    {
        if (!isAnswer)
            this.points--;
        else
        {
            this.gameFinished = true;
            this.backButton.hide();
            this.timer.start();
            for (let i = 0; i < this.children.length; i++)
            {
                if (this.children[i] instanceof RebusOptionCard)
                    this.children[i].selectable = false;
            }
        }
    }

    _onBackClicked()
    {
        this.returnToMenu();
    }

    _onContinueClicked()
    {
        this.returnToMenu();
    }

    _onTimerTimeout()
    {
        this.continueButton.show();
    }
}