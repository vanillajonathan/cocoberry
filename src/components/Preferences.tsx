import * as React from "react";
import { IExperience } from "../IExperience";

interface IProps {
    export: IExperience[];
    preferences: IPreferences;
    onImport(experience: IExperience[]): void;
    onNavigation(component: string): void;
    onPreferenceChanged(preferences: IPreferences): void;
}

export interface IPreferences {
    showNeverCard: boolean;
}

export const Preferences: React.FunctionComponent<IProps> = (props: IProps) => {
    const fileInput: any = React.createRef();

    function handleExport(): void {
        const json = JSON.stringify(props.export);
        const file = new File([json], "cocoberry.json", { type: "octet/stream" });
        const url = window.URL.createObjectURL(file);
        window.location.assign(url);
    }

    function handleBrowse(): void {
        const elem = document.getElementById("file");
        const input = elem as HTMLInputElement;
        input.click();
    }

    function handleImport(): void {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                try {
                    const experiences = JSON.parse(reader.result) as IExperience[];
                    props.onImport(experiences);
                } catch (e) {
                    alert(e);
                }
            }
        };
        const file: File = fileInput.current.files[0];
        reader.readAsText(file);
    }

    function handlePreferenceChanged(event: React.ChangeEvent<HTMLInputElement>): void {
        const preferences: IPreferences = {
            showNeverCard: event.currentTarget.checked
        };
        props.onPreferenceChanged(preferences);
    }

    return (
        <React.Fragment>
            <header className="fixed-top shadow-sm">
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <button className="btn btn-outline-success" accessKey="b" onClick={() => props.onNavigation("")}>Back</button>
                </nav>
            </header>
            <main className="App container">

                <div className="list-group mb-3">
                    <div className="list-group-item">
                        <div className="custom-control custom-switch">
                            <input
                                className="custom-control-input"
                                id="showNeverCard"
                                type="checkbox"
                                checked={props.preferences.showNeverCard}
                                onChange={handlePreferenceChanged}
                            />
                            <label className="custom-control-label" htmlFor="showNeverCard">Show the you-have-never card</label>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Export and import experiences</h5>
                        <p className="card-text">Your experiences can be imported and exported. They are stored in the JSON format.</p>
                        <input className="form-control-file" id="file" type="file" accept="application/json" onChange={handleImport} ref={fileInput} hidden required />
                    </div>
                    <div className="list-group list-group-flush">
                        <button className="list-group-item list-group-item-action" type="button" accessKey="e" onClick={handleBrowse}>Import from file</button>
                        <button className="list-group-item list-group-item-action" type="button" accessKey="e" onClick={handleExport}>Export to file</button>
                    </div>
                </div>

            </main>

            <footer className="container mt-3">
                <p>Built with ❤ by Jonathan</p>
            </footer>

        </React.Fragment>
    );
};
