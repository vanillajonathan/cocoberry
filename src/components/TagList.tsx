import * as React from "react";

interface IProps {
    activeTag: string;
    onClick(tag: string): void;
    tags: string[];
}

export class TagList extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    private handleClick(event: React.MouseEvent<HTMLElement>): void {
        let activeTag = event.currentTarget.innerText.toLowerCase();
        if (activeTag === this.props.activeTag) {
            activeTag = "";
        }
        this.props.onClick(activeTag);
    }

    render() {
        return (
            <ul className="list-inline">
                {this.props.tags.map(tag => {
                    let className = "badge ";
                    className += (tag.toLowerCase() === this.props.activeTag ? "badge-primary" : "badge-light");
                    return <li className="list-inline-item" key={tag}><span className={className} onClick={this.handleClick}>{tag}</span></li>;
                })}
            </ul>
        );
    }
}
