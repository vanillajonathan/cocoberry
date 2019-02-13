import * as React from "react";
import moment from "moment";
import { IExperience } from "../IExperience";

interface IProps {
    experiences: IExperience[];
    onClick(id: string): void;
    onEdit(id: string): void;
}

export const ExperienceList: React.FunctionComponent<IProps> = (props: IProps) => {
    function compare(a: IExperience, b: IExperience): number {
        if (a.last == null || b.last == null) {
            return 0;
        }
        if (a.last < b.last) {
            return -1;
        }
        if (a.last > b.last) {
            return 1;
        }
        return 0;
    }

    const weekAgo = props.experiences
        .filter(x => x.last != null &&
            x.last < moment().subtract(1, "w").valueOf() &&
            x.last > moment().subtract(2, "w").valueOf()).sort(compare);

    const monthAgo = props.experiences
        .filter(x => x.last != null &&
            x.last < moment().subtract(1, "m").valueOf() &&
            x.last > moment().subtract(2, "m").valueOf()).sort(compare);

    const yearAgo = props.experiences
        .filter(x => x.last != null &&
            x.last < moment().subtract(1, "y").valueOf() &&
            x.last > moment().subtract(2, "y").valueOf()).sort(compare);

    const weekGroup = (
        <React.Fragment>
            <h2 className="h5">A week ago</h2>
            <ExperienceListGroup onClick={props.onClick} onEdit={props.onEdit} experiences={weekAgo} />
        </React.Fragment>);

    const monthGroup = (
        <React.Fragment>
            <h2 className="h5">A month ago</h2>
            <ExperienceListGroup onClick={props.onClick} onEdit={props.onEdit} experiences={monthAgo} />
        </React.Fragment>);

    const yearGroup = (
        <React.Fragment>
            <h2 className="h5">A year ago</h2>
            <ExperienceListGroup onClick={props.onClick} onEdit={props.onEdit} experiences={yearAgo} />
        </React.Fragment>);

    return (
        <React.Fragment>
            <ExperienceListGroup onClick={props.onClick} onEdit={props.onEdit} experiences={props.experiences.sort(compare)} />
            {weekAgo.length > 0 && weekGroup}
            {monthAgo.length > 0 && monthGroup}
            {yearAgo.length > 0 && yearGroup}
        </React.Fragment>
    );
};

interface IExperienceListGroupProps {
    experiences: IExperience[];
    onClick(id: string): void;
    onEdit(id: string): void;
}

const ExperienceListGroup: React.FunctionComponent<IExperienceListGroupProps> = (props: IExperienceListGroupProps) => {
    function last(experience: any): JSX.Element {
        return (
            <React.Fragment>
                <div><small className="float-right text-muted">{new Date(experience.last).toLocaleDateString("sv-se")}</small></div>
                <time className="d-block text-muted small" dateTime={new Date(experience.last).toISOString()} title={experience.last.toString()}>{moment(experience.last).fromNow()}</time>
            </React.Fragment>);
    }

    return (
        <div className="list-group mb-3">
            {props.experiences.map(experience =>
                <a className="list-group-item list-group-item-action" key={experience.id} onClick={() => props.onClick(experience.id)}>
                    {experience.name}
                    {experience.last != null && last(experience)}
                </a>
            )}
        </div>);
};
