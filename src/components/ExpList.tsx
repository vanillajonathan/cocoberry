﻿import * as React from 'react';
import moment from 'moment';

type ExpListProps = {
    experiences: Experience[],
    onClick(id: string): void,
};

export interface Experience {
    id: string,
    name: string,
    last?: number | null,
    tag?: string,
}

export class ExpList extends React.Component<ExpListProps> {
    constructor(props: ExpListProps) {
        super(props);
    }

    private compare(a: Experience, b: Experience): number {
        if (a.last == null || b.last == null) {
            return 0;
        }
        if (a.last < b.last)
            return -1;
        if (a.last > b.last)
            return 1;
        return 0;
    }

    render() {
        const weekAgo = this.props.experiences
            .filter(x => x.last != null &&
                x.last < moment().subtract(1, 'w').valueOf() &&
                x.last > moment().subtract(2, 'w').valueOf()).sort(this.compare);

        const monthAgo = this.props.experiences
            .filter(x => x.last != null &&
                x.last < moment().subtract(1, 'm').valueOf() &&
                x.last > moment().subtract(2, 'm').valueOf()).sort(this.compare);

        const yearAgo = this.props.experiences
            .filter(x => x.last != null &&
                x.last < moment().subtract(1, 'y').valueOf() &&
                x.last > moment().subtract(2, 'y').valueOf()).sort(this.compare);

        return (
            <React.Fragment>
                <ExpListGroup onClick={this.props.onClick} experiences={this.props.experiences.sort(this.compare)} />

                {weekAgo.length > 0 && <React.Fragment>
                    <h2 className="h5">A week ago</h2>
                    <ExpListGroup onClick={this.props.onClick} experiences={weekAgo} />
                </React.Fragment>}

                {monthAgo.length > 0 && <React.Fragment>
                    <h2 className="h5">A month ago</h2>
                    <ExpListGroup onClick={this.props.onClick} experiences={monthAgo} />
                </React.Fragment>}

                {yearAgo.length > 0 && <React.Fragment>
                    <h2 className="h5">A year ago</h2>
                    <ExpListGroup onClick={this.props.onClick} experiences={yearAgo} />
                </React.Fragment>}
            </React.Fragment>
        );
    }
}

type ExpListGroupProps = {
    experiences: Experience[],
    onClick(id: string): void,
}

const ExpListGroup: React.FunctionComponent<ExpListGroupProps> = (props: ExpListGroupProps) => (
    <div className="list-group mb-3">
        {props.experiences.map(experience =>
            <a className="list-group-item list-group-item-action" key={experience.id} onClick={() => props.onClick(experience.id)}>
                {experience.name}
                {experience.last != null && <React.Fragment>
                    <div><small className="float-right text-muted">{new Date(experience.last).toLocaleDateString('sv-se')}</small></div>
                    <time className="d-block text-muted small" dateTime={new Date(experience.last).toISOString()} title={experience.last.toString()}>{moment(experience.last).fromNow()}</time>
                </React.Fragment>}
            </a>
        )}
    </div>
);