import { Test } from "@prisma/client";
import testRepository from "../repositories/testRepository.js";

interface Filter {
  groupBy: "disciplines" | "teachers";
}

//export type CreateTestData = Omit<Test, "id">;
export type CreateTestData = {
  name: string
  pdfUrl: string
  categoryId: number
  disciplineId: number
  teacherId: number
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

async function create(createTestData: CreateTestData) {
  testRepository.create(createTestData);
}

export default {
  find,
  incrementViews,
  create
};
