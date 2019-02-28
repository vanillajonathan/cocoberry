import * as React from "react";
import { useState } from "react";
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { TagList } from "./TagList";

interface IProps {
    name: string;
    isOpen: boolean;
    tags: string[];
    onAdd(name: string, tag: string): void;
    onClose(): void;
}

export const AddExperienceDialog: React.FunctionComponent<IProps> = (props: IProps) => {
    const [name, setName] = useState(props.name);
    const [tag, setTag] = useState("");

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setName(event.target.value);
    }

    function handleClose(): void {
        props.onClose();
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        props.onAdd(name, tag);
    }

    return (
        <Dialog open={props.isOpen}>
            <DialogTitle>Add experience</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <div className="form-group">
                        <label htmlFor="name">Title</label>
                        <TextField id="name" type="text" value={name} onChange={handleChange} autoFocus required />
                    </div>
                    <div className="form-group">
                        <label>Tag</label>
                        <TagList
                            activeTag={tag}
                            tags={props.tags}
                            onClick={tag => setTag(tag)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button type="button" data-dismiss="modal" onClick={handleClose}>Close</Button>
                    <Button color="primary" type="submit">Add</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

AddExperienceDialog.defaultProps = {
    name: ""
}
