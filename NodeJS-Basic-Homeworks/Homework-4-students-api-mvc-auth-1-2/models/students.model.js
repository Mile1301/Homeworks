import { DataService } from "../services/data.service.js";
import { pathBuilder } from "../utils/utils.js";
import { v4 as uuid } from "uuid";
import Joi from "joi";

const studentSchema = Joi.object({
  id: Joi.string(),
  firstName: Joi.string().min(2).max(10).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(18).max(120).required(),
});

const studentsPath = pathBuilder(["..", "/", "data", "students.json"]);

export class StudentsModel {
  // -Save students
  static async saveStudents(data) {
    return await DataService.saveJSONFile(studentsPath, data);
  }

  // 1.Get all students
  static async getAllStudents(filters) {
    let students = await DataService.readJSONFile(studentsPath);
    if (filters?.firstName) students = students.filter((student) => student.firstName.toLowerCase() === filters.firstName.toLowerCase());
    if (filters?.lastName) students = students.filter((student) => student.lastName.toLowerCase() === filters.lastName.toLowerCase());
    if (filters?.age)
      students = students.sort((student1, student2) => {
        if (filters.age === "asc") return student1.age - student2.age;
        if (filters.age === "desc") return student2.age - student1.age;
      });
    return students;
  }

  // 2.Get student by ID
  static async getStudentByID(studentID) {
    const students = await this.getAllStudents();
    const foundStudent = students.find((student) => student.id === studentID);

    if (!foundStudent) throw new Error(`The student with the ID ${studentID} was not found`);

    return foundStudent;
  }

  //3.Create student
  static async createStudent(data) {
    const students = await this.getAllStudents();
    const emailExists = students.some((student) => student.email === data.email);

    if (emailExists) throw new Error("Email already in use. Please provide other valid mail.");

    const validateNewStudent = studentSchema.validate(data);

    if (data.id) throw new Error("Invalid input!!!"); //because im validating ID with Joi (can`t make ID input from Postman now)
    if (validateNewStudent?.error) throw new Error(validateNewStudent.error.details[0].message);

    const newStudent = {
      id: uuid(),
      ...data,
    };

    const arrayWithNewStudent = [...students, newStudent];

    await this.saveStudents(arrayWithNewStudent);
    return newStudent;
  }

  //4.Update student
  static async updateStudent(studentID, data) {
    const students = await this.getAllStudents();
    const foundStudent = await this.getStudentByID(studentID);
    const emailExists = students.some((student) => student.email === data.email);

    if (emailExists) throw new Error("Email already in use. Please provide other valid mail."); // made the same logic here - we can`t have 2 same mails
    if (data.id) throw new Error("Invalid input!!!");

    const updatedStudent = {
      ...foundStudent,
      ...data,
    };
    const validateNewStudent = studentSchema.validate(updatedStudent);
    if (validateNewStudent?.error) throw new Error(validateNewStudent.error.details[0].message);

    const updatedStudentsArray = students.map((student) => (student.id === studentID ? updatedStudent : student));

    await this.saveStudents(updatedStudentsArray);
    return updatedStudent;
  }

  //5.Delete student
  static async deleteStudent(studentID) {
    const students = await this.getAllStudents();
    const deletedStudentArray = students.filter((student) => student.id !== studentID);

    if (students.length === deletedStudentArray.length) throw new Error("Student not found");
    if (students.length !== deletedStudentArray.length) console.log(`The student with the ID ${studentID} has been deleted!!!`);

    await this.saveStudents(deletedStudentArray);
  }

  //6.Delete all students
  static async deleteAllStudents() {
    await this.saveStudents([]);
  }
}
