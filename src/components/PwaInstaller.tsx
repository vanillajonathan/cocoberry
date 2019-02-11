import * as React from "react";

interface IState {
    showInstallPrompt: boolean;
};

export class PwaInstaller extends React.Component<{}, IState> {
    private deferredPrompt: any;

    constructor(props: {}) {
        super(props);
        this.state = {
            showInstallPrompt: false,
        };

        this.handleInstall = this.handleInstall.bind(this);
        this.beforeInstallPrompt = this.beforeInstallPrompt.bind(this);
    }

    private handleInstall(): void {
        this.setState({ showInstallPrompt: false });
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult: any) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the A2HS prompt");
            } else {
                console.log("User dismissed the A2HS prompt");
            }
            this.deferredPrompt = null;
        });
    }

    private beforeInstallPrompt(event: Event): void {
        this.deferredPrompt = event;
        this.setState({ showInstallPrompt: true });
    }

    componentDidMount() {
        window.addEventListener("beforeinstallprompt", this.beforeInstallPrompt);
    }

    componentWillUnmount() {
        window.removeEventListener("beforeinstallprompt", this.beforeInstallPrompt);
    }

    render() {
        return (this.state.showInstallPrompt &&
            <div className="card fixed-bottom">
                <div className="card-body">
                    <p>Install web application?</p>
                    <button className="btn btn-primary" onClick={this.handleInstall}>Install</button>
                </div>
            </div>
        );
    }
}