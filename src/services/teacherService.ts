import teacherRepository from "../repositories/teacherRepository.js";

async function findByDiscipline(id: number) {
  return teacherRepository.findByDiscipline(id);
}

export default {
  findByDiscipline,
};
