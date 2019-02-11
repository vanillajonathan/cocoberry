import * as React from "react";

interface IBottomSheetProps {
    onClose(): void;
    show: boolean;
}

class BottomSheet extends React.Component<IBottomSheetProps> {
    render() {
        let className = "fixed-bottom fade";
        let backdropClassName = "fade";
        if (this.props.show) {
            className += " d-block show";
            backdropClassName += " modal-backdrop show";
        }
        return (
            this.props.show &&
                <React.Fragment>
                    <div className={className} tabIndex={-1} role="dialog" style={{ zIndex: 2000 }}>
                        {this.props.children}
                    </div>
                    <div className={backdropClassName} onClick={this.props.onClose} />
                </React.Fragment>
        );
    }
}

interface IOptionSheetProps {
    id: string;
    onClose(): void;
    onDone(id: string): void;
    onEdit(id: string): void;
    onDelete(id: string): void;
    show: boolean;
}

export class OptionsSheet extends React.Component<IOptionSheetProps> {
    render() {
        return (
            <BottomSheet show={this.props.show} onClose={this.props.onClose}>
                <div className="list-group">
                    <a className="list-group-item" onClick={() => this.props.onDone(this.props.id)}>Mark as done</a>
                    <a className="list-group-item" onClick={() => this.props.onEdit(this.props.id)}>Edit</a>
                    <a className="list-group-item" onClick={() => this.props.onDelete(this.props.id)}>Delete</a>
                </div>
            </BottomSheet>
        );
    }
}
