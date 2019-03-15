import * as React from "react";
import { useState } from "react";
import { IStorage, INewExperience } from "./IStorage";
import { Home } from "./views/Home";
import { Preferences } from "./views/Preferences";
//import { PwaInstaller } from "./components/PwaInstaller";

interface IProps {
    seed: INewExperience[];
    storage: IStorage;
    tags: string[];
}

const App: React.FunctionComponent<IProps> = (props: IProps) => {
    const experiences = props.storage.get();
    if (experiences.length === 0) {
        props.storage.add_many(props.seed);
    }
    const [nav, setNav] = useState("");

    function handleNavigation(component: string): void {
        setNav(component);
    }

    if (nav === "Preferences") {
        return (
            <Preferences
                storage={props.storage}
                onNavigation={handleNavigation}
            />
        );
    }

    return (
        <Home
            experiences={props.storage.get()}
            onNavigation={handleNavigation}
            tags={props.tags}
        />
    );
};

App.defaultProps = {
    seed: [],
    tags: [],
};

export default App;
