import * as React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
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
            <Typography variant="subtitle1">A week ago</Typography>
            <ExperienceListGroup onClick={props.onClick} onEdit={props.onEdit} experiences={weekAgo} />
        </React.Fragment>);

    const monthGroup = (
        <React.Fragment>
            <Typography variant="subtitle1">A month ago</Typography>
            <ExperienceListGroup onClick={props.onClick} onEdit={props.onEdit} experiences={monthAgo} />
        </React.Fragment>);

    const yearGroup = (
        <React.Fragment>
            <Typography variant="subtitle1">A year ago</Typography>
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
                <time dateTime={new Date(experience.last).toISOString()} title={experience.last.toString()}>{moment(experience.last).fromNow()}</time>
            </React.Fragment>);
    }

    return (
        <List>
            {props.experiences.map(experience =>
                <ListItem key={experience.id} onClick={() => props.onClick(experience.id)} button>
                    <ListItemText primary={experience.name} secondary={experience.last != null && last(experience)} />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Options" onClick={() => props.onEdit(experience.id)}>
                            <Icon>more_vert</Icon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )}
        </List>);
};
