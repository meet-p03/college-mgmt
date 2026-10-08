import { memo } from "react";
import { Link } from "react-router-dom";
import { getStatus } from "../utils.js";

// React.memo: a row only re-renders when ITS props change, not every time
// the search box or the form in the parent page re-renders the whole list.
function StudentCard({ student, onEdit, onDelete }) {
  const status = getStatus(student.attendance);
  return (
    <tr>
      <td>{student.enrollment}</td>
      <td><Link to={`/students/${student.id}`}>{student.name}</Link></td>
      <td>{student.course}</td>
      <td>{student.semester}</td>
      <td>{student.attendance}%</td>
      <td><span className={`badge badge-${status.type}`}>{status.label}</span></td>
      <td className="actions">
        <button className="btn btn-small" onClick={() => onEdit(student)}>Edit</button>
        <button className="btn btn-small btn-danger" onClick={() => onDelete(student.id)}>Delete</button>
      </td>
    </tr>
  );
}
export default memo(StudentCard);
