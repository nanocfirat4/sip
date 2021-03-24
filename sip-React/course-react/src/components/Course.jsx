import React, { Component } from 'react'
import { courseService } from '../services/CourseService'
import { withRouter } from 'react-router-dom'
class Course extends Component {
    state = {
        id: this.props.match.params.id,
        name: '',
        lecturer: ''
    }
    handleChange = (event) => {
        const {
            name,
            value
        } = event.target
        this.setState({
            [name]: value,
        })
    }
    submitForm = (event) => {
        event.preventDefault();
        if (this.state.id === '_add') {
            let course = {
                name: this.state.name,
                lecturer: this.state.lecturer
            }
            courseService.save(course).then(res => {
                this.props.history.push('/courses');
            });
        } else {
            courseService.save(this.state).then(res => {
                this.props.history.push('/courses');
            });
        }
    }
    componentDidMount() {
        if (this.state.id === '_add') {
            return
        }
        courseService.findById(this.state.id).then((res) => {
            let course = res.data;
            this.setState({
                name: course.name,
                lecturer: course.lecturer
            })
        })
    }
    cancel() {
        this.props.history.push('/courses');
    }
    getTitle = () => {
        if (this.state.id === '_add') {
            return "Add Course"
        }
        return "Update Course"
    }
    render() {
        const {
            name,
            lecturer
        } = this.state;
        return (<div>
            <div className="mt-3">
                <h3 className="text-center">{this.getTitle()}</h3>
                <form className="submit-form">
                    <div className="form-group">
                        <label htmlFor="name" > Name </label>
                        <input type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            value={name}
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lecturer" > Lecturer </label>
                        <input type="text" name="lecturer" id="lecturer"
                            className="form-control"
                            value={lecturer}
                            onChange={this.handleChange} />
                    </div>
                    <button className="btn btn-outline-primary mr-3"
                        onClick={this.submitForm}>
                        <i className="fas fa-save mr-2"></i>Submit </button>
                    <button className="btn btn-outline-primary"
                        onClick={this.cancel.bind(this)}>Cancel</button>
                </form>
            </div>
        </div>
        );
    }
}
export default withRouter(Course)