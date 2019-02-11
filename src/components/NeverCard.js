import * as React from "react";
export const NeverCard = (props) => {
    return (React.createElement("div", { className: "card mb-3" },
        React.createElement("div", { className: "card-body" },
            React.createElement("small", { className: "text-muted text-uppercase" }, "You have never\u2026"),
            React.createElement("div", null, props.experience.name))));
};
//# sourceMappingURL=NeverCard.js.map