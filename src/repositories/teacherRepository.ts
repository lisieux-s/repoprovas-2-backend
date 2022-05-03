import { prisma } from "../database.js";

async function findByDiscipline(id: number) {
    return prisma.teacherDiscipline.findMany({
        where: { id },
        include: {
            teacher: true
        }
    })
  }
  
  export default {
    findByDiscipline,
  };
  