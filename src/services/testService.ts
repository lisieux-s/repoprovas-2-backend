import testRepository from "../repositories/testRepository.js";

interface Filter {
  groupBy: "disciplines" | "teachers";
}

async function find(filter: Filter) {
  if (filter.groupBy === "disciplines") {
    return testRepository.getTestsByDiscipline();
  } else if (filter.groupBy === "teachers") {
    return testRepository.getTestsByTeachers();
  }
}

async function incrementViews(id: number) {
  const result = await testRepository.findTestById(id);
  if(!result) throw { type: 'not_found' }
  await testRepository.incrementViews(id);
}

export default {
  find,
  incrementViews
};
