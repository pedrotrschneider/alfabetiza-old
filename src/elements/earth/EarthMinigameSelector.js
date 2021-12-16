/************************************************************************
 * EarthMinigameSelector.js
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

class EarthMinigameSelector extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {Button} */
        this.backButton = null;
        /** @type {Button} */
        this.foodHuntButton = null;
        /** @type {Button} */
        this.letterHuntButton = null;
        /** @type {Button} */
        this.acrofonyButton = null;
        /** @type {Button} */
        this.valise1Button = null;
        /** @type {Button} */
        this.valise2Button = null;
        /** @type {Button} */
        this.valise3Button = null;
        /** @type {Button} */
        this.rebusButton = null;
        /** @type {Button} */
        this.guessButton = null;
    }

    _setup()
    {
        // Create back button
        this.backButton = new Button("BackButton");
        this.backButton.setLabel("Voltar");
        this.backButton.setFontSize(30);
        this.backButton.setPosition(20, 20);
        this.backButton.setSize(110, 75);
        this.backButton.connect("mouseClicked", this, "_onBackClicked");
        this.addChild(this.backButton);

        // Values for creating the button grid
        var buttonSize = new Vector2(1920 / 4.5, 1080 / 4.5);
        var buttonsCorner = new Vector2(1920 / 2 - 1920 / 3, 1080 / 2 - 1080 / 3 + 100);
        var buttonMargin = new Vector2(50, 50);
        var buttonFontSize = 50;

        // Create food hunt button
        this.foodHuntButton = new Button("FoodHuntButton", "Caça alimentos");
        this.foodHuntButton.setFontSize(buttonFontSize);
        this.foodHuntButton.setSize(buttonSize.x - buttonMargin.x, buttonSize.y - buttonMargin.y);
        this.foodHuntButton.setPosition(buttonsCorner.x + buttonMargin.x / 2, buttonsCorner.y + buttonMargin.y / 2);
        this.foodHuntButton.connect("mouseClicked", this, "_onFoodHuntSelected");
        this.addChild(this.foodHuntButton);

        // Create letter hunt button
        this.letterHuntButton = new Button("LetterHuntButton", "Caça letras");
        this.letterHuntButton.setFontSize(buttonFontSize);
        this.letterHuntButton.setSize(buttonSize.x - buttonMargin.x, buttonSize.y - buttonMargin.y);
        this.letterHuntButton.setPosition(buttonsCorner.x + buttonMargin.x / 2 + buttonSize.x, buttonsCorner.y + buttonMargin.y / 2);
        this.letterHuntButton.connect("mouseClicked", this, "_onLetterHuntSelected");
        this.addChild(this.letterHuntButton);

        // Create acrofony button
        this.acrofonyButton = new Button("AcrofonyButton", "Acrofonia");
        this.acrofonyButton.setFontSize(buttonFontSize);
        this.acrofonyButton.setSize(buttonSize.x - buttonMargin.x, buttonSize.y - buttonMargin.y);
        this.acrofonyButton.setPosition(buttonsCorner.x + buttonMargin.x / 2 + 2 * buttonSize.x, buttonsCorner.y + buttonMargin.y / 2);
        this.acrofonyButton.connect("mouseClicked", this, "_onAcrofonySelected");
        this.addChild(this.acrofonyButton);

        // Create valise 1 button
        this.valise1Button = new Button("Valise1Button", "Palavra valise 1");
        this.valise1Button.setFontSize(buttonFontSize);
        this.valise1Button.setSize(buttonSize.x - buttonMargin.x, buttonSize.y - buttonMargin.y);
        this.valise1Button.setPosition(buttonsCorner.x + buttonMargin.x / 2, buttonsCorner.y + buttonMargin.y / 2 + buttonSize.y);
        this.valise1Button.connect("mouseClicked", this, "_onValise1Selected");
        this.addChild(this.valise1Button);

        // Create valise 2 button
        this.valise2Button = new Button("Valise2Button", "Palavra valise 2");
        this.valise2Button.setFontSize(buttonFontSize);
        this.valise2Button.setSize(buttonSize.x - buttonMargin.x, buttonSize.y - buttonMargin.y);
        this.valise2Button.setPosition(buttonsCorner.x + buttonMargin.x / 2 + buttonSize.x, buttonsCorner.y + buttonMargin.y / 2 + buttonSize.y);
        this.valise2Button.connect("mouseClicked", this, "_onValise2Selected");
        this.addChild(this.valise2Button);

        // Create valise 3 button
        this.valise3Button = new Button("Valise3Button", "Palavra valise 3");
        this.valise3Button.setFontSize(buttonFontSize);
        this.valise3Button.setSize(buttonSize.x - buttonMargin.x, buttonSize.y - buttonMargin.y);
        this.valise3Button.setPosition(buttonsCorner.x + buttonMargin.x / 2 + 2 * buttonSize.x, buttonsCorner.y + buttonMargin.y / 2 + buttonSize.y);
        this.valise3Button.connect("mouseClicked", this, "_onValise3Selected");
        this.addChild(this.valise3Button);

        // Create rébus button
        this.rebusButton = new Button("RebusButton", "Rébus");
        this.rebusButton.setFontSize(buttonFontSize);
        this.rebusButton.setSize(buttonSize.x - buttonMargin.x, buttonSize.y - buttonMargin.y);
        this.rebusButton.setPosition(buttonsCorner.x + buttonMargin.x / 2 + buttonSize.x / 2, buttonsCorner.y + buttonMargin.y / 2 + 2 * buttonSize.y);
        this.rebusButton.connect("mouseClicked", this, "_onRebusSelected");
        this.addChild(this.rebusButton);

        // Create guess button
        this.guessButton = new Button("GuessButton", "Advinha");
        this.guessButton.setFontSize(buttonFontSize);
        this.guessButton.setSize(buttonSize.x - buttonMargin.x, buttonSize.y - buttonMargin.y);
        this.guessButton.setPosition(buttonsCorner.x + buttonMargin.x / 2 + 3 * buttonSize.x / 2, buttonsCorner.y + buttonMargin.y / 2 + 2 * buttonSize.y);
        this.guessButton.connect("mouseClicked", this, "_onGuessSelected");
        this.addChild(this.guessButton);
    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        background(52);

        db.textAlign(CENTER, CENTER);
        db.fill(255);
        db.textSize(100);
        db.text("TERRA", 1920 / 2, 125);
        db.textSize(40);
        db.text("Escolha o mini-jogo", 1920 / 2, 200);
    }

    _onBackClicked()
    {
        var es = new EelementSelector("ElementSelector");
        GameHandler.addRootObject(es);
        this.queueFree();
    }

    _onFoodHuntSelected()
    {
        var fh = new FoodHuntGame("FoodHuntGame");
        GameHandler.addRootObject(fh);
        this.queueFree();
    }

    _onLetterHuntSelected()
    {
        var lh = new LetterHuntGame("LetterHunt");
        GameHandler.addRootObject(lh);
        this.queueFree();
    }

    _onAcrofonySelected()
    {
        var alm = new AcrofonyLevelManager("AcrofonyLevelManager");
        GameHandler.addRootObject(alm);
        this.queueFree();
    }

    _onValise1Selected()
    {
        var vls = new Valise1LevelSelector("Valise1LevelSelector");
        GameHandler.addRootObject(vls);
        this.queueFree();
    }

    _onValise2Selected()
    {
        var vls = new Valise2LevelSelector("Valise2LevelSelector");
        GameHandler.addRootObject(vls);
        this.queueFree();
    }

    _onValise3Selected()
    {
        var vls = new Valise3LevelSelector("Valise3LevelSelector");
        GameHandler.addRootObject(vls);
        this.queueFree();
    }

    _onRebusSelected()
    {
        var rls = new RebusLevelSelector("RebusLevelSelector");
        GameHandler.addRootObject(rls);
        this.queueFree();
    }

    _onGuessSelected()
    {
        console.log("Guess has been selected");
    }
}