
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { courseService } from '../services/CourseService'
import keycloak from '../keycloak'
class CourseList extends Component {
    state = {
        isLoading: false,
        courses: []
    }
    deleteCourse = (id) => {
        courseService.remove(id).then(res => {
            this.setState({
                courses: this.state.courses.filter(course => course.id !==
                    id)
            });
        });
    }
    editCourse = (id) => {
        this.props.history.push(`edit-course/${id}`)
    }
    addCourse() {
        this.props.history.push('/edit-course/_add');
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        courseService.authToken(keycloak.token)
        courseService.findAll().then((res) => {
            this.setState({ courses: res.data, isLoading: false });
        });
    }
    render() {
        const { isLoading, courses } = this.state
        return (
            isLoading ? <></> : (
                <div className="mt-3">
                    <div className="clearfix">
                        <h2 className="float-left"> Course List</h2>
                        <button className="btn btn-outline-primary float-right"
                            onClick={() => this.addCourse()}>
                            <i className="fas fa-plus-square mr-2"></i>Add Course</button>
                    </div>
                    <table className="table">
                        <thead>
                            <tr><th>Name</th><th>Lecturer</th><th /></tr>
                        </thead>
                        <tbody>
                            {courses.map(course =>
                                <tr key={course.id}>
                                    <td>{course.name}</td>
                                    <td>{course.lecturer}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>
                                        <button onClick={() => this.editCourse(course.id)}
                                            className="btn btn-outline-secondary mr-1">
                                            <i className="fas fa-edit mr-2"></i>Edit</button>
                                        <button onClick={() => this.removeCourse(course.id)}
                                            className="btn btn-outline-secondary btn-delete-course">
                                            <i className="fas fa-trash mr-2"></i>Delete</button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table></div>))
    }
}
export default withRouter(CourseList)