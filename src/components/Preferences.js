import * as React from "react";
export class Preferences extends React.Component {
    constructor(props) {
        super(props);
        this.handleExport = this.handleExport.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }
    handleExport() {
        const json = JSON.stringify(this.props.export);
        const file = new File([json], "cocoberry.json", { type: "octet/stream" });
        const url = window.URL.createObjectURL(file);
        window.location.assign(url);
    }
    handleSubmit(event) {
        event.preventDefault();
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                try {
                    const experiences = JSON.parse(reader.result);
                    this.props.onImport(experiences);
                }
                catch (e) {
                    alert(e);
                }
            }
        };
        const file = this.fileInput.current.files[0];
        reader.readAsText(file);
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("header", { className: "fixed-top shadow-sm" },
                React.createElement("nav", { className: "navbar navbar-expand-lg navbar-light bg-white" },
                    React.createElement("button", { className: "btn btn-outline-success", accessKey: "b", onClick: () => this.props.onNavigation("") }, "Back"))),
            React.createElement("main", { className: "App container" },
                React.createElement("form", { onSubmit: this.handleSubmit },
                    React.createElement("p", null, "Export and import configuration."),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { htmlFor: "file" }, "File"),
                        React.createElement("input", { className: "form-control-file", id: "file", type: "file", accept: "application/json", ref: this.fileInput, required: true })),
                    React.createElement("input", { className: "btn btn-secondary mr-1", type: "submit", value: "Import from file" }),
                    React.createElement("button", { className: "btn btn-secondary", type: "button", accessKey: "e", onClick: this.handleExport }, "Export to file"))),
            React.createElement("footer", { className: "container mt-3" },
                React.createElement("p", null, "Built with \u2764 by Jonathan"))));
    }
}
//# sourceMappingURL=Preferences.js.map