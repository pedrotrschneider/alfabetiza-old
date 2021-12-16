/************************************************************************
 * RebusLevelButton.js
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

class RebusLevelButton extends Button
{
    constructor(name)
    {
        super(name);

        /** @type {Object} */
        this.levelData = null;
    }

    _initSignals()
    {
        this.addSignal("levelSelected");
    }

    _onMouseClicked()
    {
        this.emitSignal("levelSelected", this.levelData);
    }
}