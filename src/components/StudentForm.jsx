import { useState } from "react";

const empty = { name: "", enrollment: "", email: "", course: "", semester: "", gender: "Male", attendance: "" };

export default function StudentForm({ editing, courses, onSave, onCancel }) {
  const [form, setForm] = useState(editing || { ...empty, course: courses[0]?.code || "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!/^\d+$/.test(form.enrollment)) err.enrollment = "Enrollment must be numeric";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email";
    if (!(form.semester >= 1 && form.semester <= 8)) err.semester = "Semester must be 1-8";
    if (!(form.attendance >= 0 && form.attendance <= 100 && form.attendance !== "")) err.attendance = "Attendance must be 0-100";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;
    onSave({ ...form, semester: Number(form.semester), attendance: Number(form.attendance) });
    if (!editing) setForm({ ...empty, course: courses[0]?.code || "" });
  };

  const field = (label, name, type = "text") => (
    <label>
      {label}
      <input type={type} name={name} value={form[name]} onChange={handleChange} />
      {errors[name] && <small className="error">{errors[name]}</small>}
    </label>
  );

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h3>{editing ? "Edit student" : "Add student"}</h3>
      <div className="grid">
        {field("Student name", "name")}
        {field("Enrollment number", "enrollment")}
        {field("Email", "email", "email")}
        <label>
          Course
          <select name="course" value={form.course} onChange={handleChange}>
            {courses.map((c) => <option key={c.id} value={c.code}>{c.code} - {c.name}</option>)}
          </select>
        </label>
        {field("Semester", "semester", "number")}
        <label>
          Gender
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </label>
        {field("Attendance (%)", "attendance", "number")}
      </div>
      <div className="actions">
        <button className="btn" type="submit">{editing ? "Save changes" : "Add student"}</button>
        {editing && <button className="btn btn-ghost" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
