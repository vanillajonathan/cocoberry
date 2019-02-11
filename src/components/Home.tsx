import * as React from "react";
import { AddExperienceDialog } from "./AddExperienceDialog";
import { EditExperienceDialog } from "./EditExperienceDialog";
import { IExperience } from "../IExperience";
import { ExperienceList as ExpList } from "./ExperienceList";
import { OptionsSheet } from "./OptionsSheet";
import { NeverCard } from "./NeverCard";
import { TagList } from "./TagList";
import "./Home.css";

interface IProps {
    experiences: IExperience[];
    onAddExperience(name: string, tag: string): void;
    onClick(key: string): void;
    onNavigation(component: string): void;
    tags: string[];
}

interface IState {
    activeId: string;
    search: string;
    showDialog: boolean;
    showEditDialog: boolean;
    showNeverCard: boolean;
    showOptions: boolean;
    showTags: boolean;
    tag: string;
}

export class Home extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            activeId: "",
            search: "",
            showDialog: false,
            showEditDialog: false,
            showNeverCard: true,
            showOptions: false,
            showTags: false,
            tag: ""
        };

        // This binding is necessary to make `this` work in the callback
        this.handleAddExperience = this.handleAddExperience.bind(this);
        this.handleAddExperienceButtonClick = this.handleAddExperienceButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpenOptions = this.handleOpenOptions.bind(this);
        this.handleCloseOptions = this.handleCloseOptions.bind(this);
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
        this.handleEditOpenClick = this.handleEditOpenClick.bind(this);
        this.handleTagClick = this.handleTagClick.bind(this);
        this.randomExperience = this.randomExperience.bind(this);
    }

    private handleAddExperience(name: string, tag: string): void {
        this.setState({ showDialog: false });
        this.props.onAddExperience(name, tag);
    }

    private handleAddExperienceButtonClick(): void {
        this.setState({ showDialog: true });
    }

    private handleOpenOptions(): void {
        this.setState({ showOptions: true });
    }

    private handleCloseOptions(): void {
        this.setState({ showOptions: false });
    }

    private handleEditOpenClick(tag: string): void {
        this.setState({ showEditDialog: true });
    }

    private handleEditSaveClick(experience: IExperience): void {
        this.setState({ showEditDialog: false });
    }

    private handleChange(event: React.FormEvent<HTMLInputElement>): void {
        this.setState({ search: event.currentTarget.value });
    }

    private handleDropdownClick(event: any): void {
        event.target.parentElement.classList.toggle("dropup");
        this.setState(prevState => ({
            showTags: !prevState.showTags
        }));
    }

    private handleTagClick(tag: string): void {
        this.setState({ tag: tag });
    }

    private handleClose(): void {
        this.setState({ showDialog: false });
    }

    private randomExperience(experiences: IExperience[]): IExperience {
        return experiences[Math.floor(Math.random() * experiences.length)];
    }

    render() {
        let experiences: IExperience[];
        if (this.state.search !== "" || this.state.tag !== "") {
            experiences = this.props.experiences.filter(x => x.name.toLowerCase().includes(this.state.search.toLowerCase()));
            if (this.state.tag !== "") {
                experiences = experiences.filter(x => x.tag != null && x.tag.includes(this.state.tag));
            }
        } else {
            experiences = this.props.experiences.filter(x => x.last != null);
        }

        return (
            <React.Fragment>
                <header className="bg-white fixed-top shadow-sm">
                    <nav className="navbar navbar-expand-lg navbar-light bg-white">
                        <span className="navbar-brand d-none d-xl-block">Cocoberry</span>
                        <div className="form-inline mr-auto">
                            <div className="input-group">
                                <input className="form-control" type="search" accessKey="s" placeholder="Search…" title="Search" onChange={this.handleChange} aria-label="Search" />
                                <div className="input-group-append mr-sm-2">
                                    <button className="btn btn-outline-success dropdown-toggle" type="button" onClick={this.handleDropdownClick} aria-label="Show tags"></button>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-outline-success mr-sm-2" accessKey="n" onClick={this.handleAddExperienceButtonClick} title="Add new experience">+</button>
                        <button className="btn btn-outline-success" accessKey="p" onClick={() => this.props.onNavigation("Preferences")}>☰</button>
                    </nav>
                    {this.state.showTags &&
                        <div className="container">
                            <TagList activeTag={this.state.tag} tags={this.props.tags} onClick={this.handleTagClick} />
                        </div>
                    }
                </header>
                <main className="App container">
                    {this.state.showNeverCard && this.state.search === "" && this.state.tag === "" && experiences.length !== 0 &&
                        <NeverCard experience={this.randomExperience(this.props.experiences.filter(x => x.last === null))} onClick={this.handleEditOpenClick} />
                    }
                    <ExpList experiences={experiences} onClick={this.props.onClick} onEdit={this.handleEditOpenClick} />
                    {this.state.search !== "" && experiences.length === 0 &&
                        <React.Fragment>
                            <p>There are no matched experiences.</p>
                            <button className="btn btn-outline-secondary" onClick={this.handleAddExperienceButtonClick}>Add new experience</button>
                        </React.Fragment>
                    }
                </main>
                <AddExperienceDialog name={this.state.search} isOpen={this.state.showDialog} tags={this.props.tags} onAdd={this.handleAddExperience} onClose={this.handleClose} />
                <EditExperienceDialog name={this.state.search} isOpen={this.state.showEditDialog} tags={this.props.tags} onSave={this.handleEditSaveClick} onClose={this.handleClose} />
                <OptionsSheet
                    id={this.state.activeId}
                    show={this.state.showOptions}
                    onClose={this.handleCloseOptions}
                    onDelete={this.handleCloseOptions}
                    onDone={this.handleCloseOptions}
                    onEdit={this.handleCloseOptions} />
            </React.Fragment>
        );
    }
}