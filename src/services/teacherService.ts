import teacherRepository from "../repositories/teacherRepository.js";

async function findByDiscipline(id: number) {
  return teacherRepository.findByDiscipline(id);
}

async function findMany() {
  return teacherRepository.findMany();
}

export default {
  findByDiscipline,
  findMany
};
