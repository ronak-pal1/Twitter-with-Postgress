import { Prisma, PrismaClient, Users } from "@prisma/client";

const prisma = new PrismaClient();

async function main(username: string) {
  const user: Users | null = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });

  // console.log(user);

  return user;
}

export const getUser = async (username: string) => {
  const user = await main(username)
    .then(async (user) => {
      await prisma.$disconnect();
      return user;
    })
    .catch(async (e) => {
      console.log(e);
      await prisma.$disconnect();
      process.exit(1);
    });

  return user;
};

// getUser("ronakpal1");
