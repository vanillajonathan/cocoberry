import * as React from 'react';
import { TagList } from "./TagList";
export class AddExperienceDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name || "",
            tag: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ name: event.target.value });
    }
    handleClose() {
        this.props.onClose();
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.onAdd(this.state.name, this.state.tag);
    }
    render() {
        let className = "modal fade";
        let backdropClassName = "fade";
        if (this.props.isOpen) {
            className += " d-block show";
            backdropClassName += " modal-backdrop show";
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: className, tabIndex: -1, role: "dialog" },
                React.createElement("div", { className: "modal-dialog", role: "document" },
                    React.createElement("div", { className: "modal-content" },
                        React.createElement("div", { className: "modal-header" },
                            React.createElement("h5", { className: "modal-title" }, "Add experience"),
                            React.createElement("button", { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close", onClick: this.handleClose },
                                React.createElement("span", { "aria-hidden": "true" }, "\u00D7"))),
                        React.createElement("form", { onSubmit: this.handleSubmit },
                            React.createElement("div", { className: "modal-body" },
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", { htmlFor: "name" }, "Title"),
                                    React.createElement("input", { className: "form-control", id: "name", type: "text", value: this.state.name, onChange: this.handleChange, autoFocus: true, required: true })),
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", null, "Tag"),
                                    React.createElement(TagList, { activeTag: this.state.tag, tags: this.props.tags, onClick: tag => this.setState({ tag: tag }) }))),
                            React.createElement("div", { className: "modal-footer" },
                                React.createElement("button", { type: "button", className: "btn btn-secondary", "data-dismiss": "modal", onClick: this.handleClose }, "Close"),
                                React.createElement("button", { type: "submit", className: "btn btn-primary" }, "Add")))))),
            React.createElement("div", { className: backdropClassName })));
    }
}
//# sourceMappingURL=AddExperienceDialog.js.map