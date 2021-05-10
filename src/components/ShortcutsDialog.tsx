import * as React from "react";

interface IProps {
    isOpen: boolean;
    onClose(): void;
}

export const ShortcutsDialog: React.FunctionComponent<IProps> = (props: IProps) => {
    return (
        <React.Fragment>
            <div className="modal fade" id="shortcutsModal" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Keyboard Shortcuts</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <kbd><kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>N</kbd></kbd>
                                    </div>
                                    <div className="col">Add new experience</div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <kbd><kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>S</kbd></kbd>
                                    </div>
                                    <div className="col">Search</div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <kbd><kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>P</kbd></kbd>
                                    </div>
                                    <div className="col">Preferences</div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <kbd><kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>R</kbd></kbd>
                                    </div>
                                    <div className="col">Reverse sort</div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.onClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
