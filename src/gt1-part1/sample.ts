// sample.ts -- provided for GT1 Part 1
// Task: convert to TS (rename sample.ts). Annotate all vars, params, return types
import type { User, Course, ID } from "../types/index";

function getUser(id: ID): User {
  return {
    id: id,
    name: "Juan dela Cruz",
    email: "juan@example.com",
    role: "student",
    isActive: true,
    score: 95.5,
  };
}

// Define a specific type for valid grades
type Grade = "A" | "B" | "C" | "F";

// Added ': Grade' return type (in place of string)
function calculateGrade(score: number, maxScore: number): Grade {
  // Added ': number' variable annotation
  const percentage: number = (score / maxScore) * 100;

  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  return "F";
}

// Added ': string' return type
function formatCourse(course: Course): string {
  return `${course.title} (${course.units} units) - ${course.semester}`;
}

const myCourse: Course = {
  code: "ITELECT4",
  title: "IT Elective 4",
  units: 3,
  semester: "1st Semester"
};

// Added ': User' variable annotation
const user: User = getUser(1);

console.log(user);
console.log(calculateGrade(85, 100));
console.log(formatCourse(myCourse));