/************************************************************************
 * Valise1Game.js
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

class Valise1Game extends Object2D
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
        /** @type {Valise1GameDialogue} */
        this.dialogue = null;

        /** @type {Number} */
        this.points = 3;
        /** @type {Boolean} */
        this.gameFinished = false;
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
            this.optionCards.addChild(newCard);
        }

        this.dialogue = new Valise1GameDialogue("GameDialogue");
        this.dialogue.connect("endGame", this, "_onDialogueEndGame");
        this.addChild(this.dialogue);
    }

    _draw( /** @type {Number} */ delta, /** @type {p5.Graphics} */ db)
    {
        background(52);

        // db.fill(255);
        // db.textSize(70);
        // db.textAlign(CENTER, CENTER);
        // db.text(`Nível ${this.levelData}`, 1920 / 2, 100);
    }

    _onCardSelected( /** @type {Boolean} */ isAnswer)
    {
        if (!isAnswer) this.points--;
        else
        {
            this.backButton.hide();
            this.gameFinished = true;
            for (let i = 0; i < 4; i++)
                this.optionCards.children[i].selectable = false;
        }
    }

    _onDialogueEndGame()
    {
        this._onBackClicked();
    }

    _onBackClicked()
    {
        var vls = new Valise1LevelSelector("Valise1LevelSelector");
        GameHandler.addRootObject(vls);
        AssetHandler.clearTextureCache();
        this.queueFree();
    }
}