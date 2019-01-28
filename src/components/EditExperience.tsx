import * as React from 'react';
import { TagList } from "./TagList";

type EditExperienceProps = {
    name?: string,
    onSave(name: string, tag: string): void,
    onClose(): void,
    show: boolean,
    tags: string[],
}

type EditExperienceState = {
    name: string,
    tag: string,
    last: string | null;
};

export class EditExperience extends React.Component<EditExperienceProps, EditExperienceState> {
    constructor(props: EditExperienceProps) {
        super(props);
        this.state = {
            name: this.props.name || "",
            tag: "",
            last: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ name: event.target.value });
    }

    private handleTimeChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ last: event.target.value });
    }

    private handleClose() {
        this.props.onClose();
    }

    private handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        this.props.onSave(this.state.name, this.state.tag);
    }

    render() {
        let className = "modal fade";
        let backdropClassName = "fade";
        if (this.props.show) {
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
                                        <TagList activeTag={this.state.tag} tags={this.props.tags} onClick={tag => this.setState({ tag: tag })} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="time">Last</label>
                                        <input className="form-control" id="time" type="datetime-local" onChange={this.handleTimeChange} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>Close</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={backdropClassName}></div>
            </React.Fragment>
        );
    }
}