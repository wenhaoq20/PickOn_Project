import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import CourseList from "./pages/CourseList";
import Register from "./pages/Register";
import Course from "./pages/student/Course";
import CourseSession from "./pages/student/CourseSession";
import CreateCourse from "./pages/instructor/CreateCourse";
import ManageCourse from "./pages/instructor/ManageCourse";
import ManageCourseSession from "./pages/instructor/ManageCourseSession";
import ProtectedRoute from "./ProtectedRoutes";
import { AuthProvider } from "./AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<CourseList />} />
            <Route path="/register" element={<Register />} />
            <Route path="/course" element={<Course />} />
            <Route path="/createcourse" element={<CreateCourse />} />
            <Route path="/coursesession" element={<CourseSession />} />
            <Route path="/managecourse" element={<ManageCourse />} />
            <Route
              path="/managecoursesession"
              element={<ManageCourseSession />}
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
