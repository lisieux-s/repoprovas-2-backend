import { prisma } from "../database.js";
import { CreateTestData } from '../services/testService.js'

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
    data: { views: { increment: 1 } }
  })
}

async function create(createTestData: CreateTestData) {
  console.log(createTestData)
  const teacherDisciplineResult : any = await prisma.teacherDiscipline.findFirst({
    where: {
      teacherId: createTestData.teacherId,
      disciplineId: createTestData.disciplineId
    } 
  })
  console.log(teacherDisciplineResult)
  if(!createTestData) return;
  if(!teacherDisciplineResult) return;

  //  await prisma.test.create({
  //   data: {
  //     name: createTestData.name,
  //     pdfUrl: createTestData.pdfUrl,
  //     teacherDisciplineId: teacherDisciplineResult.id,
  //     views: 0
  //   }
  // })
}


export default {
  getTestsByDiscipline,
  getTestsByTeachers,
  findTestById,
  incrementViews,
  create
};
