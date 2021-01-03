import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {loadCourses, saveCourse} from '../../redux/actions/courseActions';
import {loadAuthors} from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import {newCourse} from '../../../tools/mockData';
import {toast} from 'react-toastify';

function CoursesPage({courses, authors, loadAuthors, loadCourses, saveCourse, history, ...props}) {
  const [course, setCourse] = useState({...props.course});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("load courses failed." + error);
      });
    } else {
      setCourse({...props.course});
    }
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("load authors failed." + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const {name, value} = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }))
  }

    function isValidForm() {
      const {title, authorId, category} = course;
      const errors = {};

      if (!title) errors.title = "Title is required.";
      if (!authorId) errors.author = "AuthorId is required.";
      if (!category) errors.category = "Category is required.";
      setErrors(errors);
      return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
      event.preventDefault();
      if (!isValidForm()) return;
      saveCourse(course).then(() => {
        toast.success("Saved success.")
        history.push("/courses");
      }).catch(error => {
        setErrors({onSave: error.message});
      });
    }

    return (<CourseForm course={course} errors={errors} authors={authors} onChange={handleChange} onSave={handleSave} />);
  }

CoursesPage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapDispatchToProp = {
  loadCourses,
  loadAuthors,
  saveCourse
}

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(CoursesPage);
