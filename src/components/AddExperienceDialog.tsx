import * as React from "react";
import { useState, useEffect } from "react";
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
    const nameInput = React.createRef<HTMLInputElement>();

    useEffect(() => {
        if (nameInput.current) {
            nameInput.current.focus();
        }

        var myModal = document.getElementById('exampleModal');
        var myInput = document.getElementById('name');
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

    function handleClose(): void {
        props.onClose();
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        props.onAdd(name, tag);
    }

    let className = "modal fade";
    //let backdropClassName = "fade";
    //if (props.isOpen) {
    //    className += " d-block show";
    //    backdropClassName += " modal-backdrop show";
    //}

    return (
        <React.Fragment>
            <div className={className} id="exampleModal" data-backdrop="static" data-keyboard="false" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add experience</h5>
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
                                    <TagList
                                        activeTag={tag}
                                        tags={props.tags}
                                        onClick={tag => setTag(tag)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

AddExperienceDialog.defaultProps = {
    name: "",
};
