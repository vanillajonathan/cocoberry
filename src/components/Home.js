import * as React from "react";
import { AddExperienceDialog } from "./AddExperienceDialog";
import { EditExperienceDialog } from "./EditExperienceDialog";
import { ExperienceList } from "./ExperienceList";
import { OptionsSheet } from "./OptionsSheet";
import { NeverCard } from "./NeverCard";
import { TagList } from "./TagList";
import "./Home.css";
export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeId: "",
            search: "",
            showDialog: false,
            showEditDialog: false,
            showNeverCard: true,
            showOptions: false,
            showTags: false,
            tag: "",
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
    handleAddExperience(name, tag) {
        this.setState({ showDialog: false });
        this.props.onAddExperience(name, tag);
    }
    handleAddExperienceButtonClick() {
        this.setState({ showDialog: true });
    }
    handleOpenOptions() {
        this.setState({ showOptions: true });
    }
    handleCloseOptions() {
        this.setState({ showOptions: false });
    }
    handleEditOpenClick(tag) {
        this.setState({ showEditDialog: true });
    }
    handleEditSaveClick(experience) {
        this.setState({ showEditDialog: false });
    }
    handleChange(event) {
        this.setState({ search: event.currentTarget.value });
    }
    handleDropdownClick(event) {
        event.target.parentElement.classList.toggle("dropup");
        this.setState(prevState => ({ showTags: !prevState.showTags }));
    }
    handleTagClick(tag) {
        this.setState({ tag });
    }
    handleClose() {
        this.setState({ showDialog: false });
    }
    randomExperience(experiences) {
        return experiences[Math.floor(Math.random() * experiences.length)];
    }
    render() {
        let experiences;
        if (this.state.search !== "" || this.state.tag !== "") {
            experiences = this.props.experiences.filter(x => x.name.toLowerCase().includes(this.state.search.toLowerCase()));
            if (this.state.tag !== "") {
                experiences = experiences.filter(x => x.tag != null && x.tag.includes(this.state.tag));
            }
        }
        else {
            experiences = this.props.experiences.filter(x => x.last != null);
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("header", { className: "bg-white fixed-top shadow-sm" },
                React.createElement("nav", { className: "navbar navbar-expand-lg navbar-light bg-white" },
                    React.createElement("span", { className: "navbar-brand d-none d-xl-block" }, "Cocoberry"),
                    React.createElement("div", { className: "form-inline mr-auto" },
                        React.createElement("div", { className: "input-group" },
                            React.createElement("input", { className: "form-control", type: "search", accessKey: "s", placeholder: "Search\u2026", title: "Search", onChange: this.handleChange, "aria-label": "Search" }),
                            React.createElement("div", { className: "input-group-append mr-sm-2" },
                                React.createElement("button", { className: "btn btn-outline-success dropdown-toggle", type: "button", onClick: this.handleDropdownClick, "aria-label": "Show tags" })))),
                    React.createElement("button", { className: "btn btn-outline-success mr-sm-2", accessKey: "n", onClick: this.handleAddExperienceButtonClick, title: "Add new experience" }, "+"),
                    React.createElement("button", { className: "btn btn-outline-success", accessKey: "p", onClick: () => this.props.onNavigation("Preferences") }, "\u2630")),
                this.state.showTags &&
                    React.createElement("div", { className: "container" },
                        React.createElement(TagList, { activeTag: this.state.tag, tags: this.props.tags, onClick: this.handleTagClick }))),
            React.createElement("main", { className: "App container" },
                this.state.showNeverCard && this.state.search === "" && this.state.tag === "" && experiences.length !== 0 &&
                    React.createElement(NeverCard, { experience: this.randomExperience(this.props.experiences.filter(x => x.last === null)), onClick: this.handleEditOpenClick }),
                React.createElement(ExperienceList, { experiences: experiences, onClick: this.props.onClick, onEdit: this.handleEditOpenClick }),
                this.state.search !== "" && experiences.length === 0 &&
                    React.createElement(React.Fragment, null,
                        React.createElement("p", null, "There are no matched experiences."),
                        React.createElement("button", { className: "btn btn-outline-secondary", onClick: this.handleAddExperienceButtonClick }, "Add new experience"))),
            React.createElement(AddExperienceDialog, { name: this.state.search, isOpen: this.state.showDialog, tags: this.props.tags, onAdd: this.handleAddExperience, onClose: this.handleClose }),
            React.createElement(EditExperienceDialog, { name: this.state.search, isOpen: this.state.showEditDialog, tags: this.props.tags, onSave: this.handleEditSaveClick, onClose: this.handleClose }),
            React.createElement(OptionsSheet, { id: this.state.activeId, show: this.state.showOptions, onClose: this.handleCloseOptions, onDelete: this.handleCloseOptions, onDone: this.handleCloseOptions, onEdit: this.handleCloseOptions })));
    }
}
//# sourceMappingURL=Home.js.map