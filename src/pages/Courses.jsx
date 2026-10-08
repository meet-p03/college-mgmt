import { useState, useMemo } from "react";
import CourseCard from "../components/CourseCard.jsx";

const blank = { code: "", name: "", faculty: "", credits: "" };

export default function Courses({ courses, onAdd, onDelete }) {
  const [form, setForm] = useState(blank);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [credits, setCredits] = useState("All");

  const visible = useMemo(() => {
    const q = search.toLowerCase();
    return courses.filter(
      (c) =>
        (credits === "All" || c.credits === Number(credits)) &&
        (c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q))
    );
  }, [courses, search, credits]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.code.trim() || !form.name.trim() || !form.faculty.trim() || !(form.credits > 0)) {
      setError("Fill in every field. Credits must be greater than 0.");
      return;
    }
    if (courses.some((c) => c.code.toLowerCase() === form.code.trim().toLowerCase())) {
      setError("That course code already exists.");
      return;
    }
    onAdd({ ...form, code: form.code.trim(), credits: Number(form.credits) });
    setForm(blank);
    setError("");
  };
  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section>
      <h1>Courses</h1>
      <form className="card form" onSubmit={handleSubmit}>
        <h3>Add course</h3>
        {error && <p className="alert alert-danger">{error}</p>}
        <div className="grid">
          <label>Course code<input name="code" value={form.code} onChange={set} /></label>
          <label>Course name<input name="name" value={form.name} onChange={set} /></label>
          <label>Faculty<input name="faculty" value={form.faculty} onChange={set} /></label>
          <label>Credits<input name="credits" type="number" value={form.credits} onChange={set} /></label>
        </div>
        <button className="btn" type="submit">Add course</button>
      </form>

      <div className="toolbar">
        <input placeholder="Search courses" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={credits} onChange={(e) => setCredits(e.target.value)}>
          <option value="All">All credits</option>
          {[...new Set(courses.map((c) => c.credits))].sort().map((c) => (
            <option key={c} value={c}>{c} credits</option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="alert alert-info">No courses found.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Course Code</th><th>Course Name</th><th>Faculty</th><th>Credits</th><th></th></tr></thead>
            <tbody>
              {visible.map((c) => <CourseCard key={c.id} course={c} onDelete={onDelete} />)}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
