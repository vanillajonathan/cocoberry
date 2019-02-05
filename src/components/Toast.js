import * as React from 'react';
export const Toast = (props) => {
    let className = "toast fixed-bottom bg-dark text-white mx-auto mb-3 fade";
    if (props.show) {
        className += " show";
    }
    return (React.createElement("div", { className: className, role: "alert", "aria-live": "assertive", "aria-atomic": "true" },
        React.createElement("div", { className: "toast-body" }, "Marked as done")));
};
//# sourceMappingURL=Toast.js.map