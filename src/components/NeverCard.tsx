import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IExperience } from "../IExperience";

interface IProps {
    experience: IExperience;
    onClick(id: string): void;
}

export const NeverCard: React.FunctionComponent<IProps> = (props: IProps) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="caption">You have never…</Typography>
                <Typography>{props.experience.name}</Typography>
            </CardContent>
        </Card>
    );
};
