import * as React from "react";
export const BottomSheet = (props) => {
    let className = "fixed-bottom fade";
    let backdropClassName = "fade";
    if (props.show) {
        className += " d-block show";
        backdropClassName += " modal-backdrop show";
    }
    if (props.show) {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: className, tabIndex: -1, role: "dialog", style: { zIndex: 2000 } }, props.children),
            React.createElement("div", { className: backdropClassName, onClick: props.onClose })));
    }
    return null;
};
export const OptionsSheet = (props) => {
    return (React.createElement(BottomSheet, { show: props.show, onClose: props.onClose },
        React.createElement("div", { className: "list-group" },
            React.createElement("a", { className: "list-group-item", onClick: () => props.onDone(props.id) }, "Mark as done"),
            React.createElement("a", { className: "list-group-item", onClick: () => props.onEdit(props.id) }, "Edit"),
            React.createElement("a", { className: "list-group-item", onClick: () => props.onDelete(props.id) }, "Delete"))));
};
//# sourceMappingURL=OptionsSheet.js.map