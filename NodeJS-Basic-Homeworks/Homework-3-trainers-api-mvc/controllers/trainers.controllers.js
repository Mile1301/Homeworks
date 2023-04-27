import { TrainerModel } from "../models/trainers.models.js";

export class TrainerController {
  static async getAllTrainers(req, res) {
    try {
      const filters = req.query;
      const trainers = await TrainerModel.getAllTrainers(filters);
      res.status(200).json(trainers);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
  static async getTrainerByID(req, res) {
    try {
      const { id: trainerID } = req.params;
      const foundTrainer = await TrainerModel.getTrainersByID(trainerID);
      res.status(200).json(foundTrainer);
    } catch (error) {
      console.log(error);
      return res.status(404).send(error.message);
    }
  }
  static async createTrainer(req, res) {
    try {
      const data = req.body;
      const createdTrainer = await TrainerModel.createTrainer(data);
      res.status(201).json(createdTrainer);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }
  static async updateTrainer(req, res) {
    try {
      const { id: trainerID } = req.params;
      const data = req.body;
      const updatedTrainer = await TrainerModel.updateTrainer(trainerID, data);
      return res.status(201).json(updatedTrainer);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }
  static async deleteTrainerByID(req, res) {
    try {
      const { id: trainerID } = req.params;
      const deletedTrainer = await TrainerModel.deleteTrainerByID(trainerID);
      return res.sendStatus(200);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
  static async deleteAllTrainers(req, res) {
    try {
      await TrainerModel.deleteAllTrainers();
      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}
