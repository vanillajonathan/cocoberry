import * as React from "react";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IExperience } from "../IExperience";

interface IProps {
    export: IExperience[];
    preferences: IPreferences;
    onChange(preferences: IPreferences): void;
    onImport(experience: IExperience[]): void;
    onNavigation(component: string): void;
}

export interface IPreferences {
    showMaybeAgainCard: boolean;
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
        const preferences: any = { ...props.preferences };
        preferences[event.currentTarget.id] = event.currentTarget.checked;
        props.onChange(preferences);
    }

    return (
        <React.Fragment>
            <AppBar color="default">
                <Toolbar>
                    <Button className="btn btn-outline-success" accessKey="b" onClick={() => props.onNavigation("")}>Back</Button>
                </Toolbar>
            </AppBar>
            <main className="App container">

                <FormControl>
                    <FormControlLabel
                        control={<Switch
                                     className="custom-control-input"
                                     id="showMaybeAgainCard"
                                     type="checkbox"
                                     checked={props.preferences.showMaybeAgainCard}
                                     onChange={handlePreferenceChanged}
                                 />}
                        label="Show the maybe-again card"
                    />
                    <FormControlLabel
                        control={<Switch
                                     className="custom-control-input"
                                     id="showNeverCard"
                                     type="checkbox"
                                     checked={props.preferences.showNeverCard}
                                     onChange={handlePreferenceChanged}
                        />}
                        label="Show the you-have-never card"
                    />
                </FormControl>

                <div className="card">
                    <div className="card-body">
                        <Typography variant="subtitle1">Export and import experiences</Typography>
                        <Typography>Your experiences can be imported and exported. They are stored in the JSON format.</Typography>
                        <input className="form-control-file" id="file" type="file" accept="application/json" onChange={handleImport} ref={fileInput} hidden required />
                    </div>
                    <div className="list-group list-group-flush">
                        <Button className="list-group-item list-group-item-action" type="button" accessKey="e" onClick={handleBrowse}>Import from file</Button>
                        <Button className="list-group-item list-group-item-action" type="button" accessKey="e" onClick={handleExport}>Export to file</Button>
                    </div>
                </div>

            </main>

            <footer className="container mt-3">
                <Typography><a href="https://github.com/vanillajonathan/cocoberry" rel="noopener" target="_blank">Cocoberry on GitHub</a></Typography>
                <Typography>Built with ❤ by Jonathan</Typography>
            </footer>

        </React.Fragment>
    );
};
