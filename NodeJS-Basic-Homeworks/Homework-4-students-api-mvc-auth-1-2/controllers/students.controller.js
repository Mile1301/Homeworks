import { StudentsModel } from "../models/students.model.js";

export class StudentsController {
  // 1.Get all students
  static async getAllStudents(req, res) {
    const filters = req.query;
    const students = await StudentsModel.getAllStudents(filters);
    return res.status(200).json(students);
  }
  //2.Get student by ID
  static async getStudentByID(req, res) {
    const { id: studentID } = req.params;
    const foundStudent = await StudentsModel.getStudentByID(studentID);
    return res.status(200).json(foundStudent);
  }
  //3.Create student
  static async createStudent(req, res) {
    const data = req.body;
    const newStudent = await StudentsModel.createStudent(data);
    return res.status(201).json(newStudent);
  }
  //4.Update student
  static async updateStudent(req, res) {
    const { id: studentID } = req.params;
    const data = req.body;
    const updatedStudent = await StudentsModel.updateStudent(studentID, data);
    return res.status(201).json(updatedStudent);
  }
  //5.Delete student
  static async deleteStudent(req, res) {
    const { id: studentID } = req.params;
    await StudentsModel.deleteStudent(studentID);
    return res.sendStatus(204);
  }
  //6.Delete all students
  static async deleteAllStudents(req, res) {
    await StudentsModel.deleteAllStudents();
    return res.sendStatus(200);
  }
}
