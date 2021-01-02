import React from "react";
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

class CoursesPage extends React.Component {
  state ={
    course: {
      title: ""
    } 
  };

  onHanderChange = (event) => {
    let course = {...this.state.course, title: event.target.value};
    this.setState({course});
  };

  onHandeSubmit = (event)  => {
    event.preventDefault();
    this.props.actions.createCourse(this.state.course);
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

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state){
  return { courses: state.courses };
}

function mapDispatchToProp(dispatch) {
  return { actions: bindActionCreators(courseActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProp)(CoursesPage);
