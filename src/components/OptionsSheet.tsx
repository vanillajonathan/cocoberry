import * as React from "react";

interface IBottomSheetProps {
    children: JSX.Element;
    show: boolean;
    onClose(): void;
}

export const BottomSheet: React.FunctionComponent<IBottomSheetProps> = (props: IBottomSheetProps) => {
    let className = "fixed-bottom fade";
    let backdropClassName = "fade";
    if (props.show) {
        className += " d-block show";
        backdropClassName += " modal-backdrop show";
    }

    if (props.show) {
        return (
            <React.Fragment>
                <div className={className} tabIndex={-1} role="dialog" style={{ zIndex: 2000 }}>
                    {props.children}
                </div>
                <div className={backdropClassName} onClick={props.onClose}/>
            </React.Fragment>
        );
    }

    return null;
};

interface IOptionSheetProps {
    id: string;
    show: boolean;
    onClose(): void;
    onDone(id: string): void;
    onEdit(id: string): void;
    onDelete(id: string): void;
}

export const OptionsSheet: React.FunctionComponent<IOptionSheetProps> = (props: IOptionSheetProps) => {
    return (
        <BottomSheet show={props.show} onClose={props.onClose}>
            <div className="list-group">
                <a className="list-group-item" onClick={() => props.onDone(props.id)}>Mark as done</a>
                <a className="list-group-item" onClick={() => props.onEdit(props.id)}>Edit</a>
                <a className="list-group-item" onClick={() => props.onDelete(props.id)}>Delete</a>
            </div>
        </BottomSheet>
    );
};
