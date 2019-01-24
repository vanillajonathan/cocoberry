import * as React from 'react';
import { AddExperience } from './AddExperience';
import { ExpList } from './ExpList';
import { TagList } from './TagList';
import './Home.css';
export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.tags = ["Fruit", "Vegetable", "Activity"];
        this.state = { search: '', showDialog: false, showTags: false, tag: '' };
        // This binding is necessary to make `this` work in the callback
        this.handleAddExperience = this.handleAddExperience.bind(this);
        this.handleAddExperienceButtonClick = this.handleAddExperienceButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
        this.handleTagClick = this.handleTagClick.bind(this);
    }
    handleAddExperience(name, tag) {
        this.setState({ showDialog: false });
        this.props.onAddExperience(name, tag);
    }
    handleAddExperienceButtonClick() {
        this.setState({ showDialog: true });
    }
    handleChange(event) {
        this.setState({ search: event.currentTarget.value });
    }
    handleDropdownClick(event) {
        event.target.parentElement.classList.toggle("dropup");
        this.setState(prevState => ({
            showTags: !prevState.showTags
        }));
    }
    handleTagClick(tag) {
        this.setState({ tag: tag });
    }
    handleClose() {
        this.setState({ showDialog: false });
    }
    render() {
        let experiences;
        if (this.state.search !== '' || this.state.tag !== '') {
            experiences = this.props.experiences.filter(x => x.name.toLowerCase().includes(this.state.search.toLowerCase()));
            if (this.state.tag !== '') {
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
                        React.createElement(TagList, { activeTag: this.state.tag, tags: this.tags, onClick: this.handleTagClick }))),
            React.createElement("main", { className: "App container" },
                React.createElement(ExpList, { experiences: experiences, onClick: this.props.onClick }),
                experiences.length === 0 &&
                    React.createElement(React.Fragment, null,
                        React.createElement("p", null, "There are no matched experiences."),
                        React.createElement("button", { className: "btn btn-outline-secondary", onClick: this.handleAddExperienceButtonClick }, "Add new experience"))),
            React.createElement(AddExperience, { name: this.state.search, show: this.state.showDialog, tags: this.tags, onAdd: this.handleAddExperience, onClose: this.handleClose })));
    }
}
//# sourceMappingURL=Home.js.map