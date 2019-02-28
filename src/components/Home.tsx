import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { AddExperienceDialog } from "./AddExperienceDialog";
import { EditExperienceDialog } from "./EditExperienceDialog";
import { IExperience } from "../IExperience";
import { ExperienceList } from "./ExperienceList";
import { OptionsSheet } from "./OptionsSheet";
import { MaybeAgainCard } from "./MaybeAgainCard";
import { NeverCard } from "./NeverCard";
import { TagList } from "./TagList";
import "./Home.css";

interface IProps {
    experiences: IExperience[];
    showMaybeAgainCard?: boolean;
    showNeverCard?: boolean;
    tags: string[];
    onAddExperience(name: string, tag: string): void;
    onClick(key: string): void;
    onNavigation(component: string): void;
}

export const Home: React.FunctionComponent<IProps> = (props: IProps) => {
    const [activeId, setActiveId] = useState("");
    const [maybeAgainCardExperience, setMaybeAgainCardExperience] = useState<IExperience | null>(null);
    const [neverCardExperience, setNeverCardExperience] = useState<IExperience | null>(null);
    const [search, setSearch] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showTags, setShowTags] = useState(false);
    const [tag, setTag] = useState("");

    useEffect(() => {
        if (props.experiences.length !== 0) {
            const maybeExp = randomExperience(props.experiences.filter(x => x.last !== null && x.last !== undefined));
            setMaybeAgainCardExperience(maybeExp);
            const exp = randomExperience(props.experiences.filter(x => x.last === null));
            setNeverCardExperience(exp);
        }
    }, []);

    function handleAddExperience(name: string, tag: string): void {
        setShowDialog(false);
        props.onAddExperience(name, tag);
    }

    function handleAddExperienceButtonClick(): void {
        setShowDialog(true);
    }

    function handleOpenOptions(): void {
        setShowOptions(true);
    }

    function handleCloseOptions(): void {
        setShowOptions(false);
    }

    function handleEditOpenClick(tag: string): void {
        setShowEditDialog(true);
    }

    function handleEditSaveClick(experience: IExperience): void {
        setShowEditDialog(false);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setSearch(event.currentTarget.value);
    }

    function handleDropdownClick(event: any): void {
        event.target.parentElement.classList.toggle("dropup");
        setShowTags((prevState: boolean) => !prevState);
    }

    function handleTagClick(tag: string): void {
        setTag(tag);
    }

    function handleClose(): void {
        setShowDialog(false);
    }

    function randomExperience(experiences: IExperience[]): IExperience {
        return experiences[Math.floor(Math.random() * experiences.length)];
    }

    let experiences: IExperience[];
    if (search !== "" || tag !== "") {
        experiences = props.experiences.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
        if (tag !== "") {
            experiences = experiences.filter(x => x.tag != null && x.tag.includes(tag));
        }
    } else {
        experiences = props.experiences.filter(x => x.last != null);
    }

    return (
        <React.Fragment>
            <AppBar color="default">
                <Toolbar className="navbar navbar-expand-lg navbar-light bg-white">
                    <Hidden mdDown>
                        <Typography variant="h6" color="inherit">Cocoberry</Typography>
                    </Hidden>
                    <div className="form-inline mr-auto">
                        <TextField color="inherit" type="search" accessKey="s" placeholder="Search…" title="Search" onChange={handleChange} aria-label="Search" />
                        <IconButton color="inherit" type="button" onClick={handleDropdownClick} aria-label="Show tags"><Icon>expand_more</Icon></IconButton>
                    </div>
                    <IconButton color="inherit" accessKey="p" onClick={() => props.onNavigation("Preferences")}><Icon>settings</Icon></IconButton>
                </Toolbar>
                {showTags &&
                    <div className="container">
                        <TagList activeTag={tag} tags={props.tags} onClick={handleTagClick} />
                    </div>
                }
            </AppBar>
            <main className="App container">
                {props.showMaybeAgainCard && search === "" && tag === "" && maybeAgainCardExperience &&
                    <MaybeAgainCard experience={maybeAgainCardExperience} onClick={handleEditOpenClick} />
                }
                {props.showNeverCard && search === "" && tag === "" && neverCardExperience &&
                    <NeverCard experience={neverCardExperience} onClick={handleEditOpenClick} />
                }
                <ExperienceList experiences={experiences} onClick={props.onClick} onEdit={handleOpenOptions} />
                {search !== "" && experiences.length === 0 &&
                    <React.Fragment>
                        <Typography>There are no matched experiences.</Typography>
                        <Button onClick={handleAddExperienceButtonClick}>Add new experience</Button>
                    </React.Fragment>
                }
                <Fab color="inherit" accessKey="n" onClick={handleAddExperienceButtonClick} title="Add new experience"><Icon>add</Icon></Fab>
            </main>
            <AddExperienceDialog name={search} isOpen={showDialog} tags={props.tags} onAdd={handleAddExperience} onClose={handleClose} />
            <EditExperienceDialog name={search} isOpen={showEditDialog} tags={props.tags} onSave={handleEditSaveClick} onClose={handleClose} />
            <OptionsSheet
                id={activeId}
                show={showOptions}
                onClose={handleCloseOptions}
                onDelete={handleCloseOptions}
                onDone={handleCloseOptions}
                onEdit={handleCloseOptions}
            />
        </React.Fragment>
    );
};
