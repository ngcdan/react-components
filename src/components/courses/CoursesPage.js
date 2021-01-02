import React from "react";
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      course: {
        title: ""
      } 
    }
  }

  onHanderChange = (event) => {
    let course = {...this.state.course, title: event.target.value}
    this.setState({course});
  }

  onHandeSubmit(event) {
    event.preventDefault();
    this.props.dispatch(courseActions.createCourse(this.state.course));
  }


  render() {
    return (
      <form onSubmit={this.onHandeSubmit}>
        <h2>Courses</h2>
        <h3>Add course</h3>
        <input type='text' value={this.state.course.title}  onChange={this.onHanderChange}/>
        <input type="submit" value="Save" />
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

function mapStateToProps(state){
  return {
    courses: state.courses
  };
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(CoursesPage);
