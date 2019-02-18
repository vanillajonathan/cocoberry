import * as React from "react";
export const Preferences = (props) => {
    const fileInput = React.createRef();
    function handleExport() {
        const json = JSON.stringify(props.export);
        const file = new File([json], "cocoberry.json", { type: "octet/stream" });
        const url = window.URL.createObjectURL(file);
        window.location.assign(url);
    }
    function handleBrowse() {
        const elem = document.getElementById("file");
        const input = elem;
        input.click();
    }
    function handleImport() {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                try {
                    const experiences = JSON.parse(reader.result);
                    props.onImport(experiences);
                }
                catch (e) {
                    alert(e);
                }
            }
        };
        const file = fileInput.current.files[0];
        reader.readAsText(file);
    }
    function handlePreferenceChanged(event) {
        const preferences = {
            showMaybeAgainCard: event.currentTarget.checked,
            showNeverCard: event.currentTarget.checked
        };
        props.onChange(preferences);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("header", { className: "fixed-top shadow-sm" },
            React.createElement("nav", { className: "navbar navbar-expand-lg navbar-light bg-white" },
                React.createElement("button", { className: "btn btn-outline-success", accessKey: "b", onClick: () => props.onNavigation("") }, "Back"))),
        React.createElement("main", { className: "App container" },
            React.createElement("div", { className: "list-group mb-3" },
                React.createElement("div", { className: "list-group-item" },
                    React.createElement("div", { className: "custom-control custom-switch" },
                        React.createElement("input", { className: "custom-control-input", id: "showMaybeAgainCard", type: "checkbox", checked: props.preferences.showMaybeAgainCard, onChange: handlePreferenceChanged }),
                        React.createElement("label", { className: "custom-control-label", htmlFor: "showMaybeAgainCard" }, "Show the maybe-again card"))),
                React.createElement("div", { className: "list-group-item" },
                    React.createElement("div", { className: "custom-control custom-switch" },
                        React.createElement("input", { className: "custom-control-input", id: "showNeverCard", type: "checkbox", checked: props.preferences.showNeverCard, onChange: handlePreferenceChanged }),
                        React.createElement("label", { className: "custom-control-label", htmlFor: "showNeverCard" }, "Show the you-have-never card")))),
            React.createElement("div", { className: "card" },
                React.createElement("div", { className: "card-body" },
                    React.createElement("h5", { className: "card-title" }, "Export and import experiences"),
                    React.createElement("p", { className: "card-text" }, "Your experiences can be imported and exported. They are stored in the JSON format."),
                    React.createElement("input", { className: "form-control-file", id: "file", type: "file", accept: "application/json", onChange: handleImport, ref: fileInput, hidden: true, required: true })),
                React.createElement("div", { className: "list-group list-group-flush" },
                    React.createElement("button", { className: "list-group-item list-group-item-action", type: "button", accessKey: "e", onClick: handleBrowse }, "Import from file"),
                    React.createElement("button", { className: "list-group-item list-group-item-action", type: "button", accessKey: "e", onClick: handleExport }, "Export to file")))),
        React.createElement("footer", { className: "container mt-3" },
            React.createElement("p", null,
                React.createElement("a", { href: "https://github.com/vanillajonathan/cocoberry", rel: "noopener", target: "_blank" }, "Cocoberry on GitHub")),
            React.createElement("p", null, "Built with \u2764 by Jonathan"))));
};
//# sourceMappingURL=Preferences.js.map