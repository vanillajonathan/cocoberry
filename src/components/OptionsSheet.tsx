import * as React from "react";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface IOptionSheetProps {
    id: string;
    show: boolean;
    onClose(): void;
    onDone(id: string): void;
    onEdit(id: string): void;
    onDelete(id: string): void;
}

export const OptionsSheet: React.FunctionComponent<IOptionSheetProps> = (props: IOptionSheetProps) => {
    return (
        <Drawer anchor="bottom" open={props.show} onClose={props.onClose}>
            <List>
                <ListItem onClick={() => props.onDone(props.id)} button>
                    <ListItemText primary="Mark as done" />
                </ListItem>
                <ListItem onClick={() => props.onEdit(props.id)} button>
                    <ListItemText primary="Edit" />
                </ListItem>
                <ListItem onClick={() => props.onDelete(props.id)} button>
                    <ListItemText primary="Delete" />
                </ListItem>
            </List>
        </Drawer>
    );
};
