import * as React from "react";

interface IProps {
    isOpen: boolean;
    onClose(): void;
}

export const ShortcutsDialog: React.FunctionComponent<IProps> = (props: IProps) => {
    let className = "modal fade";
    let backdropClassName = "fade";
    if (props.isOpen) {
        className += " d-block show";
        backdropClassName += " modal-backdrop show";
    }

    return (
        <React.Fragment>
            <div className={className} tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Keyboard Shortcuts</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <kbd><kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>N</kbd></kbd>
                                    </div>
                                    <div className="col-6">Add new experience</div>
                                    <div className="col-6">
                                        <kbd><kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>S</kbd></kbd>
                                    </div>
                                    <div className="col-6">Search</div>
                                    <div className="col-6">
                                        <kbd><kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>P</kbd></kbd>
                                    </div>
                                    <div className="col-6">Preferences</div>
                                    <div className="col-6">
                                        <kbd><kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>R</kbd></kbd>
                                    </div>
                                    <div className="col-6">Reverse sort</div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.onClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={backdropClassName} />
        </React.Fragment>
    );
};
