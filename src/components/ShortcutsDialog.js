import * as React from "react";
export const ShortcutsDialog = (props) => {
    let className = "modal fade";
    let backdropClassName = "fade";
    if (props.isOpen) {
        className += " d-block show";
        backdropClassName += " modal-backdrop show";
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: className, tabIndex: -1, role: "dialog" },
            React.createElement("div", { className: "modal-dialog", role: "document" },
                React.createElement("div", { className: "modal-content" },
                    React.createElement("div", { className: "modal-header" },
                        React.createElement("h5", { className: "modal-title" }, "Keyboard Shortcuts"),
                        React.createElement("button", { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close", onClick: props.onClose },
                            React.createElement("span", { "aria-hidden": "true" }, "\u00D7"))),
                    React.createElement("div", { className: "modal-body" },
                        React.createElement("div", { className: "container-fluid" },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-6" },
                                    React.createElement("kbd", null,
                                        React.createElement("kbd", null, "Shift"),
                                        " + ",
                                        React.createElement("kbd", null, "Alt"),
                                        " + ",
                                        React.createElement("kbd", null, "N"))),
                                React.createElement("div", { className: "col-6" }, "Add new experience"),
                                React.createElement("div", { className: "col-6" },
                                    React.createElement("kbd", null,
                                        React.createElement("kbd", null, "Shift"),
                                        " + ",
                                        React.createElement("kbd", null, "Alt"),
                                        " + ",
                                        React.createElement("kbd", null, "S"))),
                                React.createElement("div", { className: "col-6" }, "Search"),
                                React.createElement("div", { className: "col-6" },
                                    React.createElement("kbd", null,
                                        React.createElement("kbd", null, "Shift"),
                                        " + ",
                                        React.createElement("kbd", null, "Alt"),
                                        " + ",
                                        React.createElement("kbd", null, "P"))),
                                React.createElement("div", { className: "col-6" }, "Preferences"),
                                React.createElement("div", { className: "col-6" },
                                    React.createElement("kbd", null,
                                        React.createElement("kbd", null, "Shift"),
                                        " + ",
                                        React.createElement("kbd", null, "Alt"),
                                        " + ",
                                        React.createElement("kbd", null, "R"))),
                                React.createElement("div", { className: "col-6" }, "Reverse sort")))),
                    React.createElement("div", { className: "modal-footer" },
                        React.createElement("button", { type: "button", className: "btn btn-secondary", "data-dismiss": "modal", onClick: props.onClose }, "Close"))))),
        React.createElement("div", { className: backdropClassName })));
};
//# sourceMappingURL=ShortcutsDialog.js.map