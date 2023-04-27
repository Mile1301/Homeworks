import { DataService } from "./services/data.service.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { v4 as uuid } from "uuid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const trainersPath = path.join(__dirname, "data", "trainers.json");
export const publicPath = path.join(__dirname, "public");

// 1. Get all trainers
export const getAllTrainers = async () => {
  return await DataService.readJSONFile(trainersPath);
};
// --Save trainers
export const saveTrainers = async (data) => {
  return await DataService.saveJSONFile(trainersPath, data);
};
// 2. Get trainer by id
export const getTrainerById = async (trainerId) => {
  const trainers = await getAllTrainers();
  const foundTrainer = trainers.find((trainer) => trainer.id === trainerId);
  //   console.log(foundTrainer);
  if (!foundTrainer) throw new Error("Trainer not found");
  return foundTrainer;
};
// 3. Update Trainer Info.
export const updateTrainer = async (trainerId, dataToUpdate) => {
  try {
    //how to validate error from bad syntax - SyntaxError: Unexpected token [ in JSON at position -
    const trainers = await getAllTrainers();
    const foundTrainer = await getTrainerById(trainerId);
    const updatedTrainer = {
      ...foundTrainer,
      ...dataToUpdate,
    };
    const updatedTrainersArray = trainers.map((trainer) => {
      if (trainer.id === updatedTrainer.id) return updatedTrainer;
      return trainer;
    });
    await saveTrainers(updatedTrainersArray);
    return updatedTrainer;
  } catch (error) {
    console.error(error.message);
  }
};
// 4. Add a trainer.
export const addTrainer = async (firstName, lastName, email, isCurrentlyTeaching, timeEmployed, coursesFinished) => {
  const trainers = await getAllTrainers();
  const newTrainer = {
    id: uuid(),
    firstName,
    lastName,
    email,
    isCurrentlyTeaching,
    timeEmployed,
    coursesFinished,
  };
  const createdTrainer = [...trainers, newTrainer];
  await saveTrainers(createdTrainer);
  return newTrainer;
};
// 5. Delete trainer.
export const deleteTrainer = async (trainerId) => {
  try {
    const trainers = await getAllTrainers();
    const deletedTrainersArray = trainers.filter((trainer) => trainer.id !== trainerId);
    if (trainers.length === deletedTrainersArray.length) throw new Error("Trainer not found");
    if (trainers.length !== deletedTrainersArray.length) console.log(`Trainer with the ID ${trainerId} has been deleted!!!`);
    await saveTrainers(deletedTrainersArray);
  } catch (error) {
    console.error(error.message);
  }
};
// 6. Delete all trainers.
export const deleteAllTrainers = async () => {
  await saveTrainers([]);
};
const app = async () => {
  await addTrainer("Borche", "Borisovski", "borche@gmail.com", true, "2 years", 10);
  await addTrainer("Ivan", "Lazarevski", "ivan@gmail.com", false, "3 years", 15);
  await addTrainer("Bojan", "Damchevski", "bojan@gmail.com", true, "1 years", 5);
  await addTrainer("Risto", "Panchevski", "risto@gmail.com", true, "6 years", 30);
  await addTrainer("Petre", "Arsovski", "petre@gmail.com", false, "2 years", 10);
  await addTrainer("Ilija", "Mitev", "ilija@gmail.com", false, "6 months", 3);
  //   await updateTrainer("trainer ID here", { lastName: "actual last name here" });
  //   await updateTrainer("trainer ID here", { email: "<state name here>@gmail.com" });
  //   await updateTrainer("trainer ID here", { coursesFinished: state number here });
  //   await getTrainerById("trainer ID here");
  //   await deleteTrainer("trainer ID here");
  //   await deleteAllTrainers();
};
// app();
