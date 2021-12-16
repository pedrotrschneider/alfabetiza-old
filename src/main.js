/************************************************************************
 * main.js
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

GameHandler._preload = function()
{
    // AssetHandler.loadFont("Lato", "../assets/fonts/Lato-Regular.ttf");
}

GameHandler._setup = function()
{
    GameHandler.drawDebugFPS(true);
    GameHandler.drawDebugBufferBounds(true);
    textFont("Lato");

    // var vg = new Valise2LevelSelector("Valise2Game");
    // GameHandler.addRootObject(vg);

    var menu = new EelementSelector("ElementSelector");
    GameHandler.addRootObject(menu);
}