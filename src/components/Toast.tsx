import * as React from "react";

interface IProps {
    show: boolean;
}

export const Toast: React.FunctionComponent<IProps> = (props: IProps) => {
    let className = "toast fixed-bottom bg-dark text-white mx-auto mb-3 fade";
    if (props.show) {
        className += " show";
    }
    return (
        <div className={className} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-body">
                Marked as done
            </div>
        </div>
    );
};
