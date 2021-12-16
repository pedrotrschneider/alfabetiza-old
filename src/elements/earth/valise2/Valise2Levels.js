/************************************************************************
 * Valise2Levels.js
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

const VALISE2_LEVELS = {
    tutorial:
    {
        questionCard:
        {
            name: "Cana",
        },

        optionCards: [
        {
            name: "Ana",
            isAnswer: true,
        },
        {
            name: "Cama",
            isAnswer: false,
        },
        {
            name: "Pera",
            isAnswer: false,
        }, ],

        tip: "É o nome de uma pessoa que está escondido na palavra CANA."
    },

    level1:
    {
        questionCard:
        {
            name: "Irmão",
        },

        optionCards: [
        {
            name: "Mão",
            isAnswer: true,
        },
        {
            name: "Corrimão",
            isAnswer: false,
        },
        {
            name: "Cão",
            isAnswer: false,
        }, ],

        tip: "É o nome de uma parte do corpo que está escondido na palavra IRMÃO."
    },

    level2:
    {
        questionCard:
        {
            name: "Cebolinha",
        },

        optionCards: [
        {
            name: "Bolinha",
            isAnswer: true,
        },
        {
            name: "Linha",
            isAnswer: true,
        },
        {
            name: "Salsinha",
            isAnswer: false,
        },
        {
            name: "Comida",
            isAnswer: false,
        }, ],

        tip: "É o nome de um objeto usado para costurar que está escondido na palavra CEBOLINHA. Agora a outra dica: é redondo esse brinquedo escondido na palavra CEBOLINHA."
    },

    level3:
    {
        questionCard:
        {
            name: "Salsinha",
        },

        optionCards: [
        {
            name: "Sal",
            isAnswer: true,
        },
        {
            name: "Linha",
            isAnswer: false,
        },
        {
            name: "Unha",
            isAnswer: false,
        }, ],

        tip: "É o nome de um tempero que está escondido na palavra SALSINHA."
    },

    level4:
    {
        questionCard:
        {
            name: "Banana",
        },

        optionCards: [
        {
            name: "Ana",
            isAnswer: true,
        },
        {
            name: "Bala",
            isAnswer: false,
        },
        {
            name: "Maçã",
            isAnswer: false,
        }, ],

        tip: "É o nome de uma pessoa que está escondido na palavra BANANA."
    },

    level5:
    {
        questionCard:
        {
            name: "Alface",
        },

        optionCards: [
        {
            name: "Face",
            isAnswer: true,
        },
        {
            name: "Tomate",
            isAnswer: false,
        },
        {
            name: "Fada",
            isAnswer: false,
        }, ],

        tip: "É o nome de uma parte do corpo que está escondido na palavra ALFACE."
    },

    level6:
    {
        questionCard:
        {
            name: "Pimenta",
        },

        optionCards: [
        {
            name: "Menta",
            isAnswer: true,
        },
        {
            name: "Pepino",
            isAnswer: false,
        },
        {
            name: "Anta",
            isAnswer: false,
        }, ],

        tip: "É uma erva que está escondida na palavra PIMENTA."
    },
}