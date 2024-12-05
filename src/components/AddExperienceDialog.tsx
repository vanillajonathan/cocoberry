import * as React from "react";
import { useState, useEffect } from "react";
import { TagList } from "./TagList";

interface IProps {
    name: string;
    tags: string[];
    onAdd(name: string, tag: string): void;
}

export const AddExperienceDialog: React.FunctionComponent<IProps> = (props: IProps) => {
    const [name, setName] = useState(props.name);
    const [tag, setTag] = useState("");
    const nameInput = React.createRef<HTMLInputElement>();

    useEffect(() => {
        if (nameInput.current) {
            nameInput.current.focus();
        }

        const myModal = document.getElementById('addModal');
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

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setName(event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        props.onAdd(name, tag);
    }

    return (
        <React.Fragment>
            <div className="modal fade" id="addModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add experience</h5>
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
                                    <TagList
                                        activeTag={tag}
                                        tags={props.tags}
                                        onClick={tag => setTag(tag)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
