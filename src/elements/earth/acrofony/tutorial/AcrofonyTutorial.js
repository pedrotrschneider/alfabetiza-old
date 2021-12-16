/************************************************************************
 * AcrofonyTutorial.js
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

class AcrofonyTutorial extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {Object} */
        this.levelData = ACROFONY_LEVELS.level5;
        /** @type {Boolean} */
        this.gameFinished = false;
        /** @type {Number} */
        this.tutorialStep = 0;

        /** @type {AcrofonyQuestionCard} */
        this.questionCard = null;
        /** @type {AcrofonyGameDialogue} */
        this.dialogue = null;
        /** @type {Object2D} */
        this.answerCards = null;
        /** @type {Timer} */
        this.timer = null;
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
            newCard.selectable = false;
            newCard.connect("selected", this, "_onCardSelected");
            this.answerCards.addChild(newCard);
        }

        this.dialogue = new AcrofonyTutorialDialogue("AcrofonyGameDialogue");
        this.dialogue.connect("continue", this, "_onDialogueContinue")
        this.addChild(this.dialogue);

        this.timer = new Timer("Timer", 2, false, true);
        this.timer.connect("timeout", this, "_onTimerTimeout");
        this.addChild(this.timer);

        this.timer.start();
    }

    _update( /** @type {number} */ delta)
    {
        switch (this.tutorialStep)
        {
            case 3:
                this.answerCards.children[0].selectable = true;
                this.answerCards.children[0].mouseOver = true;
                this.answerCards.children[1].selectable = false;
                this.answerCards.children[1].mouseOver = false;
                this.answerCards.children[2].selectable = false;
                this.answerCards.children[2].mouseOver = false;
                break;
            case 4:
                this.answerCards.children[1].selectable = true;
                this.answerCards.children[1].mouseOver = true;
                this.answerCards.children[0].selectable = false;
                this.answerCards.children[0].mouseOver = false;
                this.answerCards.children[2].selectable = false;
                this.answerCards.children[2].mouseOver = false;
                break;
            case 5:
                this.answerCards.children[2].selectable = true;
                this.answerCards.children[2].mouseOver = true;
                this.answerCards.children[0].selectable = false;
                this.answerCards.children[0].mouseOver = false;
                this.answerCards.children[1].selectable = false;
                this.answerCards.children[1].mouseOver = false;
                break;
            case 6:
                this.answerCards.children[0].selectable = false;
                this.answerCards.children[0].mouseOver = false;
                this.answerCards.children[1].selectable = false;
                this.answerCards.children[1].mouseOver = false;
                this.answerCards.children[2].selectable = false;
                this.answerCards.children[2].mouseOver = false;
                break;
            case 7:
                this.answerCards.children[0].selected = true;
                this.answerCards.children[1].selected = true;
                this.answerCards.children[2].selected = true;
        }
    }

    _onTimerTimeout()
    {
        switch (this.tutorialStep)
        {
            case 0:
                this.tutorialStep++;
                break;
            case 2:
                this.tutorialStep++;
                this.timer.start(0.5);
                break;
            case 3:
                this.tutorialStep++;
                this.timer.start(0.5);
                break;
            case 4:
                this.tutorialStep++;
                this.timer.start(0.5);
                break;
            case 5:
                this.tutorialStep++;
                this.timer.start(1);
                break;
            case 6:
                this.tutorialStep++;
                this.timer.start(1);
                break;
            case 7:
                this.tutorialStep++;
                break;
        }
    }

    _onDialogueContinue()
    {
        this.tutorialStep++;

        switch (this.tutorialStep)
        {
            case 2:
                this.timer.start(2);
                break;
            case 9:
                this.emitSignal("endGame", 0);
                break;
        }
    }
}