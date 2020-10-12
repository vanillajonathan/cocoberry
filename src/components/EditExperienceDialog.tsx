import * as React from "react";
import { useState, useEffect } from "react";
import { TagList } from "./TagList";
import { IExperience } from "../IExperience";

interface IProps {
    experience: IExperience;
    isOpen: boolean;
    tags: string[];
    onClose(): void;
    onSave(experience: IExperience): void;
}

export const EditExperienceDialog: React.FunctionComponent<IProps> = (props: IProps) => {
    const [name, setName] = useState(props.experience.name);
    const [tag, setTag] = useState(props.experience.tag || "");
    const [last, setLast] = useState(props.experience.last || 0);
    const nameInput = React.createRef<HTMLInputElement>();

    useEffect(() => {
        if (nameInput.current) {
            nameInput.current.focus();
        }
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setName(event.target.value);
    }

    function handleSetTag(tagName: string): void {
        setTag(tagName);
    }

    function handleTimeChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const date = new Date(event.target.value);
        setLast(date.getTime());
    }

    function handleClose(): void {
        props.onClose();
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const experience: IExperience = { id: props.experience.id, name: name, tag: tag, last: last };
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
                            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="name">Title</label>
                                    <input className="form-control" id="name" type="text" value={name} onChange={handleChange} ref={nameInput} autoFocus required />
                                </div>
                                <div className="mb-3">
                                    <label>Tag</label>
                                    <TagList activeTag={tag} tags={props.tags} onClick={handleSetTag} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="time">Last</label>
                                    <input className="form-control" id="time" type="datetime-local" value={new Date(last).toISOString().substring(0, 16)} onChange={handleTimeChange} />
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
