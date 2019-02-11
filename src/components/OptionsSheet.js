import * as React from "react";
;
class BottomSheet extends React.Component {
    render() {
        let className = "fixed-bottom fade";
        let backdropClassName = "fade";
        if (this.props.show) {
            className += " d-block show";
            backdropClassName += " modal-backdrop show";
        }
        return (this.props.show &&
            React.createElement(React.Fragment, null,
                React.createElement("div", { className: className, tabIndex: -1, role: "dialog", style: { zIndex: 2000 } }, this.props.children),
                React.createElement("div", { className: backdropClassName, onClick: this.props.onClose })));
    }
}
;
export class OptionsSheet extends React.Component {
    render() {
        return (React.createElement(BottomSheet, { show: this.props.show, onClose: this.props.onClose },
            React.createElement("div", { className: "list-group" },
                React.createElement("a", { className: "list-group-item", onClick: () => this.props.onDone(this.props.id) }, "Mark as done"),
                React.createElement("a", { className: "list-group-item", onClick: () => this.props.onEdit(this.props.id) }, "Edit"),
                React.createElement("a", { className: "list-group-item", onClick: () => this.props.onDelete(this.props.id) }, "Delete"))));
    }
}
//# sourceMappingURL=OptionsSheet.js.map