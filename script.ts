import { PrismaClient } from "@prisma/client";
//const prisma = new PrismaClient({log: ["query"]});
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  const user = await prisma.user.create({
    //when generating new properties and ctrl + space doesn't work -> ctrl + rmk function
    data: {
      name: "Viktor",
      email: "viktor.ladang@student.pxl.be",
      age: 27,
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    /*include: {
      userPreference: true,
    },*/
    select: {
        name: true,
        userPreference: {
            select: {id: true}
        }
    }
  });
  console.log(user);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
