import * as React from "react";
import * as ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { IStorage as AppStorage, INewExperience as NewExperience } from "./IStorage";
import { LocalStorage } from "./localStorage";
//import * as data from "./seed.json";

import seed from "./seed.json";

const experiences: NewExperience[] = [
    { name: "Eat apple 🍏", last: new Date(2018, 4, 3).getTime(), tag: "fruit" },
    { name: "Eat avocado 🥑", last: new Date(2016, 4, 3).getTime(), tag: "fruit" },
    { name: "Eat banana 🍌", last: new Date(2017, 4, 3).getTime(), tag: "fruit" },
    { name: "Eat broccoli 🥦", tag: "vegetable" },
    { name: "Eat carrot 🥕", tag: "vegetable" },
    { name: "Eat cherry 🍒", last: new Date(2017, 5, 3).getTime(), tag: "fruit" },
    { name: "Eat chili 🌶️", tag: "fruit" },
    { name: "Eat cucumber 🥒", last: new Date(2017, 6, 3).getTime(), tag: "vegetable" },
    { name: "Eat corn 🌽", last: new Date(2017, 6, 3).getTime(), tag: "vegetable" },
    { name: "Eat coconut 🥥", last: new Date(2017, 7, 3).getTime(), tag: "fruit" },
    { name: "Eat eggplant 🍆", last: new Date(2017, 8, 3).getTime(), tag: "vegetable" },
    { name: "Eat grapes 🍇", last: new Date(2017, 9, 3).getTime(), tag: "fruit" },
    { name: "Eat leafy green 🥬", tag: "fruit" },
    { name: "Eat lemon 🍋", tag: "fruit" },
    { name: "Eat kiwi 🥝", last: new Date(2017, 10, 3).getTime(), tag: "fruit" },
    { name: "Eat mango 🥭", last: new Date(2017, 11, 3).getTime(), tag: "fruit" },
    { name: "Eat melon 🍈", last: new Date(2017, 4, 3).getTime(), tag: "fruit" },
    { name: "Eat mushroom 🍄", last: new Date(2017, 4, 3).getTime() },
    { name: "Eat orange 🍊", last: new Date(2017, 4, 3).getTime(), tag: "fruit" },
    { name: "Eat peach 🍑", last: new Date(2018, 10, 1).getTime(), tag: "fruit" },
    { name: "Eat peanuts 🥜", tag: "fruit" },
    { name: "Eat pear 🍐", last: new Date(2018, 10, 1).getTime(), tag: "fruit" },
    { name: "Eat pineapple 🍍", last: new Date(2018, 10, 1).getTime(), tag: "fruit" },
    { name: "Eat potato 🥔", last: new Date(2018, 10, 1).getTime(), tag: "vegetable" },
    { name: "Eat tomato 🍅", last: new Date(2018, 10, 1).getTime(), tag: "vegetable" },
    { name: "Eat strawberry 🍓", last: new Date(2018, 10, 1).getTime(), tag: "fruit" },
    { name: "Eat watermelon 🍉", last: new Date(2017, 4, 3).getTime(), tag: "fruit" },
    { name: "Bake a applepie 🥧🍪", last: new Date(2018, 7, 13).getTime() },
    { name: "Bike 🚴", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { name: "Climb 🧗", last: null, tag: "activity" },
    { name: "Dance 💃🕺", last: new Date(2019, 0, 13).getTime(), tag: "activity" },
    { name: "Guitar 🎸", last: null, tag: "activity" },
    { name: "Ice Skate ⛸️", last: new Date(2019, 0, 13).getTime(), tag: "activity" },
    { name: "Meditate 🧘‍", last: new Date(2019, 0, 13).getTime(), tag: "activity" },
    { name: "Read 📖", last: new Date(2019, 0, 13).getTime(), tag: "activity" },
    { name: "Run 🏃", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { name: "Paint 🎨", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { name: "Play chess ♟️", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { name: "Swim 🏊", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { name: "Theatre 🎭", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { name: "Yoga 🧘", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { name: "Wrestle 🤼", last: null, tag: "activity" },
];

const storage: AppStorage = new LocalStorage();
const tags: string[] = ["Activity", "Fruit", "Vegetable"];

ReactDOM.render(<App seed={experiences} storage={storage} tags={tags} />, document.getElementById("root"));

serviceWorker.register();