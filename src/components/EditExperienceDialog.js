import * as React from "react";
import { useState, useEffect } from "react";
import { TagList } from "./TagList";
export const EditExperienceDialog = (props) => {
    const [name, setName] = useState(props.name);
    const [tag, setTag] = useState("");
    const [last, setLast] = useState(0);
    const nameInput = React.createRef();
    useEffect(() => {
        if (nameInput.current) {
            nameInput.current.focus();
        }
    });
    function handleChange(event) {
        setName(event.target.value);
    }
    function handleTimeChange(event) {
        setLast(parseInt(event.target.value, 10));
    }
    function handleClose() {
        props.onClose();
    }
    function handleSubmit(event) {
        event.preventDefault();
        const experience = { id: "", name: name, tag: tag, last: last };
        props.onSave(experience);
    }
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
                        React.createElement("h5", { className: "modal-title" }, "Edit experience"),
                        React.createElement("button", { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close", onClick: handleClose },
                            React.createElement("span", { "aria-hidden": "true" }, "\u00D7"))),
                    React.createElement("form", { onSubmit: handleSubmit },
                        React.createElement("div", { className: "modal-body" },
                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", { htmlFor: "name" }, "Title"),
                                React.createElement("input", { className: "form-control", id: "name", type: "text", value: name, onChange: handleChange, ref: nameInput, autoFocus: true, required: true })),
                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", null, "Tag"),
                                React.createElement(TagList, { activeTag: tag, tags: props.tags, onClick: tag => setTag(tag) })),
                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", { htmlFor: "time" }, "Last"),
                                React.createElement("input", { className: "form-control", id: "time", type: "datetime-local", onChange: handleTimeChange }))),
                        React.createElement("div", { className: "modal-footer" },
                            React.createElement("button", { type: "button", className: "btn btn-secondary", "data-dismiss": "modal", onClick: handleClose }, "Close"),
                            React.createElement("button", { type: "submit", className: "btn btn-primary" }, "Save")))))),
        React.createElement("div", { className: backdropClassName })));
};
EditExperienceDialog.defaultProps = {
    name: "",
};
//# sourceMappingURL=EditExperienceDialog.js.map