import * as React from "react";
import { DateTime } from "luxon";
import { IExperience } from "../IExperience";

interface IProps {
    experience: IExperience;
    onClick(id: string): void;
}

export const MaybeAgainCard: React.FunctionComponent<IProps> = (props: IProps) => {
    const timeAgo = DateTime.fromMillis(props.experience.last || 0).toRelative();
    return (
        <div className="card mb-3">
            <div className="card-body">
                <small className="text-muted text-uppercase">It was {timeAgo}, Maybe again…</small>
                <div>{props.experience.name}</div>
            </div>
        </div>
    );
};
