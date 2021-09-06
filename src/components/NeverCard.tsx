import * as React from "react";
import { IExperience } from "../IExperience";

interface IProps {
    experience: IExperience;
}

export const NeverCard: React.FunctionComponent<IProps> = (props: IProps) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <small className="text-muted text-uppercase">You have never…</small>
                <div>{props.experience.name}</div>
            </div>
        </div>
    );
};
