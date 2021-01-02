import React from "react";
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';

class CoursesPage extends React.Component {
  componentDidMount() {
    this.props.actions.loadCourses().catch(error => {
      alert("load courses failed." + error);
    });
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapDispatchToProp(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

function mapStateToProps(state){
  return {
    courses: state.courses
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(CoursesPage);
