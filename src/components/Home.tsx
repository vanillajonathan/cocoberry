import * as React from "react";
import { useState } from "react";
import { AddExperienceDialog } from "./AddExperienceDialog";
import { EditExperienceDialog } from "./EditExperienceDialog";
import { IExperience } from "../IExperience";
import { ExperienceList } from "./ExperienceList";
import { OptionsSheet } from "./OptionsSheet";
import { NeverCard } from "./NeverCard";
import { TagList } from "./TagList";
import "./Home.css";

interface IProps {
    experiences: IExperience[];
    showNeverCard?: boolean;
    tags: string[];
    onAddExperience(name: string, tag: string): void;
    onClick(key: string): void;
    onNavigation(component: string): void;
}

export const Home: React.FunctionComponent<IProps> = (props: IProps) => {
    const [activeId, setActiveId] = useState("");
    const [search, setSearch] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showTags, setShowTags] = useState(false);
    const [tag, setTag] = useState("");

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

    function handleChange(event: React.FormEvent<HTMLInputElement>): void {
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
            <header className="bg-white fixed-top shadow-sm">
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <span className="navbar-brand d-none d-xl-block">Cocoberry</span>
                    <div className="form-inline mr-auto">
                        <div className="input-group">
                            <input className="form-control" type="search" accessKey="s" placeholder="Search…" title="Search" onChange={handleChange} aria-label="Search" />
                            <div className="input-group-append mr-sm-2">
                                <button className="btn btn-outline-success dropdown-toggle" type="button" onClick={handleDropdownClick} aria-label="Show tags" />
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-outline-success mr-sm-2" accessKey="n" onClick={handleAddExperienceButtonClick} title="Add new experience">+</button>
                    <button className="btn btn-outline-success" accessKey="p" onClick={() => props.onNavigation("Preferences")}>☰</button>
                </nav>
                {showTags &&
                    <div className="container">
                        <TagList activeTag={tag} tags={props.tags} onClick={handleTagClick} />
                    </div>
                }
            </header>
            <main className="App container">
                {props.showNeverCard && search === "" && tag === "" && experiences.length !== 0 &&
                    <NeverCard experience={randomExperience(props.experiences.filter(x => x.last === null))} onClick={handleEditOpenClick} />
                }
                <ExperienceList experiences={experiences} onClick={props.onClick} onEdit={handleEditOpenClick} />
                {search !== "" && experiences.length === 0 &&
                    <React.Fragment>
                        <p>There are no matched experiences.</p>
                        <button className="btn btn-outline-secondary" onClick={handleAddExperienceButtonClick}>Add new experience</button>
                    </React.Fragment>
                }
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
