import * as React from "react";
import { useState } from "react";
import { IExperience } from "../IExperience";
import { IStorage } from "../IStorage";

interface IProps {
    storage: IStorage;
    onNavigation(component: string): void;
}

interface IPreferences {
    showMaybeAgainCard: boolean;
    showNeverCard: boolean;
}

export const Preferences: React.FunctionComponent<IProps> = (props: IProps) => {
    const fileInput: any = React.createRef();

    const prefShowMaybeAgainCard = localStorage.getItem("showMaybeAgainCard") || "false";
    const prefShowNeverCard = localStorage.getItem("showNeverCard") || "true";

    const [preferences, setPreferences] = useState<IPreferences>({
        showMaybeAgainCard: prefShowMaybeAgainCard === "true",
        showNeverCard: prefShowNeverCard === "true",
    });

    function handleExport(): void {
        const json = JSON.stringify(props.storage.get());
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
                    //props.onImport(experiences);
                    props.storage.add_many(experiences);
                } catch (e) {
                    alert(e);
                }
            }
        };
        const file: File = fileInput.current.files[0];
        reader.readAsText(file);
    }

    function handlePreferenceChanged(event: React.ChangeEvent<HTMLInputElement>): void {
        const currentTarget = event.currentTarget;
        setPreferences((prevState: IPreferences) => {
            const preferences: any = { ...prevState };
            preferences[currentTarget.id] = currentTarget.checked;
            return preferences;
        });
        localStorage.setItem(currentTarget.id, currentTarget.checked.toString());
    }

    return (
        <React.Fragment>
            <header className="fixed-top shadow-sm bg-body-tertiary">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <button className="btn btn-outline-success" accessKey="b" onClick={() => props.onNavigation("")}>Back</button>
                    </div>
                </nav>
            </header>
            <main className="App container">

                <div className="list-group mb-3">
                    <div className="list-group-item form-switch">
                        <label className="form-check-label" htmlFor="showMaybeAgainCard">Show the maybe-again card</label>
                        <input
                            className="form-check-input float-end"
                            id="showMaybeAgainCard"
                            type="checkbox"
                            role="switch"
                            checked={preferences.showMaybeAgainCard}
                            onChange={handlePreferenceChanged}
                        />
                    </div>
                    <div className="list-group-item form-switch">
                        <label className="form-check-label" htmlFor="showNeverCard">Show the you-have-never card</label>
                        <input
                            className="form-check-input float-end"
                            id="showNeverCard"
                            type="checkbox"
                            role="switch"
                            checked={preferences.showNeverCard}
                            onChange={handlePreferenceChanged}
                        />
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Export and import experiences</h5>
                        <p className="card-text">Your experiences can be imported and exported. They are stored in the JSON format.</p>
                        <input id="file" type="file" accept="application/json" onChange={handleImport} ref={fileInput} hidden required />
                    </div>
                    <div className="list-group list-group-flush">
                        <button className="list-group-item list-group-item-action" type="button" accessKey="i" onClick={handleBrowse}>Import from file</button>
                        <button className="list-group-item list-group-item-action" type="button" accessKey="e" onClick={handleExport}>Export to file</button>
                    </div>
                </div>

            </main>

            <footer className="container mt-3">
                <p><a href="https://github.com/vanillajonathan/cocoberry" rel="noopener noreferrer" target="_blank">Cocoberry on GitHub</a></p>
                <p>Built with ❤ by Jonathan</p>
            </footer>

        </React.Fragment>
    );
};
