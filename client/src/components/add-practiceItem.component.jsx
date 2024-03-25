import React, { Component } from "react";
import PracticeItemDataService from "../services/practiceItem.service";

export default class AddPracticeItem extends Component {
    constructor(props) {
        super(props);
        this.onChangeFrequency = this.onChangeFrequency.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeSource_Link = this.onChangeSource_Link.bind(this);
        this.onChangeTopic = this.onChangeTopic.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);

        this.savePracticeItem = this.savePracticeItem.bind(this);
        this.newPracticeItem = this.newPracticeItem.bind(this);

        this.state = {
            id: null,
            frequency: "",
            description: "",
            source_link: "",
            topic: "",
            type: "",
            duration: 0,

            submitted: false
        };
    }

    onChangeFrequency(e) {
        this.setState({
            frequency: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeSource_Link(e) {
        this.setState({
            source_link: e.target.value
        });
    }

    onChangeTopic(e) {
        this.setState({
            topic: e.target.value
        });
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    savePracticeItem() {
        let data = {
            frequency: this.state.frequency,
            description: this.state.description,
            source_link: this.state.source_link,
            topic: this.state.topic,
            type: this.state.type,
            duration: this.state.duration
        };

        PracticeItemDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    frequency: response.data.frequency,
                    description: response.data.description,
                    source_link: response.data.source_link,
                    topic: response.data.topic,
                    type: response.data.type,
                    duration: response.data.duration,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newPracticeItem() {
        this.setState({
            id: null,
            frequency: "",
            description: "",
            source_link: "",
            topic: "",
            type: "",
            duration: 0,

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newPracticeItem}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="duration">Duration (minutes)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="duration"
                                required
                                value={this.state.duration}
                                onChange={this.onChangeDuration}
                                name="duration"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="frequency">Frequency</label>
                            <input
                                type="text"
                                className="form-control"
                                id="frequency"
                                required
                                value={this.state.frequency}
                                onChange={this.onChangeFrequency}
                                name="frequency"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="topic">Topic</label>
                            <input
                                type="text"
                                className="form-control"
                                id="topic"
                                required
                                value={this.state.topic}
                                onChange={this.onChangeTopic}
                                name="topic"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <input
                                type="text"
                                className="form-control"
                                id="type"
                                required
                                value={this.state.type}
                                onChange={this.onChangeType}
                                name="type"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="source_link">Source Link</label>
                            <input
                                type="text"
                                className="form-control"
                                id="source_link"
                                required
                                value={this.state.source_link}
                                onChange={this.onChangeSource_Link}
                                name="source_link"
                            />
                        </div>
                        <button onClick={this.savePracticeItem} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}