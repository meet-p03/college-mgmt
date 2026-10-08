import { useParams, Link } from "react-router-dom";

export default function CourseDetails({ courses, students }) {
  const { id } = useParams();
  const course = courses.find((c) => c.id === Number(id));

  if (!course) {
    return (
      <>
        <p className="alert alert-danger">Course not found.</p>
        <Link to="/courses">Back to courses</Link>
      </>
    );
  }

  const enrolled = students.filter((s) => s.course === course.code);
  return (
    <section>
      <h1>Course Details</h1>
      <div className="card">
        <p><strong>Code:</strong> {course.code}</p>
        <p><strong>Name:</strong> {course.name}</p>
        <p><strong>Faculty:</strong> {course.faculty}</p>
        <p><strong>Credits:</strong> {course.credits}</p>
        <p><strong>Status:</strong> {course.active ? "Active" : "Inactive"}</p>
        <h3>Enrolled students ({enrolled.length})</h3>
        {enrolled.length === 0 ? (
          <p>No students enrolled.</p>
        ) : (
          <ul>
            {enrolled.map((s) => (
              <li key={s.id}><Link to={`/students/${s.id}`}>{s.name}</Link></li>
            ))}
          </ul>
        )}
      </div>
      <Link className="btn btn-ghost" to="/courses">Back to courses</Link>
    </section>
  );
}
