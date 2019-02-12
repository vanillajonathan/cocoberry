import * as React from "react";
import { IExperience } from "../IExperience";

interface IProps {
    export: IExperience[];
    onImport(experience: IExperience[]): void;
    onNavigation(component: string): void;
    onPreferenceChanged(preferences: IPreferences): void;
    preferences: IPreferences;
}

export interface IPreferences {
    showNeverCard: boolean;
}

export class Preferences extends React.Component<IProps> {
    private readonly fileInput: any;

    constructor(props: IProps) {
        super(props);

        this.handleExport = this.handleExport.bind(this);
        this.handlePreferenceChanged = this.handlePreferenceChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.fileInput = React.createRef();
    }

    private handleExport(): void {
        const json = JSON.stringify(this.props.export);
        const file = new File([json], "cocoberry.json", { type: "octet/stream" });
        const url = window.URL.createObjectURL(file);
        window.location.assign(url);
    }

    private handlePreferenceChanged(event: React.ChangeEvent<HTMLInputElement>): void {
        const preferences: IPreferences = {
            showNeverCard: event.currentTarget.checked
        };
        this.props.onPreferenceChanged(preferences);
    }

    private handleSubmit(event: React.FormEvent): void {
        event.preventDefault();
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                try {
                    const experiences = JSON.parse(reader.result) as IExperience[];
                    this.props.onImport(experiences);
                } catch (e) {
                    alert(e);
                }
            }
        };
        const file: File = this.fileInput.current.files[0];
        reader.readAsText(file);
    }

    render() {
        return (
            <React.Fragment>
                <header className="fixed-top shadow-sm">
                    <nav className="navbar navbar-expand-lg navbar-light bg-white">
                        <button className="btn btn-outline-success" accessKey="b" onClick={() => this.props.onNavigation("")}>Back</button>
                    </nav>
                </header>
                <main className="App container">
                    <div className="card">
                        <div className="card-body">
                            <div className="custom-control custom-switch">
                                <input
                                    className="custom-control-input"
                                    id="showNeverCard"
                                    type="checkbox"
                                    checked={this.props.preferences.showNeverCard}
                                    onChange={this.handlePreferenceChanged}
                                />
                                <label className="custom-control-label" htmlFor="showNeverCard">Show the you-have-never card</label>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <p>Export and import configuration.</p>
                        <div className="form-group">
                            <label htmlFor="file">File</label>
                            <input className="form-control-file" id="file" type="file" accept="application/json" ref={this.fileInput} required />
                        </div>
                        <input className="btn btn-secondary mr-1" type="submit" value="Import from file" />
                        <button className="btn btn-secondary" type="button" accessKey="e" onClick={this.handleExport}>Export to file</button>
                    </form>
                </main>
                <footer className="container mt-3">
                    <p>Built with ❤ by Jonathan</p>
                </footer>
            </React.Fragment>
        );
    }
}
