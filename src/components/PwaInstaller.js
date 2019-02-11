import * as React from "react";
export class PwaInstaller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showInstallPrompt: false,
        };
        this.handleInstall = this.handleInstall.bind(this);
        this.beforeInstallPrompt = this.beforeInstallPrompt.bind(this);
    }
    handleInstall() {
        this.setState({ showInstallPrompt: false });
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the A2HS prompt");
            }
            else {
                console.log("User dismissed the A2HS prompt");
            }
            this.deferredPrompt = null;
        });
    }
    beforeInstallPrompt(event) {
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
        return this.state.showInstallPrompt && (React.createElement("div", { className: "card fixed-bottom" },
            React.createElement("div", { className: "card-body" },
                React.createElement("p", null, "Install web application?"),
                React.createElement("button", { className: "btn btn-primary", onClick: this.handleInstall }, "Install"))));
    }
}
//# sourceMappingURL=PwaInstaller.js.map