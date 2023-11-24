import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Login from "./pages/Login";
import CourseList from "./pages/CourseList";
import Register from "./pages/Register";
import CoursePage from "./pages/instructor/CoursePage";
import CourseSession from "./pages/student/CourseSession";
import ManageCourse from "./pages/instructor/ManageCourse";
import ManageCourseSession from "./pages/instructor/ManageCourseSession";
import RoleBasedRoute from "./RoleProtectedRoute";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            element={
              <RoleBasedRoute requiredRoles={["student", "instructor"]} />
            }
          >
            <Route path="/" element={<CourseList />} />
          </Route>
          <Route element={<RoleBasedRoute requiredRoles={["student"]} />}>
            <Route path="/cs/:parameter" element={<CourseSession />} />
          </Route>
          <Route element={<RoleBasedRoute requiredRoles={["instructor"]} />}>
            <Route path="/" element={<CourseList />} />
            <Route path="/managecourse" element={<ManageCourse />} />
            <Route path="/mcs/:parameter" element={<ManageCourseSession />} />
            <Route path="/c/:parameter" element={<CoursePage />} />
          </Route>
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
