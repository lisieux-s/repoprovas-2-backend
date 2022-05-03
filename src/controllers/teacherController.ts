import { Request, Response } from "express";
import teacherService from "../services/teacherService.js";

async function findMany(req: Request, res: Response) {
    const { id } = req.params;
  const teachers = await teacherService.findByDiscipline(parseInt(id));
  res.send({ teachers });
}

export default {
  findMany,
};
