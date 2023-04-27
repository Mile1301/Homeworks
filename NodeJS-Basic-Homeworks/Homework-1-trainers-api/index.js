import express from "express";
import { addTrainer, deleteAllTrainers, deleteTrainer, getAllTrainers, getTrainerById, saveTrainers, updateTrainer, publicPath } from "./trainers.js";
const app = express();
app.use(express.json());
app.use("/home", express.static(publicPath));

// 1. Get all trainers.
app.get("/trainers", async (req, res) => {
  try {
    const trainers = await getAllTrainers();
    const { isCurrentlyTeaching, sortBy } = req.query;
    if (isCurrentlyTeaching === "true") {
      const activeTrainers = trainers.filter((trainer) => trainer.isCurrentlyTeaching);
      return res.status(200).json(activeTrainers);
    }
    if (isCurrentlyTeaching === "false") {
      const passiveTrainers = trainers.filter((trainer) => !trainer.isCurrentlyTeaching);
      return res.status(200).json(passiveTrainers);
    }
    if (sortBy === "coursesAsc") {
      const ascTrainers = trainers.sort((trainer1, trainer2) => trainer1.coursesFinished - trainer2.coursesFinished);
      return res.status(200).json(ascTrainers);
    }
    if (sortBy === "coursesDesc") {
      const descTrainers = trainers.sort((trainer1, trainer2) => trainer2.coursesFinished - trainer1.coursesFinished);
      return res.status(200).json(descTrainers);
    }
    return res.status(200).json(trainers);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// 2. Get trainer by id.
app.get("/trainers/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;
    const foundTrainer = await getTrainerById(trainerId);
    res.status(200).json(foundTrainer);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// 3. Update Trainer Info.
app.patch("/trainers/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;
    const updatedTrainer = req.body;
    if (updatedTrainer.id) throw new Error("Invalid input");
    const updateSingleTrainer = await updateTrainer(trainerId, updatedTrainer);
    res.status(201).json(updateSingleTrainer);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// 4. Add a trainer.
app.post("/trainers", async (req, res) => {
  try {
    const { firstName, lastName, email, isCurrentlyTeaching, timeEmployed, coursesFinished } = req.body;
    if (!firstName || !lastName || !email || !isCurrentlyTeaching || !timeEmployed || !coursesFinished) throw new Error("Please enter all inputs");
    const newTrainer = await addTrainer(firstName, lastName, email, isCurrentlyTeaching, timeEmployed, coursesFinished);
    res.status(201).json(newTrainer);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// 5. Delete trainer.
app.delete("/trainers/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;
    await deleteTrainer(trainerId);
    res.status(201).json({ msg: `The trainer with the ID ${trainerId} has been deleted!!!` });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// 6. Delete all trainers.
app.delete("/trainers", async (req, res) => {
  try {
    await deleteAllTrainers();
    res.status(201).json({ msg: `All trainers have been deleted!!!` });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// 7.Search trainers currently teaching
// app.get("/trainers", (req, res) => {

// });

const PORT = process.env.PORT || 5050;
const HOST = process.env.HOST || "0.0.0.0";
app.listen(PORT, HOST, () => console.log(`Listening on http://localhost:${PORT}`));
