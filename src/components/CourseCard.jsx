import { memo } from "react";
import { Link } from "react-router-dom";

// memo: course rows don't re-render while the user types in the search box
// or the add-course form, unless that specific course changed.
function CourseCard({ course, onDelete }) {
  return (
    <tr>
      <td>{course.code}</td>
      <td><Link to={`/courses/${course.id}`}>{course.name}</Link></td>
      <td>{course.faculty}</td>
      <td>{course.credits}</td>
      <td className="actions">
        <Link className="btn btn-small" to={`/courses/${course.id}`}>View</Link>
        <button className="btn btn-small btn-danger" onClick={() => onDelete(course.id)}>Delete</button>
      </td>
    </tr>
  );
}
export default memo(CourseCard);
