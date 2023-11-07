import * as React from "react";
import { useState, useEffect } from "react";
import { TagList } from "./TagList";
import { IExperience } from "../IExperience";

interface IProps {
    experience: IExperience;
    tags: string[];
    onSave(experience: IExperience): void;
}

export const EditExperienceDialog: React.FunctionComponent<IProps> = (props: IProps) => {
    const [name, setName] = useState(props.experience.name);
    const [tag, setTag] = useState(props.experience.tag || "");
    const [last, setLast] = useState<number | null>(props.experience.last || 0);
    const nameInput = React.createRef<HTMLInputElement>();

    useEffect(() => {
        setName(props.experience.name);
        setTag(props.experience.tag || "");
        setLast(props.experience.last || 0);
    }, [props.experience]);

    useEffect(() => {
        if (nameInput.current) {
            nameInput.current.focus();
        }

        const myModal = document.getElementById('editModal');
        const myInput = document.getElementById('name');
        if (myModal !== null && myInput !== null) {
            myModal.addEventListener('shown.bs.modal',
                () => {
                    if (myInput !== null) {
                        myInput.focus();
                    }
                });
        }
    });

    function formatDate(): string {
        if (last === null) {
            return "";
        }

        return new Date(last).toISOString().substring(0, 16);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setName(event.target.value);
    }

    function handleSetTag(tagName: string): void {
        setTag(tagName);
    }

    function handleTimeChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (event.target.value === "") {
            setLast(null);
        } else {
            const date = new Date(event.target.value);
            setLast(date.getTime());
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const experience: IExperience = { id: props.experience.id, name: name, tag: tag, last: last };
        props.onSave(experience);
    }

    return (
        <React.Fragment>
            <div className="modal fade" id="editModal" data-bs-keyboard="false" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit experience</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="name">Title</label>
                                    <input className="form-control" id="name" type="text" value={name} onChange={handleChange} ref={nameInput} autoFocus required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tag</label>
                                    <TagList activeTag={tag} tags={props.tags} onClick={handleSetTag} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="time">Last</label>
                                    <input className="form-control" id="time" type="datetime-local" value={formatDate()} onChange={handleTimeChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
