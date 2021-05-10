import * as React from "react";

interface IBottomSheetProps {
    children: JSX.Element;
    open: boolean;
    onClose(): void;
}

export const BottomSheet: React.FunctionComponent<IBottomSheetProps> = (props: IBottomSheetProps) => {
    let className = "offcanvas offcanvas-bottom";
    //let backdropClassName = "fade";
    //if (props.open) {
    //    className += " d-block show";
    //    backdropClassName += " modal-backdrop show";
    //}
    // style={props.open ? { zIndex: 1050 } : { zIndex: -1 }}
    
    return (
        <React.Fragment>
            <div className={className} id="bottomSheet" tabIndex={-1} role="dialog" style={{ height: 'initial' }}>
                {props.children}
            </div>
        </React.Fragment>
    );
};

interface IOptionSheetProps {
    id: string;
    open: boolean;
    onClose(): void;
    onDone(id: string): void;
    onEdit(id: string): void;
    onDelete(id: string): void;
}

export const OptionsSheet: React.FunctionComponent<IOptionSheetProps> = (props: IOptionSheetProps) => {
    return (
        <BottomSheet open={props.open} onClose={props.onClose}>
            <div className="list-group list-group-flush">
                <a className="list-group-item list-group-item-action" onClick={() => props.onDone(props.id)}>Mark as done</a>
                <a className="list-group-item list-group-item-action" onClick={() => props.onEdit(props.id)}>Edit</a>
                <a className="list-group-item list-group-item-action" onClick={() => props.onDelete(props.id)}>Delete</a>
            </div>
        </BottomSheet>
    );
};
