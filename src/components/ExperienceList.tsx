import * as React from "react";
import moment from "moment";
import { IExperience as Experience } from "../IExperience";

interface IProps {
    experiences: Experience[];
    onClick(id: string): void;
    onEdit(id: string): void;
};

export class ExperienceList extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    private compare(a: Experience, b: Experience): number {
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

    render() {
        const weekAgo = this.props.experiences
            .filter(x => x.last != null &&
                x.last < moment().subtract(1, "w").valueOf() &&
                x.last > moment().subtract(2, "w").valueOf()).sort(this.compare);

        const monthAgo = this.props.experiences
            .filter(x => x.last != null &&
                x.last < moment().subtract(1, "m").valueOf() &&
                x.last > moment().subtract(2, "m").valueOf()).sort(this.compare);

        const yearAgo = this.props.experiences
            .filter(x => x.last != null &&
                x.last < moment().subtract(1, "y").valueOf() &&
                x.last > moment().subtract(2, "y").valueOf()).sort(this.compare);

        return (
            <React.Fragment>
                <ExperienceListGroup onClick={this.props.onClick} onEdit={this.props.onEdit} experiences={this.props.experiences.sort(this.compare)} />

                {weekAgo.length > 0 &&
                    <React.Fragment>
                        <h2 className="h5">A week ago</h2>
                        <ExperienceListGroup onClick={this.props.onClick} onEdit={this.props.onEdit} experiences={weekAgo}/>
                    </React.Fragment>}

                {monthAgo.length > 0 &&
                    <React.Fragment>
                        <h2 className="h5">A month ago</h2>
                        <ExperienceListGroup onClick={this.props.onClick} onEdit={this.props.onEdit} experiences={monthAgo}/>
                    </React.Fragment>}

                {yearAgo.length > 0 &&
                    <React.Fragment>
                        <h2 className="h5">A year ago</h2>
                        <ExperienceListGroup onClick={this.props.onClick} onEdit={this.props.onEdit} experiences={yearAgo}/>
                    </React.Fragment>}
            </React.Fragment>
        );
    }
}

interface IExperienceListGroupProps {
    experiences: Experience[];
    onClick(id: string): void;
    onEdit(id: string): void;
};

const ExperienceListGroup: React.FunctionComponent<IExperienceListGroupProps> = (props: IExperienceListGroupProps) => (
    <div className="list-group mb-3">
        {props.experiences.map(experience =>
            <a className="list-group-item list-group-item-action" key={experience.id} onClick={() => props.onClick(experience.id)}>
                {experience.name}
                {experience.last != null && <React.Fragment>
                    <div><small className="float-right text-muted">{new Date(experience.last).toLocaleDateString("sv-se")}</small></div>
                    <time className="d-block text-muted small" dateTime={new Date(experience.last).toISOString()} title={experience.last.toString()}>{moment(experience.last).fromNow()}</time>
                </React.Fragment>}
            </a>
        )}
    </div>
);