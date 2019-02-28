import * as React from "react";
import Chip from '@material-ui/core/Chip';

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
                if (tag.toLowerCase() === props.activeTag) {
                    return <Chip key={tag} color="secondary" onClick={handleClick} label={tag} />;
                } else {
                    return <Chip key={tag} onClick={handleClick} label={tag} />;
                }
            })}
        </ul>
    );
};
