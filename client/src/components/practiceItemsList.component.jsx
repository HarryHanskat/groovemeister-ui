import React, { useState, useEffect, Component } from "react";
import PracticeItemDataService from "../services/practiceItem.service";
import { Link } from "react-router-dom";

export default class PracticeItemList extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.onChangeSearchDescription = this.onChangeSearchDescription.bind(this);
        this.retrievePracticeItems = this.retrievePracticeItems.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActivePracticeItem = this.setActivePracticeItem.bind(this);
        this.removeAllPracticeItems = this.removeAllPracticeItems.bind(this);
        this.searchDescription = this.searchDescription.bind(this);

        this.state = {
            practiceItems: [],
            currentPracticeItem: null,
            currentIndex: -1,
            searchDescription: ""
        };
    }

    componentDidMount() {
        this.retrievePracticeItems();
    }

    onChangeSearchDescription(e) {
        const searchDescription = e.target.value;

        this.setState({
            searchDescription: searchDescription
        })
    }

    retrievePracticeItems() {
        PracticeItemDataService.getAll()
            .then(response => {
                this.setState({
                    practiceItems: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrievePracticeItems();
        this.setState({
            currentPracticeItem: null,
            currentIndex: -1
        });
    }

    setActivePracticeItem(practiceItem, index) {
        this.setState({
            currentPracticeItem: practiceItem,
            currentIndex: index
        });
    }

    removeAllPracticeItems() {
        PracticeItemDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchDescription() {
        PracticeItemDataService.findByDescription(this.state.searchDescription)
            .then(response => {
                this.setState({
                    practiceItems: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchDescription, practiceItems, currentPracticeItem, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by description"
                            value={searchDescription}
                            onChange={this.onChangeSearchDescription}
                            data-cy="textBox-search"
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchDescription}
                                data-cy="button-search"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4 data-cy="header-practiceItemsList">Practice Items List</h4>

                    <ul data-cy="list-practiceItemsList" className="list-group">
                        {practiceItems &&
                            practiceItems.map((practiceItem, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActivePracticeItem(practiceItem, index)}
                                    key={index}
                                    data-cy={"listItem"+index+"-practiceItemsList"}
                                >
                                    {practiceItem.description}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllPracticeItems}
                        data-cy="buttonRemoveAll-practiceItemsList"
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentPracticeItem ? (
                        <div>
                            <h4>Practice Item</h4>
                            <div>
                                <label data-cy="labelDescription-selectedPracticeItem">
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentPracticeItem.description}
                            </div>
                            <div>
                                <label data-cy="labelDuration-selectedPracticeItem">
                                    <strong>Duration (minutes):</strong>
                                </label>{" "}
                                {currentPracticeItem.duration}
                            </div>
                            <div>
                                <label data-cy="labelFrequency-selectedPracticeItem">
                                    <strong>Frequency:</strong>
                                </label>{" "}
                                {currentPracticeItem.frequency}
                            </div>
                            <div>
                                <label data-cy="labelTopic-selectedPracticeItem">
                                    <strong>Topic:</strong>
                                </label>{" "}
                                {currentPracticeItem.topic}
                            </div>
                            <div>
                                <label data-cy="labelType-selectedPracticeItem">
                                    <strong>Type:</strong>
                                </label>{" "}
                                {currentPracticeItem.type}
                            </div>
                            <div>
                                <label data-cy="labelSourceLink-selectedPracticeItem">
                                    <strong>Source/Link:</strong>
                                </label>{" "}
                                {currentPracticeItem.source_link}
                            </div>
                            <Link
                                to={"/practiceItems/" + currentPracticeItem.id}
                                className="badge badge-warning"
                                data-cy="linkEdit-selectedPracticeItem"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p data-cy="placeholderText-selectedPracticeItem">Please click on a Practice Item...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}