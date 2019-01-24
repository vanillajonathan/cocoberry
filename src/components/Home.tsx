import * as React from 'react';
import { AddExperience } from './AddExperience';
import { ExpList, Experience } from './ExpList';
import { TagList } from './TagList';
import './Home.css';

interface HomeProps {
    experiences: Experience[];
    onAddExperience(name: string, tag: string): void;
    onClick(key: string): void;
    onNavigation(component: string): void;
}

interface HomeState {
    search: string,
    showDialog: boolean,
    showTags: boolean,
    tag: string,
}

export class Home extends React.Component<HomeProps, HomeState> {
    private readonly tags = ["Fruit", "Vegetable", "Activity"];

    constructor(props: HomeProps) {
        super(props);

        this.state = { search: '', showDialog: false, showTags: false, tag: '' };

        // This binding is necessary to make `this` work in the callback
        this.handleAddExperience = this.handleAddExperience.bind(this);
        this.handleAddExperienceButtonClick = this.handleAddExperienceButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
        this.handleTagClick = this.handleTagClick.bind(this);
    }

    private handleAddExperience(name: string, tag: string): void {
        this.setState({ showDialog: false });
        this.props.onAddExperience(name, tag);
    }

    private handleAddExperienceButtonClick() {
        this.setState({ showDialog: true });
    }

    private handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ search: event.currentTarget.value });
    }

    private handleDropdownClick(event: any) {
        event.target.parentElement.classList.toggle("dropup");
        this.setState(prevState => ({
            showTags: !prevState.showTags
        }));
    }

    private handleTagClick(tag: string) {
        this.setState({ tag: tag });
    }

    private handleClose(): void {
        this.setState({ showDialog: false });
    }

    render() {
        let experiences: Experience[];
        if (this.state.search !== '' || this.state.tag !== '') {
            experiences = this.props.experiences.filter(x => x.name.toLowerCase().includes(this.state.search.toLowerCase()));
            if (this.state.tag !== '') {
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
                            <TagList activeTag={this.state.tag} tags={this.tags} onClick={this.handleTagClick} />
                        </div>
                    }
                </header>
                <main className="App container">
                    <ExpList experiences={experiences} onClick={this.props.onClick} />
                    {experiences.length === 0 &&
                        <React.Fragment>
                            <p>There are no matched experiences.</p>
                            <button className="btn btn-outline-secondary" onClick={this.handleAddExperienceButtonClick}>Add new experience</button>
                        </React.Fragment>
                    }
                </main>
                <AddExperience name={this.state.search} show={this.state.showDialog} tags={this.tags} onAdd={this.handleAddExperience} onClose={this.handleClose} />
            </React.Fragment>
        );
    }
}