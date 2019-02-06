import * as React from 'react';
import { Experience } from "../experience";

type PreferencesProps = {
    export: Experience[];
    onImport(experience: Experience[]): void;
    onNavigation(component: string): void;
}

type PreferencesState = {
    id: string,
    name: string,
    last?: number | null,
    tag?: string,
};

export class Preferences extends React.Component<PreferencesProps, PreferencesState> {
    private readonly fileInput: any;

    constructor(props: PreferencesProps) {
        super(props);

        this.handleExport = this.handleExport.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.fileInput = React.createRef();
    }

    private handleExport() {
        const json = JSON.stringify(this.props.export);
        const file = new File([json], "cocoberry.json", { type: "octet/stream" });
        const url = window.URL.createObjectURL(file);
        window.location.assign(url);
    }

    private handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                try {
                    const experiences = JSON.parse(reader.result) as Experience[];
                    this.props.onImport(experiences);
                } catch(e) {
                    alert(e);
                }
            }
        }
        reader.readAsText(this.fileInput.current.files[0]);
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