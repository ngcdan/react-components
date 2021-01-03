import React from "react";
import { connect } from 'react-redux';
import { loadCourses } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';

class CoursesPage extends React.Component {
componentDidMount() {
const { loadAuthors, loadCourses } = this.props;
    loadCourses().catch(error => {
      alert("load courses failed." + error);
    });
    loadAuthors().catch(error => {
      alert("load authors failed." + error);
    });
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
      </>
    );
  }
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
