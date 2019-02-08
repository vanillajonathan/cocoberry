import * as React from "react";

type ToastProps = {
    show: boolean
};

export const Toast: React.FunctionComponent<ToastProps> = (props: ToastProps) => {
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