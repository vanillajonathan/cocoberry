import * as React from "react";
import { useState } from "react";
import { Home } from "./views/Home";
import { Preferences } from "./views/Preferences";
const App = (props) => {
    const experiences = props.storage.get();
    if (experiences.length === 0) {
        props.storage.add_many(props.seed);
    }
    const [nav, setNav] = useState("");
    function handleNavigation(component) {
        setNav(component);
    }
    if (nav === "Preferences") {
        return (React.createElement(Preferences, { storage: props.storage, onNavigation: handleNavigation }));
    }
    return (React.createElement(Home, { experiences: props.storage.get(), onNavigation: handleNavigation, tags: props.tags }));
};
App.defaultProps = {
    seed: [],
    tags: [],
};
export default App;
//# sourceMappingURL=App.js.map