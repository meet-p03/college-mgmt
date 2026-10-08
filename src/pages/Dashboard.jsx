import { useMemo } from "react";
import { Link } from "react-router-dom";
import DashboardCard from "../components/DashboardCard.jsx";

export default function Dashboard({ students, courses }) {
  // useMemo: statistics are recomputed only when students/courses change.
  const stats = useMemo(() => {
    const avg = students.length
      ? Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)
      : 0;
    return {
      totalStudents: students.length,
      totalCourses: courses.length,
      activeCourses: courses.filter((c) => c.active).length,
      avgAttendance: avg,
    };
  }, [students, courses]);

  const recent = students.slice(-3).reverse();

  return (
    <section>
      <h1>College Management System</h1>
      <div className="grid stats">
        <DashboardCard label="Total students" value={stats.totalStudents} />
        <DashboardCard label="Total courses" value={stats.totalCourses} />
        <DashboardCard label="Active courses" value={stats.activeCourses} />
        <DashboardCard label="Average attendance" value={`${stats.avgAttendance}%`} />
      </div>
      <h2>Recent students</h2>
      {recent.length === 0 ? (
        <p className="alert alert-info">No students yet. Add one from the Students page.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Enrollment</th><th>Name</th><th>Course</th><th>Semester</th></tr></thead>
            <tbody>
              {recent.map((s) => (
                <tr key={s.id}>
                  <td>{s.enrollment}</td>
                  <td><Link to={`/students/${s.id}`}>{s.name}</Link></td>
                  <td>{s.course}</td>
                  <td>{s.semester}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
