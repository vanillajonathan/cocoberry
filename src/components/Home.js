import * as React from "react";
import { useState, useEffect } from "react";
import { AddExperienceDialog } from "./AddExperienceDialog";
import { EditExperienceDialog } from "./EditExperienceDialog";
import { ExperienceList } from "./ExperienceList";
import { OptionsSheet } from "./OptionsSheet";
import { MaybeAgainCard } from "./MaybeAgainCard";
import { NeverCard } from "./NeverCard";
import { TagList } from "./TagList";
import "./Home.css";
export const Home = (props) => {
    const [activeId, setActiveId] = useState("");
    const [maybeAgainCardExperience, setMaybeAgainCardExperience] = useState(null);
    const [neverCardExperience, setNeverCardExperience] = useState(null);
    const [reverse, setReverse] = useState(false);
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
    function handleAddExperience(name, tag) {
        setShowDialog(false);
        props.onAddExperience(name, tag);
    }
    function handleAddExperienceButtonClick() {
        setShowDialog(true);
    }
    function handleOpenOptions() {
        setShowOptions(true);
    }
    function handleCloseOptions() {
        setShowOptions(false);
    }
    function handleEditOpenClick(tag) {
        setShowEditDialog(true);
    }
    function handleEditSaveClick(experience) {
        setShowEditDialog(false);
    }
    function handleChange(event) {
        setSearch(event.currentTarget.value);
    }
    function handleDropdownClick(event) {
        event.target.parentElement.classList.toggle("dropup");
        setShowTags((prevState) => !prevState);
    }
    function handleSort() {
        setReverse((prevState) => !prevState);
    }
    function handleTagClick(tag) {
        setTag(tag);
    }
    function handleClose() {
        setShowDialog(false);
    }
    function randomExperience(experiences) {
        return experiences[Math.floor(Math.random() * experiences.length)];
    }
    let experiences;
    if (search !== "" || tag !== "") {
        experiences = props.experiences.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
        if (tag !== "") {
            experiences = experiences.filter(x => x.tag != null && x.tag.includes(tag));
        }
    }
    else {
        experiences = props.experiences.filter(x => x.last != null);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("header", { className: "bg-white fixed-top shadow-sm" },
            React.createElement("nav", { className: "navbar navbar-expand-lg navbar-light bg-white" },
                React.createElement("span", { className: "navbar-brand d-none d-xl-block" }, "Cocoberry"),
                React.createElement("div", { className: "form-inline mr-auto" },
                    React.createElement("div", { className: "input-group" },
                        React.createElement("input", { className: "form-control", type: "search", accessKey: "s", placeholder: "Search\u2026", title: "Search", onChange: handleChange, "aria-label": "Search" }),
                        React.createElement("div", { className: "input-group-append mr-sm-2" },
                            React.createElement("button", { className: "btn btn-outline-success dropdown-toggle", type: "button", onClick: handleDropdownClick, "aria-label": "Show tags" })))),
                React.createElement("button", { className: "btn btn-outline-success mr-sm-2 d-none d-xl-block", accessKey: "r", onClick: handleSort, title: "Sort" }, "\u25B2"),
                React.createElement("button", { className: "btn btn-outline-success mr-sm-2", accessKey: "n", onClick: handleAddExperienceButtonClick, title: "Add new experience" }, "+"),
                React.createElement("button", { className: "btn btn-outline-success", accessKey: "p", onClick: () => props.onNavigation("Preferences") }, "\u2630")),
            showTags &&
                React.createElement("div", { className: "container" },
                    React.createElement(TagList, { activeTag: tag, tags: props.tags, onClick: handleTagClick }))),
        React.createElement("main", { className: "App container" },
            props.showMaybeAgainCard && search === "" && tag === "" && maybeAgainCardExperience &&
                React.createElement(MaybeAgainCard, { experience: maybeAgainCardExperience, onClick: handleEditOpenClick }),
            props.showNeverCard && search === "" && tag === "" && neverCardExperience &&
                React.createElement(NeverCard, { experience: neverCardExperience, onClick: handleEditOpenClick }),
            React.createElement(ExperienceList, { experiences: experiences, reverse: reverse, onClick: props.onClick, onEdit: handleEditOpenClick }),
            search !== "" && experiences.length === 0 &&
                React.createElement(React.Fragment, null,
                    React.createElement("p", null, "There are no matched experiences."),
                    React.createElement("button", { className: "btn btn-outline-secondary", onClick: handleAddExperienceButtonClick }, "Add new experience"))),
        React.createElement(AddExperienceDialog, { name: search, isOpen: showDialog, tags: props.tags, onAdd: handleAddExperience, onClose: handleClose }),
        React.createElement(EditExperienceDialog, { name: search, isOpen: showEditDialog, tags: props.tags, onSave: handleEditSaveClick, onClose: handleClose }),
        React.createElement(OptionsSheet, { id: activeId, open: showOptions, onClose: handleCloseOptions, onDelete: handleCloseOptions, onDone: handleCloseOptions, onEdit: handleCloseOptions })));
};
//# sourceMappingURL=Home.js.map