import { DataService } from "../dataservice/data.service.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { v4 as uuid } from "uuid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const trainersPath = path.join(__dirname, "..", "data", "trainers.json");

class Trainer {
  constructor(firstName, lastName, email, isCurrentlyTeaching, timeEmployed, coursesFinished) {
    this.id = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.isCurrentlyTeaching = isCurrentlyTeaching;
    this.timeEmployed = timeEmployed;
    this.coursesFinished = coursesFinished;
  }
}

export class TrainerModel {
  // Save Trainers
  static async saveTrainers(data) {
    await DataService.saveJSONFile(trainersPath, data);
  }
  //   1.Get all trainers
  static async getAllTrainers(filters) {
    let trainers = await DataService.readJSONFile(trainersPath);
    if (filters?.firstName) trainers = trainers.find((trainer) => trainer.firstName.toLowerCase() === filters.firstName.toLowerCase());
    if (filters?.coursesFinished) {
      trainers = trainers.sort((trainer1, trainer2) => {
        if (filters.coursesFinished === "asc") return trainer1.coursesFinished - trainer2.coursesFinished;
        if (filters.coursesFinished === "desc") return trainer2.coursesFinished - trainer1.coursesFinished;
      });
    }
    return trainers;
  }
  //   2. Get trainers by ID
  static async getTrainersByID(trainerID) {
    const trainers = await this.getAllTrainers();
    const foundTrainer = trainers.find((trainer) => trainer.id === trainerID);
    if (!foundTrainer) throw new Error("Trainer not found");
    return foundTrainer;
  }
  //   3.Create trainer
  static async createTrainer(data) {
    const trainers = await this.getAllTrainers();
    const { firstName, lastName, email, isCurrentlyTeaching, timeEmployed, coursesFinished } = data;
    const emailExists = trainers.some((trainer) => trainer.email === email);

    if (emailExists) throw new Error("Email already in use. Please provide new email");
    if (!firstName || !lastName || !email || !isCurrentlyTeaching || !timeEmployed || !coursesFinished) throw new Error("Missing information");

    const newTrainer = new Trainer(firstName, lastName, email, isCurrentlyTeaching, timeEmployed, coursesFinished);
    const arrayWithTheNewTrainer = [...trainers, newTrainer];

    await this.saveTrainers(arrayWithTheNewTrainer);
    return newTrainer;
  }
  //   4.Update trainer
  static async updateTrainer(trainerID, data) {
    const trainers = await this.getAllTrainers();
    const foundTrainer = await this.getTrainersByID(trainerID);
    if (data.id) throw new Error("Invalid input");

    const updatedTrainer = {
      ...foundTrainer,
      ...data,
    };
    const updatedTrainerArray = trainers.map((trainer) => {
      if (trainer.id === trainerID) return updatedTrainer;
      return trainer;
    });
    await this.saveTrainers(updatedTrainerArray);
    return updatedTrainer;
  }
  static async deleteTrainerByID(trainerID) {
    const trainers = await this.getAllTrainers();
    const arrayMinusDeletedTrainer = trainers.filter((trainer) => trainer.id !== trainerID);
    console.log(arrayMinusDeletedTrainer);
    if (trainers.length === arrayMinusDeletedTrainer.length) throw new Error("Invalid trainer ID");
    if (trainers.length !== arrayMinusDeletedTrainer.length) `The trainer with the ID ${trainerID} has been deleted!!!`;
    await this.saveTrainers(arrayMinusDeletedTrainer);
    return arrayMinusDeletedTrainer;
  }
  static async deleteAllTrainers() {
    await this.saveTrainers([]);
  }
}
