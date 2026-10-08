import { useState, useMemo, useCallback } from "react";
import StudentForm from "../components/StudentForm.jsx";
import StudentCard from "../components/StudentCard.jsx";

export default function Students({ students, courses, onSave, onDelete }) {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");

  // useMemo: filtering runs only when the list, search or filter changes.
  const visible = useMemo(() => {
    const q = search.toLowerCase();
    return students.filter(
      (s) =>
        (courseFilter === "All" || s.course === courseFilter) &&
        (s.name.toLowerCase().includes(q) || s.enrollment.includes(q))
    );
  }, [students, search, courseFilter]);

  const handleSave = (data) => {
    onSave(data);
    setMessage(data.id ? "Student updated." : "Student added.");
    setEditing(null);
  };
  const handleDelete = useCallback((id) => {
    if (window.confirm("Delete this student?")) {
      onDelete(id);
      setMessage("Student deleted.");
    }
  }, [onDelete]);
  const handleEdit = useCallback((s) => { setEditing(s); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <section>
      <h1>Students</h1>
      {message && <p className="alert alert-success">{message}</p>}
      <StudentForm key={editing ? editing.id : "new"} editing={editing} courses={courses}
        onSave={handleSave} onCancel={() => setEditing(null)} />

      <div className="toolbar">
        <input placeholder="Search by name or enrollment" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
          <option value="All">All courses</option>
          {courses.map((c) => <option key={c.id} value={c.code}>{c.code}</option>)}
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="alert alert-info">No students match your search.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Enrollment</th><th>Name</th><th>Course</th><th>Sem</th><th>Attendance</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {visible.map((s) => (
                <StudentCard key={s.id} student={s} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
