import { prisma } from "../database.js";

async function getTestsByDiscipline() {
  return prisma.term.findMany({
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function getTestsByTeachers() {
  return prisma.teacherDiscipline.findMany({
    include: {
      teacher: true,
      discipline: true,
      tests: {
        include: {
          category: true,
        },
      },
    },
  });
}

async function findTestById(id: number) {
  return prisma.test.findFirst({
    where: { id }
  })
}

async function incrementViews(id: number) {
  return prisma.test.update({
    where: { id },
    data: { views: {increment: 1} }
  })
}

export default {
  getTestsByDiscipline,
  getTestsByTeachers,
  findTestById,
  incrementViews
};
