const { sequelize, Client, Appointment } = require('../models');
const connectDB = require('../config/database');
const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

const consultations = [
  { id: 1, name: "Career consultation", topic: "CV review", time: "10:00" },
  { id: 2, name: "Study consultation", topic: "Exam preparation", time: "12:00" }
];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "html", "index.html"));
});

app.get("/consultations", (req, res) => {
  res.json(consultations);
});

app.post("/consultations", (req, res) => {
  const newConsultation = req.body;
  consultations.push(newConsultation);
  res.status(201).json(newConsultation);
});

app.put("/consultations/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = consultations.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Consultation not found" });
  }

  consultations[index] = { ...consultations[index], ...req.body };
  res.json(consultations[index]);
});

app.delete("/consultations/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = consultations.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Consultation not found" });
  }

  const deleted = consultations.splice(index, 1);
  res.json(deleted[0]);
});

sequelize.sync()
  .then(() => {
    console.log('Sequelize synced');
  })
  .catch((error) => {
    console.error('Sequelize error:', error);
  });

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});