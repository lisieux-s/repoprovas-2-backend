import { prisma } from '../database.js';

async function findByDiscipline(id: number) {
  const teachersDisciplinesResult = await prisma.teacherDiscipline.findMany({
    where: { id },
  });
  const teacherIds = [];
  teachersDisciplinesResult.forEach(teacherDiscipline => {
    teacherIds.push(teacherDiscipline.id)
  })
  const allTeachers = await findMany();
  const filteredTeachers = [];

  allTeachers.map((teacher) => {
    if(teacherIds.includes(teacher.id)) {
      filteredTeachers.push(teacher)
    }
  })

  return(filteredTeachers)
}

async function findMany() {
  return await prisma.teacher.findMany();
}

export default {
  findByDiscipline,
  findMany
};
