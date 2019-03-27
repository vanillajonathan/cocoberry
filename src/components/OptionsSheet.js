import * as React from "react";
export const BottomSheet = (props) => {
    let className = "fixed-bottom fade";
    let backdropClassName = "fade";
    if (props.open) {
        className += " d-block show";
        backdropClassName += " modal-backdrop show";
    }
    if (props.open) {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: className, tabIndex: -1, role: "dialog", style: { zIndex: 2000 } }, props.children),
            React.createElement("div", { className: backdropClassName, onClick: props.onClose })));
    }
    return null;
};
export const OptionsSheet = (props) => {
    return (React.createElement(BottomSheet, { open: props.open, onClose: props.onClose },
        React.createElement("div", { className: "list-group list-group-flush" },
            React.createElement("a", { className: "list-group-item list-group-item-action", onClick: () => props.onDone(props.id) }, "Mark as done"),
            React.createElement("a", { className: "list-group-item list-group-item-action", onClick: () => props.onEdit(props.id) }, "Edit"),
            React.createElement("a", { className: "list-group-item list-group-item-action", onClick: () => props.onDelete(props.id) }, "Delete"))));
};
//# sourceMappingURL=OptionsSheet.js.map