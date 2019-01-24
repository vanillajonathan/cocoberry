import * as React from 'react';
export class TagList extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        let activeTag = event.currentTarget.innerText.toLowerCase();
        if (activeTag === this.props.activeTag) {
            activeTag = "";
        }
        this.props.onClick(activeTag);
    }
    render() {
        return (React.createElement("ul", { className: "list-inline" }, this.props.tags.map(tag => {
            let className = "badge ";
            className += (tag.toLowerCase() === this.props.activeTag ? "badge-primary" : "badge-light");
            return React.createElement("li", { className: "list-inline-item", key: tag },
                React.createElement("span", { className: className, onClick: this.handleClick }, tag));
        })));
    }
}
//# sourceMappingURL=TagList.js.map