import React, {useEffect} from "react";
import {connect} from 'react-redux';
import {loadCourses} from '../../redux/actions/courseActions';
import {loadAuthors} from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';

function CoursesPage({courses, authors, loadAuthors, loadCourses}) {
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("load courses failed." + error);
      });
    }
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("load authors failed." + error);
      });
    }
  }, [])

  return (
    <>
      <h2>Courses</h2>
    </>
  );
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

const mapDispatchToProp = {
  loadCourses,
  loadAuthors
}

function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(CoursesPage);
