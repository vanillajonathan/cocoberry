import * as React from 'react';
import { Home } from './components/Home';
import { Preferences } from "./components/Preferences";
import * as uuid from "uuid/v4";
class App extends React.Component {
    constructor(props) {
        super(props);
        const storedExperiences = localStorage.getItem('experiences');
        let experiences;
        if (storedExperiences == null) {
            experiences = seedExperiences;
        }
        else {
            experiences = JSON.parse(storedExperiences);
        }
        this.state = { experiences: experiences, nav: "" };
        this.handleAddExperience = this.handleAddExperience.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleImport = this.handleImport.bind(this);
        this.handleNavigation = this.handleNavigation.bind(this);
    }
    handleAddExperience(name) {
        const experience = {
            id: uuid(),
            name: name
        };
        this.setState(prevState => ({ experiences: [...prevState.experiences, experience], nav: "" }));
    }
    handleClick(key) {
        this.setState({
            experiences: this.state.experiences.map(i => i.id === key ? Object.assign({}, i, { last: new Date().getTime() }) : i)
        });
    }
    handleImport(experiences) {
        this.setState({ experiences: experiences });
    }
    handleNavigation(component) {
        this.setState({ nav: component });
    }
    render() {
        if (this.state.nav === "Preferences") {
            return (React.createElement(Preferences, { export: this.state.experiences, onImport: this.handleImport, onNavigation: this.handleNavigation }));
        }
        else {
            return (React.createElement(Home, { experiences: this.state.experiences, onAddExperience: this.handleAddExperience, onClick: this.handleClick, onNavigation: this.handleNavigation }));
        }
    }
}
const seedExperiences = [
    { id: uuid(), name: "Eat apple 🍏", last: new Date(2018, 4, 3).getTime(), tag: "fruit" },
    { id: uuid(), name: "Eat avocado 🥑", last: new Date(2016, 4, 3).getTime(), tag: "fruit" },
    { id: uuid(), name: "Eat banana 🍌", last: new Date(2017, 4, 3).getTime(), tag: "fruit" },
    { id: uuid(), name: "Eat broccoli 🥦", tag: "vegetable" },
    { id: uuid(), name: "Eat carrot 🥕", tag: "vegetable" },
    { id: uuid(), name: "Eat cherry 🍒", last: new Date(2017, 5, 3).getTime(), tag: "fruit" },
    { id: uuid(), name: "Eat chili 🌶️", tag: "fruit" },
    { id: uuid(), name: "Eat cucumber 🥒", last: new Date(2017, 6, 3).getTime(), tag: "vegetable" },
    { id: uuid(), name: "Eat corn 🌽", last: new Date(2017, 6, 3).getTime(), tag: "vegetable" },
    { id: uuid(), name: "Eat coconut 🥥", last: new Date(2017, 7, 3).getTime(), tag: "fruit" },
    { id: uuid(), name: "Eat eggplant 🍆", last: new Date(2017, 8, 3).getTime(), tag: "vegetable" },
    { id: uuid(), name: "Eat grapes 🍇", last: new Date(2017, 9, 3).getTime(), tag: "fruit" },
    { id: uuid(), name: "Eat leafy green 🥬", tag: "fruit" },
    { id: uuid(), name: "Eat lemon 🍋", tag: "fruit" },
    { id: uuid(), name: "Eat kiwi 🥝", last: new Date(2017, 10, 3).getTime(), tag: "fruit" },
    { id: uuid(), name: "Eat mango 🥭", last: new Date(2017, 11, 3).getTime(), tag: "fruit" },
    { id: uuid(), name: "Eat melon 🍈", last: new Date(2017, 4, 3).getTime(), tag: "fruit" },
    { id: uuid(), name: "Eat mushroom 🍄", last: new Date(2017, 4, 3).getTime() },
    { id: uuid(), name: "Eat orange 🍊", last: new Date(2017, 4, 3).getTime(), tag: "fruit" },
    { id: uuid(), name: "Eat peach 🍑", last: new Date(2018, 10, 1).getTime(), tag: "fruit" },
    { id: uuid(), name: "Eat peanuts 🥜", tag: "fruit" },
    { id: uuid(), name: "Eat pear 🍐", last: new Date(2018, 10, 1).getTime(), tag: "fruit" },
    { id: uuid(), name: "Eat pineapple 🍍", last: new Date(2018, 10, 1).getTime(), tag: "fruit" },
    { id: uuid(), name: "Eat potato 🥔", last: new Date(2018, 10, 1).getTime(), tag: "vegetable" },
    { id: uuid(), name: "Eat tomato 🍅", last: new Date(2018, 10, 1).getTime(), tag: "vegetable" },
    { id: uuid(), name: "Eat strawberry 🍓", last: new Date(2018, 10, 1).getTime(), tag: "fruit" },
    { id: uuid(), name: "Eat watermelon 🍉", last: new Date(2017, 4, 3).getTime(), tag: "fruit" },
    { id: uuid(), name: "Bake a applepie 🥧🍪", last: new Date(2018, 7, 13).getTime() },
    { id: uuid(), name: "Bike 🚴", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { id: uuid(), name: "Climb 🧗", last: null, tag: "activity" },
    { id: uuid(), name: "Dance 💃🕺", last: new Date(2019, 0, 13).getTime(), tag: "activity" },
    { id: uuid(), name: "Guitar 🎸", last: null, tag: "activity" },
    { id: uuid(), name: "Ice Skate ⛸️", last: new Date(2019, 0, 13).getTime(), tag: "activity" },
    { id: uuid(), name: "Run 🏃", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { id: uuid(), name: "Paint 🎨", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { id: uuid(), name: "Play chess ♟️", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { id: uuid(), name: "Swim 🏊", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { id: uuid(), name: "Yoga 🧘", last: new Date(2019, 0, 11).getTime(), tag: "activity" },
    { id: uuid(), name: "Wrestle 🤼", last: null, tag: "activity" },
];
export default App;
//# sourceMappingURL=App.js.map