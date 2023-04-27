import { createStudent, deleteAllStudents, getAllStudents, getStudentByID, saveStudents, updateStudent, deleteStudent } from "../students.js";
import { Router } from "express";
export const studentsRouter = Router();

studentsRouter.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const showStudents = await getAllStudents(filters);
    res.status(200).json(showStudents);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

studentsRouter.get("/:id", async (req, res) => {
  try {
    const { id: studentID } = req.params;
    // console.log(typeof studentID);
    const foundStudent = await getStudentByID(studentID);
    res.status(200).json(foundStudent);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
studentsRouter.patch("/:id", async (req, res) => {
  try {
    const { id: studentID } = req.params;
    const data = req.body;
    if (data.id) throw new Error("Invalid input");
    const updatedStudent = await updateStudent(studentID, data);
    res.status(201).json(updatedStudent);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
studentsRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, gender, city, averageGrade, age } = req.body;
    if (!firstName || !lastName || !email || !gender || !city || !averageGrade || !age) throw new Error("Misiing information");
    const createdStudent = await createStudent(firstName, lastName, email, gender, city, averageGrade, age);
    res.status(201).json(createdStudent);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
studentsRouter.delete("/:id", async (req, res) => {
  try {
    const { id: studentID } = req.params;
    await deleteStudent(studentID);
    res.status(201).json({ msg: `Deleted the student with the ID ${studentID}` });
  } catch (error) {
    res.status(404).send(error.message);
  }
});
studentsRouter.delete("/", async (req, res) => {
  try {
    await deleteAllStudents();
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
});
