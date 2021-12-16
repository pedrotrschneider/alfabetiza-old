/************************************************************************
 * Valise3Game.js
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

class Valise3Game extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {Object} */
        this.levelData = null;
        /** @type {Valise3QuestionCard} */
        this.questionCard = null;
        /** @type {Object2D} */
        this.optionCards = null;
        /** @type {Button} */
        this.backButton = null;
        /** @type {Valise3GameDialogue} */
        this.dialogue = null;

        /** @type {Number} */
        this.points = 3;
        /** @type {Boolean} */
        this.gameFinished = false;
        /** @type {Number} */
        this.numAnswers = 0;
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

        this.questionCard = new Valise3QuestionCard("QuestionCard");
        this.questionCard.str = this.levelData.questionCard.name;
        this.questionCard.setPosition(1920 / 2, 300);
        this.addChild(this.questionCard);

        this.optionCards = new Object2D("OptionCards");
        this.addChild(this.optionCards);
        var idx = [];
        for (let i = 0; i < this.levelData.optionCards.length; i++)
            idx.push(i);
        randomSeed(Date.now());
        idx = shuffle(idx);
        for (let i = 0; i < this.levelData.optionCards.length; i++)
        {
            var newCard = new Valise3OptionCard(`OptionCard${i}`);
            newCard.setPosition((i + 1) * 1920 / (this.levelData.optionCards.length + 1), 800);
            newCard.isAnswer = this.levelData.optionCards[idx[i]].isAnswer;
            newCard.connect("selected", this, "_onCardSelected");
            newCard.str = this.levelData.optionCards[idx[i]].name;
            this.levelData.optionCards[idx[i]].isAnswer ? this.numAnswers++ : 0;
            this.optionCards.addChild(newCard);
        }
        console.log(this.numAnswers)

        this.dialogue = new Valise3GameDialogue("GameDialogue");
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
            this.numAnswers--;
            if (this.numAnswers != 0) return;
            this.backButton.hide();
            this.gameFinished = true;
            for (let i = 0; i < this.optionCards.children.length; i++)
                this.optionCards.children[i].selectable = false;
        }
    }

    _onDialogueEndGame()
    {
        this._onBackClicked();
    }

    _onBackClicked()
    {
        var vls = new Valise3LevelSelector("Valise3LevelSelector");
        GameHandler.addRootObject(vls);
        AssetHandler.clearTextureCache();
        this.queueFree();
    }
}