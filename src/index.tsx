import * as React from "react";
import * as ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { IStorage, INewExperience } from "./IStorage";
import { LocalStorage } from "./localStorage";
//import * as data from "./seed.json";

import seed from "./seed.json";

const experiences: INewExperience[] = [
    { name: "Eat apple 🍏", last: new Date(2018, 4, 3).getTime(), tag: "fruit" },
    { name: "Eat avocado 🥑", last: new Date(2016, 4, 3).getTime(), tag: "fruit" },
    { name: "Eat banana 🍌", last: new Date(2017, 4, 3).getTime(), tag: "fruit" },
    { name: "Eat broccoli 🥦", tag: "vegetable" },
    { name: "Eat carrot 🥕", tag: "vegetable" },
    { name: "Eat cherries 🍒", last: new Date(2017, 5, 3).getTime(), tag: "fruit" },
    { name: "Eat chili 🌶️", tag: "fruit" },
    { name: "Eat cucumber 🥒", last: new Date(2017, 6, 3).getTime(), tag: "vegetable" },
    { name: "Eat corn 🌽", last: new Date(2017, 6, 3).getTime(), tag: "vegetable" },
    { name: "Eat coconut 🥥", last: new Date(2017, 7, 3).getTime(), tag: "fruit" },
    { name: "Eat eggplant 🍆", last: new Date(2017, 8, 3).getTime(), tag: "vegetable" },
    { name: "Eat garlic", last: new Date(2017, 8, 3).getTime(), tag: "vegetable" },
    { name: "Eat grapes 🍇", last: new Date(2017, 9, 3).getTime(), tag: "fruit" },
    { name: "Eat leafy green 🥬", tag: "fruit" },
    { name: "Eat lemon 🍋", tag: "fruit" },
    { name: "Eat kiwi 🥝", last: new Date(2017, 10, 3).getTime(), tag: "fruit" },
    { name: "Eat mango 🥭", last: new Date(2017, 11, 3).getTime(), tag: "fruit" },
    { name: "Eat melon 🍈", last: new Date(2017, 4, 3).getTime(), tag: "fruit" },
    { name: "Eat mushroom 🍄", last: new Date(2017, 4, 3).getTime() },
    { name: "Eat onion", last: new Date(2017, 8, 3).getTime(), tag: "vegetable" },
    { name: "Eat orange 🍊", last: new Date(2017, 4, 3).getTime(), tag: "fruit" },
    { name: "Eat peach 🍑", last: new Date(2018, 10, 1).getTime(), tag: "fruit" },
    { name: "Eat peanuts 🥜", tag: "fruit" },
    { name: "Eat pear 🍐", last: new Date(2018, 10, 1).getTime(), tag: "fruit" },
    { name: "Eat pineapple 🍍", last: new Date(2018, 10, 1).getTime(), tag: "fruit" },
    { name: "Eat potato 🥔", last: new Date(2018, 10, 1).getTime(), tag: "vegetable" },
    { name: "Eat tomato 🍅", last: new Date(2018, 10, 1).getTime(), tag: "vegetable" },
    { name: "Eat strawberry 🍓", last: new Date(2018, 10, 1).getTime(), tag: "fruit" },
    { name: "Eat watermelon 🍉", last: new Date(2017, 4, 3).getTime(), tag: "fruit" },
    { name: "Get a massage 💆‍♂️💆‍♀️", tag: "activity" },
    { name: "Bake a applepie 🥧🍪", last: new Date(2018, 7, 13).getTime() },
    { name: "Basketball 🏀", tag: "activity" },
    { name: "Bike 🚴", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { name: "Bowling 🎳", last: null, tag: "activity" },
    { name: "Box 🥊", last: null, tag: "activity" },
    { name: "Climb 🧗", last: null, tag: "activity" },
    { name: "Cold shower 🥶🚿", tag: "activity" },
    { name: "Dance 💃🕺", last: new Date(2019, 0, 13).getTime(), tag: "activity" },
    { name: "Fasting 🍽" },
    { name: "Football ⚽", tag: "activity" },
    { name: "Guitar 🎸", last: null, tag: "activity" },
    { name: "Ice bath 🥶🛀", last: new Date(2019, 0, 13).getTime(), tag: "activity" },
    { name: "Ice skate ⛸️", last: new Date(2019, 0, 13).getTime(), tag: "activity" },
    { name: "Meditate 🧘‍", last: new Date(2019, 0, 13).getTime(), tag: "activity" },
    { name: "Read 📖", last: new Date(2019, 0, 13).getTime(), tag: "activity" },
    { name: "Run 🏃", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { name: "Paint 🎨", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { name: "Play chess ♟️", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { name: "Play pool 🎱", last: null, tag: "activity" },
    { name: "Sauna 🧖‍♂️🧖‍♀️", tag: "activity" },
    { name: "Ski 🎿", tag: "activity" },
    { name: "Swim 🏊", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { name: "Theatre 🎭", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { name: "Yoga 🧘", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { name: "Watch a movie 🎬", last: null, tag: "activity" },
    { name: "Wrestle 🤼", last: null, tag: "activity" },
    { name: "Cook pasta 🍝", last: null },
    { name: "Beach 🏖", last: null, tag: "places" },
    { name: "Botanical garden 🌿", last: null, tag: "places" },
    { name: "Cemetery ⚱️", last: null, tag: "places" },
    { name: "Museum 🖼", last: null, tag: "places" },
    { name: "Park 🏞", last: null, tag: "places" },
];

const storage: IStorage = new LocalStorage();
const tags: string[] = ["Activity", "Fruit", "Places", "Vegetable"];

ReactDOM.render(<App seed={experiences} storage={storage} tags={tags} />, document.getElementById("root"));

serviceWorker.register();
