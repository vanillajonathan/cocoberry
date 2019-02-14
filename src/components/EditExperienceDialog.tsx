import * as React from "react";
import { useState, useEffect } from "react";
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
    const nameInput = React.createRef<HTMLInputElement>();

    useEffect(() => {
        if (nameInput.current) {
            nameInput.current.focus();
        }
    });

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
        <React.Fragment>
            <div className={className} tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit experience</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name">Title</label>
                                    <input className="form-control" id="name" type="text" value={name} onChange={handleChange} ref={nameInput} autoFocus required />
                                </div>
                                <div className="form-group">
                                    <label>Tag</label>
                                    <TagList activeTag={tag} tags={props.tags} onClick={tag => setTag(tag)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="time">Last</label>
                                    <input className="form-control" id="time" type="datetime-local" onChange={handleTimeChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={backdropClassName} />
        </React.Fragment>
    );
};

EditExperienceDialog.defaultProps = {
    name: ""
}