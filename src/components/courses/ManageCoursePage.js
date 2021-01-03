import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {loadCourses} from '../../redux/actions/courseActions';
import {loadAuthors} from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import {newCourse} from '../../../tools/mockData';

function CoursesPage({courses, authors, loadAuthors, loadCourses, ...props}) {
  const [course, setCourse] = useState({...props.course});
  const [error, setError] = useState({});

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

  function handleChange(event) {
    const {name, value} = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  return (<CourseForm course={course} error={error} authors={authors}onChange={handleChange} />);
}

CoursesPage.propTypes = {
  course: PropTypes.object.isRequired,
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
    course: newCourse,
    courses: state.courses,
    authors: state.authors
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(CoursesPage);
