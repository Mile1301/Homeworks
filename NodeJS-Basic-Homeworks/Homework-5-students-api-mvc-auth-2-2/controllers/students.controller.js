import { StudentsModel } from "../models/students.model.js";

export class StudentsController {
  static async getAllStudents(req, res) {
    // const filters = req.query;
    const students = await StudentsModel.getAllStudents();
    return res.status(200).json(students);
  }
  static async getStudentByID(req, res) {
    const { id: studentID } = req.params;
    const foundStudent = await StudentsModel.getStudentsByID(studentID);
    return res.status(200).json(foundStudent);
  }
  static async createStudent(req, res) {
    const data = req.body;
    const createdStudent = await StudentsModel.createStudent(data);
    return res.status(201).json(createdStudent);
  }
  static async updateStudent(req, res) {
    const { id: studentID } = req.params;
    const data = req.body;
    const updatedStudent = await StudentsModel.updateStudent(studentID, data);
    return res.status(201).json(updatedStudent);
  }
  static async deleteStudent(req, res) {
    const { id: studentID } = req.params;
    await StudentsModel.deleteStudent(studentID);
    return res.sendStatus(204);
  }
  static async deleteAllStudents(req, res) {
    await StudentsModel.deleteAllStudents();
    return res.sendStatus(204);
  }
}
