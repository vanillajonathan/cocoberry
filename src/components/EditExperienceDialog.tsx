import * as React from "react";
import { useState } from "react";
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { TagList } from "./TagList";
import { IExperience } from "../IExperience";

interface IProps {
    name: string;
    isOpen: boolean;
    tags: string[];
    onClose(): void;
    onSave(experience: IExperience): void;
}

export const EditExperienceDialog: React.FunctionComponent<IProps> = (props: IProps) => {
    const [name, setName] = useState(props.name);
    const [tag, setTag] = useState("");
    const [last, setLast] = useState(0);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setName(event.target.value);
    }

    function handleTimeChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setLast(parseInt(event.target.value, 10));
    }

    function handleClose(): void {
        props.onClose();
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const experience: IExperience = { id: "", name: name, tag: tag, last: last };
        props.onSave(experience);
    }

    let className = "modal fade";
    let backdropClassName = "fade";
    if (props.isOpen) {
        className += " d-block show";
        backdropClassName += " modal-backdrop show";
    }

    return (
        <Dialog open={props.isOpen}>
            <DialogTitle>Edit experience</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="name">Title</label>
                            <TextField id="name" type="text" value={name} onChange={handleChange} autoFocus required />
                        </div>
                        <div className="form-group">
                            <label>Tag</label>
                            <TagList activeTag={tag} tags={props.tags} onClick={tag => setTag(tag)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Last</label>
                            <TextField id="time" type="datetime-local" onChange={handleTimeChange} />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={handleClose}>Close</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

EditExperienceDialog.defaultProps = {
    name: ""
}