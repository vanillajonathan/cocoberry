import * as React from "react";
export const TagList = (props) => {
    function handleClick(event) {
        let activeTag = event.currentTarget.innerText.toLowerCase();
        if (activeTag === props.activeTag) {
            activeTag = "";
        }
        props.onClick(activeTag);
    }
    return (React.createElement("ul", { className: "list-inline" }, props.tags.map(tag => {
        let className = "badge ";
        className += (tag.toLowerCase() === props.activeTag ? "badge-primary" : "badge-light");
        return React.createElement("li", { className: "list-inline-item", key: tag },
            React.createElement("span", { className: className, onClick: handleClick }, tag));
    })));
};
//# sourceMappingURL=TagList.js.map