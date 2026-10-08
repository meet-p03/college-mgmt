import { useParams, Link } from "react-router-dom";
import { getStatus } from "../utils.js";

export default function StudentDetails({ students }) {
  const { id } = useParams();
  const student = students.find((s) => s.id === Number(id));

  if (!student) {
    return (
      <>
        <p className="alert alert-danger">Student not found.</p>
        <Link to="/students">Back to students</Link>
      </>
    );
  }

  const status = getStatus(student.attendance);
  return (
    <section>
      <h1>Student Details</h1>
      <div className="card">
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Enrollment:</strong> {student.enrollment}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Semester:</strong> {student.semester}</p>
        <p><strong>Attendance:</strong> {student.attendance}%</p>
        <p className={`alert alert-${status.type}`}>Status: {status.label}</p>

        <h3>Subjects</h3>
        {student.subjects.length === 0 ? (
          <p>No subject marks added yet.</p>
        ) : (
          <table>
            <tbody>
              {student.subjects.map((sub) => (
                <tr key={sub.name}><td>{sub.name}</td><td>{sub.marks}%</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Link className="btn btn-ghost" to="/students">Back to students</Link>
    </section>
  );
}
