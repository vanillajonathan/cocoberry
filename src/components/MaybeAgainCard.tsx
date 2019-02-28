import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from "moment";
import { IExperience } from "../IExperience";

interface IProps {
    experience: IExperience;
    onClick(id: string): void;
}

export const MaybeAgainCard: React.FunctionComponent<IProps> = (props: IProps) => {
    const timeAgo = moment(props.experience.last || 0).fromNow();
    return (
        <Card>
            <CardContent>
                <Typography variant="caption">It was {timeAgo}, Maybe again…</Typography>
                <Typography>{props.experience.name}</Typography>
            </CardContent>
        </Card>
    );
};
