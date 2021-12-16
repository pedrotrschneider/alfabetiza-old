/************************************************************************
 * AcrofonyGame.js
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

class AcrofonyGame extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {Object} */
        this.levelData = ACROFONY_LEVELS.level5;
        /** @type {Boolean} */
        this.gameFinished = false;
        /** @type {Number} */
        this.points = 3;

        /** @type {AcrofonyQuestionCard} */
        this.questionCard = null;
        /** @type {AcrofonyGameDialogue} */
        this.dialogue = null;
        /** @type {Object2D} */
        this.answerCards = null;
    }

    _initSignals()
    {
        this.addSignal("endGame");
    }

    _setup()
    {
        AssetHandler.loadTexture(this.levelData.name, this.levelData.path);
        this.questionCard = new AcrofonyQuestionCard("QuestionCard");
        this.questionCard.thumb = AssetHandler.getTextureByName(this.levelData.name);
        this.questionCard.imgName = this.levelData.name;
        this.questionCard.setPosition(1920 / 2, 400);
        this.addChild(this.questionCard);

        var answers = [0, 1, 2];
        randomSeed(Date.now());
        answers = shuffle(answers);
        this.answerCards = new Object2D("AnswerCards");
        this.addChild(this.answerCards);
        for (let i = 0; i < 3; i++)
        {
            var newCard = new AcrofonyOptionCard(`AnswerCard${i}`);
            newCard.syllable = this.levelData.syllables[answers[i]] + "\n🗢";
            newCard.setPosition((i + 1) * 1920 / 4, 900);
            newCard.isAnswer = answers[i] == 0;
            newCard.connect("selected", this, "_onCardSelected");
            this.answerCards.addChild(newCard);
        }

        this.dialogue = new AcrofonyGameDialogue("AcrofonyGameDialogue");
        this.dialogue.connect("endGame", this, "_onDialogueEndGame");
        this.addChild(this.dialogue);
    }

    _onCardSelected( /** @type {Boolean} */ isAnswer)
    {
        if (!isAnswer)
            this.points--;
        else
        {
            this.gameFinished = true;
            for (let i = 0; i < 3; i++)
                this.answerCards.children[i].selectable = false;
        }
    }

    _onDialogueEndGame()
    {
        this.emitSignal("endGame", this.points);
    }
}