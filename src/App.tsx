﻿import * as React from "react";
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

interface IState {
    experiences: IExperience[];
    nav: string;
    preferences: IPreferences;
    showToast: boolean;
}

class App extends React.Component<IProps, IState> {
    static defaultProps = {
        seed: [],
        tags: [],
    };

    private timerId: number = 0;

    constructor(props: IProps) {
        super(props);

        let experiences = props.storage.get();

        if (experiences.length === 0) {
            this.props.storage.add_many(this.props.seed);
            experiences = props.storage.get();
        }

        this.state = {
            experiences, nav: "", preferences: { showNeverCard: true }, showToast: false
        };

        this.handleAddExperience = this.handleAddExperience.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleImport = this.handleImport.bind(this);
        this.handleNavigation = this.handleNavigation.bind(this);
        this.handlePreferenceChange = this.handlePreferenceChange.bind(this);
    }

    private handleAddExperience(name: string, tag: string): void {
        const experience: IExperience = {
            id: uuid(),
            name,
            tag,
        };
        this.setState(prevState => ({ experiences: [...prevState.experiences, experience] }));
    }

    private handleClick(key: string): void {
        this.setState({
            experiences: this.state.experiences.map(i => i.id === key ? { ...i, last: new Date().getTime() } : i),
            showToast: true,
        });
        window.clearTimeout(this.timerId);
        this.timerId = window.setTimeout(() => {
            this.setState({ showToast: false });
        }, 1500);
    }

    private handleImport(experiences: IExperience[]): void {
        this.setState({ experiences: experiences });
    }

    private handleNavigation(component: string): void {
        this.setState({ nav: component });
    }

    private handlePreferenceChange(preferences: IPreferences): void {
        this.setState({ preferences: preferences });
    }

    public render() {
        if (this.state.nav === "Preferences") {
            return (
                <Preferences
                    export={this.state.experiences}
                    onImport={this.handleImport}
                    onNavigation={this.handleNavigation}
                    onPreferenceChanged={this.handlePreferenceChange}
                    preferences={this.state.preferences}
                />
            );
        }

        return (
            <React.Fragment>
                <Home
                    experiences={this.state.experiences}
                    onAddExperience={this.handleAddExperience}
                    onClick={this.handleClick}
                    onNavigation={this.handleNavigation}
                    showNeverCard={this.state.preferences.showNeverCard}
                    tags={this.props.tags}
                />
                <PwaInstaller />
                <Toast show={this.state.showToast} />
            </React.Fragment>
        );
    }
}

export default App;
