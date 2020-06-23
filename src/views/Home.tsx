import * as React from "react";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { AddExperienceDialog } from "../components/AddExperienceDialog";
import { EditExperienceDialog } from "../components/EditExperienceDialog";
import { IExperience } from "../IExperience";
import { ExperienceList } from "../components/ExperienceList";
import { BottomSheet } from "../components/OptionsSheet";
import { MaybeAgainCard } from "../components/MaybeAgainCard";
import { NeverCard } from "../components/NeverCard";
import { PwaInstaller } from "../components/PwaInstaller";
import { ShortcutsDialog } from "../components/ShortcutsDialog";
import { TagList } from "../components/TagList";
import { Toast } from "../components/Toast";
import "./Home.css";

interface IProps {
    experiences: IExperience[];
    tags: string[];
    onNavigation(component: string): void;
}

export const Home: React.FunctionComponent<IProps> = (props: IProps) => {
    const [activeId, setActiveId] = useState("");
    const [activeExperience, setActiveExperience] = useState<IExperience>();
    //const [experiences, setExperiences] = useState(props.storage.get());
    const [experiences, setExperiences] = useState(props.experiences);
    const [maybeAgainCardExperience, setMaybeAgainCardExperience] = useState<IExperience | null>(null);
    const [neverCardExperience, setNeverCardExperience] = useState<IExperience | null>(null);
    const [reverse, setReverse] = useState(false);
    const [search, setSearch] = useState("");
    const [showAddDialog, setShowDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showShortcutsDialog, setShowShortcutsDialog] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showTags, setShowTags] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [tag, setTag] = useState("");
    const [toastMessage, setToastMessage] = useState("");

    const prefShowMaybeAgainCard = localStorage.getItem("showMaybeAgainCard") || "false";
    const prefShowNeverCard = localStorage.getItem("showNeverCard") || "true";

    const [showMaybeAgainCard] = useState(prefShowMaybeAgainCard === "true");
    const [showNeverCard] = useState(prefShowNeverCard === "true");

    let timerId: number = 0;

    useEffect(() => {
        if (props.experiences.length !== 0) {
            const maybeExp = randomExperience(props.experiences.filter(x => x.last !== null && x.last !== undefined));
            setMaybeAgainCardExperience(maybeExp);
            const exp = randomExperience(props.experiences.filter(x => x.last === null));
            setNeverCardExperience(exp);
        }
    }, [props.experiences]);

    function handleAddExperience(name: string, tag: string): void {
        setShowDialog(false);
        const experience: IExperience = {
            id: uuid(),
            name,
            tag,
        };
        setExperiences((prevState: IExperience[]) => [...prevState, experience]);
    }

    function handleAddExperienceButtonClick(): void {
        setShowDialog(true);
    }

    function handleClick(key: string): void {
        setShowOptions(false);
        setExperiences((prevState: IExperience[]) => prevState.map(i => i.id === key ? { ...i, last: new Date().getTime() } : i));
        setToastMessage("Marked as done");
        setShowToast(true);
        window.clearTimeout(timerId);
        timerId = window.setTimeout(() => {
            setShowToast(false);
        }, 1500);
    }

    function handleDelete(key: string): void {
        setShowOptions(false);
        setToastMessage("Removed");
        setShowToast(true);
        window.clearTimeout(timerId);
        timerId = window.setTimeout(() => {
            setShowToast(false);
        }, 1500);
    }

    function handleOpenOptions(id: string): void {
        setActiveId(id);
        const exp = experiences.find(x => x.id === id);
        setActiveExperience(exp);
        setShowOptions(true);
    }

    function handleCloseOptions(): void {
        setShowOptions(false);
    }

    function handleEditOpenClick(tag: string): void {
        setShowOptions(false);
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

    function handleSort(): void {
        setReverse((prevState: boolean) => !prevState);
    }

    function handleTagClick(tag: string): void {
        setTag(tag);
    }

    function handleClose(): void {
        setShowDialog(false);
        setShowEditDialog(false);
    }

    function randomExperience(experiences: IExperience[]): IExperience {
        return experiences[Math.floor(Math.random() * experiences.length)];
    }

    let myExperiences: IExperience[];
    if (search !== "" || tag !== "") {
        myExperiences = experiences.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
        if (tag !== "") {
            myExperiences = myExperiences.filter(x => x.tag != null && x.tag.includes(tag));
        }
    } else {
        myExperiences = experiences.filter(x => x.last != null);
    }

    return (
        <React.Fragment>
            <header className="bg-white fixed-top shadow-sm">
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <div className="container-fluid">
                        <div className="d-flex flex-grow-1">
                            <span className="navbar-brand d-none d-xl-block">Cocoberry</span>
                            <div className="mr-auto">
                                <div className="input-group">
                                    <input className="form-control" type="search" accessKey="s" placeholder="Search…" title="Search" onChange={handleChange} aria-label="Search" />
                                    <button className="btn btn-outline-success dropdown-toggle" type="button" onClick={handleDropdownClick} aria-label="Show tags" />
                                </div>
                            </div>
                            <div>
                                <PwaInstaller />
                                <button className="btn btn-outline-success mr-sm-2 d-none d-xl-inline" accessKey="?" onClick={() => setShowShortcutsDialog(true)} title="Shortcuts">K</button>
                                <button className="btn btn-outline-success mr-sm-2 d-none d-xl-inline" accessKey="r" onClick={handleSort} title="Sort">▲</button>
                                <button className="btn btn-outline-success mr-sm-2" accessKey="n" onClick={handleAddExperienceButtonClick} title="Add new experience">+</button>
                                <button className="btn btn-outline-success" accessKey="p" onClick={() => props.onNavigation("Preferences")}>☰</button>
                            </div>
                        </div>
                    </div>
                </nav>
                {showTags &&
                    <div className="container">
                        <TagList activeTag={tag} tags={props.tags} onClick={handleTagClick} />
                    </div>
                }
            </header>
            <main className="App container">
                {showMaybeAgainCard && search === "" && tag === "" && maybeAgainCardExperience &&
                    <MaybeAgainCard experience={maybeAgainCardExperience} onClick={handleEditOpenClick} />
                }
                {showNeverCard && search === "" && tag === "" && neverCardExperience &&
                    <NeverCard experience={neverCardExperience} onClick={handleEditOpenClick} />
                }
                <ExperienceList experiences={myExperiences} reverse={reverse} onClick={handleOpenOptions} onEdit={handleEditOpenClick} />
                {search !== "" && myExperiences.length === 0 &&
                    <React.Fragment>
                        <p>There are no matched experiences.</p>
                        <button className="btn btn-outline-secondary" onClick={handleAddExperienceButtonClick}>Add new experience</button>
                    </React.Fragment>
                }
            </main>
            <AddExperienceDialog name={search} isOpen={showAddDialog} tags={props.tags} onAdd={handleAddExperience} onClose={handleClose} />
            {showEditDialog && activeExperience &&
                <EditExperienceDialog experience={activeExperience} isOpen={showEditDialog} tags={props.tags} onSave={handleEditSaveClick} onClose={handleClose} />
            }
            <ShortcutsDialog isOpen={showShortcutsDialog} onClose={() => setShowShortcutsDialog(false)} />
            <BottomSheet open={showOptions} onClose={handleCloseOptions}>
                <div className="list-group list-group-flush">
                    <a className="list-group-item list-group-item-action" onClick={() => handleClick(activeId)}>Mark as done</a>
                    <a className="list-group-item list-group-item-action" onClick={() => handleEditOpenClick(activeId)}>Edit</a>
                    <a className="list-group-item list-group-item-action" onClick={() => handleDelete(activeId)}>Delete</a>
                </div>
            </BottomSheet>
            <Toast message={toastMessage} show={showToast} />
        </React.Fragment>
    );
};
