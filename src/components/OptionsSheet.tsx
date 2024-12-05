import * as React from "react";
import { JSX } from "react/jsx-runtime";

interface IBottomSheetProps {
    children: JSX.Element;
}

export const BottomSheet: React.FunctionComponent<IBottomSheetProps> = (props: IBottomSheetProps) => {
    const className = "offcanvas offcanvas-bottom";

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
    onClose(): void;
    onDone(id: string): void;
    onEdit(id: string): void;
    onDelete(id: string): void;
}

export const OptionsSheet: React.FunctionComponent<IOptionSheetProps> = (props: IOptionSheetProps) => {
    return (
        <BottomSheet>
            <div className="list-group list-group-flush">
                <a className="list-group-item list-group-item-action" onClick={() => props.onDone(props.id)}>Mark as done</a>
                <a className="list-group-item list-group-item-action" onClick={() => props.onEdit(props.id)}>Edit</a>
                <a className="list-group-item list-group-item-action" onClick={() => props.onDelete(props.id)}>Delete</a>
            </div>
        </BottomSheet>
    );
};
