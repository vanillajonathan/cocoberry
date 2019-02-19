import * as React from "react";
import { useState } from "react";
import uuid from "uuid/v4";
import { IStorage, INewExperience } from "./IStorage";
import { IExperience } from "./IExperience";
import { Home } from "./components/Home";
import { Preferences, IPreferences } from "./components/Preferences";
import { PwaInstaller } from "./components/PwaInstaller";
import { Toast } from "./components/Toast";

interface IProps {
    seed: INewExperience[];
    storage: IStorage;
    tags: string[];
}

const App: React.FunctionComponent<IProps> = (props: IProps) => {
    const storedExperiences = props.storage.get();
    if (storedExperiences.length === 0) {
        props.storage.add_many(props.seed);
    }

    const [experiences, setExperiences] = useState(props.storage.get());
    const [nav, setNav] = useState("");
    const [preferences, setPreferences] = useState({ showMaybeAgainCard: false, showNeverCard: true });
    const [showToast, setShowToast] = useState(false);

    let timerId: number = 0;

    function handleAddExperience(name: string, tag: string): void {
        const experience: IExperience = {
            id: uuid(),
            name,
            tag,
        };
        setExperiences((prevState: IExperience[]) => [...prevState, experience ]);
    }

    function handleClick(key: string): void {
        setExperiences((prevState: IExperience[]) => prevState.map(i => i.id === key ? { ...i, last: new Date().getTime() } : i));
        setShowToast(true);
        window.clearTimeout(timerId);
        timerId = window.setTimeout(() => {
            setShowToast(false);
        }, 1500);
    }

    function handleImport(experiences: IExperience[]): void {
        setExperiences(experiences);
    }

    function handleNavigation(component: string): void {
        setNav(component);
    }

    function handlePreferenceChange(preferences: IPreferences): void {
        setPreferences(preferences);
    }

    if (nav === "Preferences") {
        return (
            <Preferences
                export={experiences}
                onImport={handleImport}
                onNavigation={handleNavigation}
                onChange={handlePreferenceChange}
                preferences={preferences}
            />
        );
    }

    return (
        <React.Fragment>
            <Home
                experiences={experiences}
                onAddExperience={handleAddExperience}
                onClick={handleClick}
                onNavigation={handleNavigation}
                showMaybeAgainCard={preferences.showMaybeAgainCard}
                showNeverCard={preferences.showNeverCard}
                tags={props.tags}
            />
            {/*<PwaInstaller />*/}
            <Toast show={showToast} />
        </React.Fragment>
    );
};

App.defaultProps = {
    seed: [],
    tags: [],
};

export default App;
