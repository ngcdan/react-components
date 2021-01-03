import React from "react";
import {connect} from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import {Redirect} from 'react-router-dom';

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    this.props.actions.loadCourses().catch(error => {
      alert("load courses failed." + error);
    });
    this.props.actions.loadAuthors().catch(error => {
      alert("load authors failed." + error);
    });
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        <button style={{marginBottom: 20}} className="btn btn-primary add-course"
          onClick={() => this.setState({redirectToAddCoursePage: true})} />
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
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}

function mapStateToProps(state) {
  return {
    courses: state.authors.length === 0
      ? []
      : state.courses.map(course => {
        return {
          ...course,
          authorName: state.authors.find(a => a.id === course.authorId).name
        };
      }),
    authors: state.authors
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(CoursesPage);
