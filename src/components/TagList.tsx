import * as React from "react";

interface IProps {
    activeTag: string;
    tags: string[];
    onClick(tag: string): void;
}

export const TagList: React.FunctionComponent<IProps> = (props: IProps) => {
    function handleClick(event: React.MouseEvent<HTMLElement>): void {
        let activeTag = event.currentTarget.innerText.toLowerCase();
        if (activeTag === props.activeTag) {
            activeTag = "";
        }
        props.onClick(activeTag);
    }

    return (
        <ul className="list-inline">
            {props.tags.map(tag => {
                let className = "badge ";
                className += (tag.toLowerCase() === props.activeTag ? "bg-primary" : "bg-light text-dark");
                return <li className="list-inline-item" key={tag}><span className={className} onClick={handleClick}>{tag}</span></li>;
            })}
        </ul>
    );
};
