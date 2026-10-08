// Attendance rules from the assignment
export function getStatus(attendance) {
  if (attendance < 60) return { label: "Detained", type: "danger" };
  if (attendance < 75) return { label: "Warning", type: "warning" };
  return { label: "Eligible", type: "success" };
}
