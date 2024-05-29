import React, { Component } from "react";
import PracticeItemDataService from "../services/practiceItem.service";
import { withRouter } from '../common/with-router';

class PracticeItem extends Component {
    constructor(props) {
        super(props);
        this.onChangeFrequency = this.onChangeFrequency.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeSource_Link = this.onChangeSource_Link.bind(this);
        this.onChangeTopic = this.onChangeTopic.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);

        this.getPracticeItem = this.getPracticeItem.bind(this);
        this.updatePracticeItem = this.updatePracticeItem.bind(this);
        this.deletePracticeItem = this.deletePracticeItem.bind(this);

        this.state = {
            currentPracticeItem: {
                id: null,
                frequency: "",
                description: "",
                source_link: "",
                topic: "",
                type: "",
                duration: 0
            },
            message: ""
        };
    }

    // If the component 'mounts' successfully, then get the id parameter from the get request
    componentDidMount() {
        this.getPracticeItem(this.props.router.params.id);
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentPracticeItem: {
                ...prevState.currentPracticeItem,
                description: description
            }
        }));
    }

    onChangeFrequency(e) {
        const frequency = e.target.value;

        this.setState(prevState => ({
            currentPracticeItem: {
                ...prevState.currentPracticeItem,
                frequency: frequency
            }
        }));
    }

    onChangeSource_Link(e) {
        const source_link = e.target.value;

        this.setState(prevState => ({
            currentPracticeItem: {
                ...prevState.currentPracticeItem,
                source_link: source_link
            }
        }));
    }

    onChangeTopic(e) {
        const topic = e.target.value;

        this.setState(prevState => ({
            currentPracticeItem: {
                ...prevState.currentPracticeItem,
                topic: topic
            }
        }));
    }

    onChangeType(e) {
        const type = e.target.value;

        this.setState(prevState => ({
            currentPracticeItem: {
                ...prevState.currentPracticeItem,
                type: type
            }
        }));
    }

    onChangeDuration(e) {
        const duration = e.target.value;

        this.setState(prevState => ({
            currentPracticeItem: {
                ...prevState.currentPracticeItem,
                duration: duration
            }
        }));
    }

    getPracticeItem(id) {
        PracticeItemDataService.get(id)
            .then(response => {
                this.setState({
                    currentPracticeItem: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePracticeItem() {
        PracticeItemDataService.update(
            this.state.currentPracticeItem.id,
            this.state.currentPracticeItem
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The practice item was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deletePracticeItem() {
        PracticeItemDataService.delete(this.state.currentPracticeItem.id)
            .then(response => {
                console.log(response.data);
                this.props.router.navigate('/practiceItems');
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentPracticeItem } = this.state;

        return (
            <div>
                {currentPracticeItem ? (
                    <div className="edit-form">
                        <h4>Practice Item</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentPracticeItem.description}
                                    onChange={this.onChangeDescription}
                                    data-cy="inputDescription-editPracticeItem"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="duration">Duration (minutes)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="duration"
                                    value={currentPracticeItem.duration}
                                    onChange={this.onChangeDuration}
                                    data-cy="inputDuration-editPracticeItem"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="frequency">Frequency</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="frequency"
                                    value={currentPracticeItem.frequency}
                                    onChange={this.onChangeFrequency}
                                    data-cy="inputFrequency-editPracticeItem"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="source_link">Source_link</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="source_link"
                                    value={currentPracticeItem.source_link}
                                    onChange={this.onChangeSource_Link}
                                    data-cy="inputSourceLink-editPracticeItem"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="topic">Topic</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="topic"
                                    value={currentPracticeItem.topic}
                                    onChange={this.onChangeTopic}
                                    data-cy="inputTopic-editPracticeItem"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="type">Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="type"
                                    value={currentPracticeItem.type}
                                    onChange={this.onChangeType}
                                    data-cy="inputType-editPracticeItem"
                                />
                            </div>
                        </form>
                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deletePracticeItem}
                            data-cy="buttonDelete-editPracticeItem"
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updatePracticeItem}
                            data-cy="buttonSubmit-editPracticeItem"
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Practice Item...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(PracticeItem);
