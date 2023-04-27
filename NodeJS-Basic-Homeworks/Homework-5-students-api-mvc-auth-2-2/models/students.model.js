import { DataService } from "../services/data.service.js";
import { pathBuilder } from "../utils/utils.js";
import { v4 as uuid } from "uuid";

const studentsPath = pathBuilder(["..", "/", "data", "students.json"]);
export class StudentsModel {
  static async getAllStudents() {
    const students = await DataService.readJSONFile(studentsPath);
    return students;
  }
  static async saveStudents(data) {
    return await DataService.saveJSONFile(studentsPath, data);
  }
  static async getStudentsByID(studentID) {
    const students = await this.getAllStudents();
    const foundStudent = students.find((student) => student.id === studentID);

    if (!foundStudent) throw new Error("student not found");
    return foundStudent;
  }
  static async createStudent(data) {
    const students = await this.getAllStudents();
    const emailExists = students.some((student) => student.email === data.email);
    if (emailExists) throw new Error("Email already in use. Get a new one!!!");
    const newStudent = {
      id: uuid(),
      ...data,
    };
    const arrayWithNewStudent = [...students, newStudent];
    await this.saveStudents(arrayWithNewStudent);
    return newStudent;
  }
  static async updateStudent(studentID, data) {
    const students = await this.getAllStudents();
    const foundStudent = await this.getStudentsByID(studentID);
    const emailExists = students.some((student) => student.email === data.email);
    if (data.id) throw new Error("Invalid input!!!");
    if (emailExists) throw new Error("Email already in use. Get a new one!!!");
    const updatedStudent = {
      ...foundStudent,
      ...data,
    };
    const arrayWithUpdatedStudent = students.map((student) => (student.id === studentID ? updatedStudent : student));
    await this.saveStudents(arrayWithUpdatedStudent);
    return updatedStudent;
  }
  static async deleteStudent(studentID) {
    const students = await this.getAllStudents();
    const deletedStudentsArray = students.filter((student) => student.id !== studentID);
    if (students.length === deletedStudentsArray.length) throw new Error("Student not found");
    await this.saveStudents(deletedStudentsArray);
  }
  static async deleteAllStudents() {
    await this.saveStudents([]);
  }
}
