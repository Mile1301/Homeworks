import { DataService } from "./dataservice/data.service.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { v4 as uuid } from "uuid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const studentsPath = path.join(__dirname, "data", "students.json");
export const publicPath = path.join(__dirname, "public");

export const getAllStudents = async (filters) => {
  let students = await DataService.readJSONFile(studentsPath);
  if (filters?.gender) {
    students = students.filter((student) => student.gender.toLowerCase() === filters.gender.toLowerCase());
  }
  if (filters?.age) {
    students = students.sort((student1, student2) => {
      if (filters.age === "asc") return student1.age - student2.age;
      if (filters.age === "desc") return student2.age - student1.age;
    });
  }
  if (filters?.averageGrade) {
    students = students.sort((student1, student2) => {
      if (filters.averageGrade === "asc") return student1.averageGrade - student2.averageGrade;
      if (filters.averageGrade === "desc") return student2.averageGrade - student1.averageGrade;
    });
  }
  return students;
};
export const saveStudents = async (data) => {
  return await DataService.saveJSONFile(studentsPath, data);
};
export const createStudent = async (firstName, lastName, email, gender, city, averageGrade, age) => {
  const students = await getAllStudents();
  const newStudent = {
    id: uuid(),
    firstName,
    lastName,
    email,
    gender,
    city,
    averageGrade,
    age,
  };
  const createdStudent = [...students, newStudent];
  await saveStudents(createdStudent);
  return newStudent;
};
export const getStudentByID = async (studentID) => {
  const students = await getAllStudents();
  const foundStudent = students.find((student) =>
    typeof student.id === "number" ? Number(student.id) === Number(studentID) : student.id === studentID
  );
  if (!foundStudent) throw new Error("Student not found");
  //   console.log(foundStudent);
  return foundStudent;
};
export const updateStudent = async (studentID, data) => {
  const students = await getAllStudents();
  const foundStudent = await getStudentByID(studentID);
  const updatedStudent = {
    ...foundStudent,
    ...data,
  };
  const updateStudentsArray = students.map((student) => {
    if (typeof student.id === "number" ? Number(student.id) === Number(studentID) : student.id === studentID) return updatedStudent;
    return student;
  });
  await saveStudents(updateStudentsArray);
  return updatedStudent;
};
export const deleteStudent = async (studentID) => {
  const students = await getAllStudents();
  const deletedStudentArray = students.filter((student) => student.id !== studentID);
  if (students.length === deletedStudentArray.length) throw new Error("Student not found");
  if (students.length !== deletedStudentArray.length) console.log(`The sudent with the ID ${studentID} has been deleted!!!`);
  await saveStudents(deletedStudentArray);
  return deletedStudentArray;
};
export const deleteAllStudents = async () => {
  saveStudents([]);
};
const app = async () => {
  //   await createStudent("Borche", "Borisovski", "Male", "Skopje", 5, 30);
  //   await getStudentByID("b4690b28-939d-4f4c-a992-57dc747f5907");
  //   await updateStudent("b4690b28-939d-4f4c-a992-57dc747f5907", { lastName: "Profesorkovski" });
  //   await deleteStudent("b4690b28-939d-4f4c-a992-57dc747f5907");
  //   await deleteAllStudents();
};
// app();
