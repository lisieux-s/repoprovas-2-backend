import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import "express-async-errors";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import router from "./routers/index.js";

import { prisma } from "./database.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandlerMiddleware);


app.get('/dev', async(req, res) => {
  await prisma.teacherDiscipline.create({
    data: {
      teacherId: 2,
      disciplineId: 3
    }
  }
  )
  res.sendStatus(201)
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});