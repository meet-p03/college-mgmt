import { useState, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Students from "./pages/Students.jsx";
import StudentDetails from "./pages/StudentDetails.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";

const initialStudents = [
  { id: 1, name: "Meet Patel", enrollment: "219", email: "meet@gsfc.edu", course: "BCS101", semester: 5, gender: "Male", attendance: 60,
    subjects: [{ name: "Web Technology", marks: 85 }, { name: "DBMS", marks: 90 }, { name: "AI", marks: 78 }] },
  { id: 2, name: "sanny", enrollment: "333", email: "sanny@gsfc.edu", course: "BCS102", semester: 5, gender: "Female", attendance: 85,
    subjects: [{ name: "Web Technology", marks: 60 }, { name: "DBMS", marks: 65 }, { name: "AI", marks: 55 }] },
  { id: 3, name: "Man Patel", enrollment: "101", email: "man@gsfc.edu", course: "BCS103", semester: 5, gender: "Male", attendance: 72,
    subjects: [{ name: "Web Technology", marks: 99  }, { name: "DBMS", marks: 88 }, { name: "AI", marks: 81 }] }
];

const initialCourses = [
  { id: 1, code: "BCS101", name: "Web Tech", faculty: "Dr. A", credits: 4, active: true },
  { id: 2, code: "BCS102", name: "DBMS", faculty: "Dr. B", credits: 4, active: true },
  { id: 3, code: "BCS103", name: "AI", faculty: "Dr. C", credits: 3, active: false },
];

export default function App() {
  const [students, setStudents] = useState(initialStudents);
  const [courses, setCourses] = useState(initialCourses);

  // useCallback keeps the same function reference between renders,
  // so React.memo on StudentCard / CourseCard actually works.
  const saveStudent = useCallback((s) => {
    setStudents((prev) =>
      s.id ? prev.map((x) => (x.id === s.id ? { ...x, ...s } : x))
           : [...prev, { ...s, id: Date.now(), subjects: [] }]
    );
  }, []);
  const deleteStudent = useCallback((id) => setStudents((p) => p.filter((s) => s.id !== id)), []);
  const addCourse = useCallback((c) => setCourses((p) => [...p, { ...c, id: Date.now(), active: true }]), []);
  const deleteCourse = useCallback((id) => setCourses((p) => p.filter((c) => c.id !== id)), []);

  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard students={students} courses={courses} />} />
          <Route path="/students" element={<Students students={students} courses={courses} onSave={saveStudent} onDelete={deleteStudent} />} />
          <Route path="/students/:id" element={<StudentDetails students={students} />} />
          <Route path="/courses" element={<Courses courses={courses} onAdd={addCourse} onDelete={deleteCourse} />} />
          <Route path="/courses/:id" element={<CourseDetails courses={courses} students={students} />} />
          <Route path="*" element={<p className="alert alert-danger">Page not found.</p>} />
        </Routes>
      </main>
    </>
  );
}
