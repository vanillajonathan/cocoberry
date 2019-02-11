import * as React from "react";
import { TagList } from "./TagList";

interface IProps {
    name?: string;
    onAdd(name: string, tag: string): void;
    onClose(): void;
    isOpen: boolean;
    tags: string[];
}

interface IState {
    name: string;
    tag: string;
}

export class AddExperienceDialog extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: this.props.name || "",
            tag: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ name: event.target.value });
    }

    private handleClose(): void {
        this.props.onClose();
    }

    private handleSubmit(event: React.FormEvent): void {
        event.preventDefault();
        this.props.onAdd(this.state.name, this.state.tag);
    }

    render() {
        let className = "modal fade";
        let backdropClassName = "fade";
        if (this.props.isOpen) {
            className += " d-block show";
            backdropClassName += " modal-backdrop show";
        }
        return (
            <React.Fragment>
                <div className={className} tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add experience</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="name">Title</label>
                                        <input className="form-control" id="name" type="text" value={this.state.name} onChange={this.handleChange} autoFocus required />
                                    </div>
                                    <div className="form-group">
                                        <label>Tag</label>
                                        <TagList activeTag={this.state.tag} tags={this.props.tags} onClick={tag => this.setState({ tag })} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>Close</button>
                                    <button type="submit" className="btn btn-primary">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={backdropClassName} />
            </React.Fragment>
        );
    }
}
