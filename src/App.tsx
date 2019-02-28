import * as React from "react";
import { useState } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import uuid from "uuid/v4";
import { IStorage, INewExperience } from "./IStorage";
import { IExperience } from "./IExperience";
import { Home } from "./components/Home";
import { Preferences, IPreferences } from "./components/Preferences";
//import { PwaInstaller } from "./components/PwaInstaller";

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

    const prefShowMaybeAgainCard = localStorage.getItem("showMaybeAgainCard") || "false";
    const prefShowNeverCard = localStorage.getItem("showNeverCard") || "true";

    const [experiences, setExperiences] = useState(props.storage.get());
    const [nav, setNav] = useState("");
    const [preferences, setPreferences] = useState({
        showMaybeAgainCard: prefShowMaybeAgainCard === "true",
        showNeverCard: prefShowNeverCard === "true",
    });
    const [showToast, setShowToast] = useState(false);

    let timerId: number = 0;

    function handleAddExperience(name: string, tag: string): void {
        const experience: IExperience = {
            id: uuid(),
            name,
            tag,
        };
        setExperiences((prevState: IExperience[]) => [...prevState, experience]);
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
        localStorage.setItem("showMaybeAgainCard", preferences.showMaybeAgainCard.toString());
        localStorage.setItem("showNeverCard", preferences.showNeverCard.toString());
    }

    if (nav === "Preferences") {
        return (
            <Preferences
                export={experiences}
                onChange={handlePreferenceChange}
                onImport={handleImport}
                onNavigation={handleNavigation}
                preferences={preferences}
            />
        );
    }

    const theme = createMuiTheme({
        typography: {
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                'Roboto',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
    });

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
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
            <Snackbar message="Marked as done" open={showToast} />
        </MuiThemeProvider>
    );
};

App.defaultProps = {
    seed: [],
    tags: [],
};

export default App;
