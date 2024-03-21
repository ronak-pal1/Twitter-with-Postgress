import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(username: string) {
  const profile = await prisma.users.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
      profile: {
        select: {
          fullName: true,
          profileURL: true,
        },
      },
    },
  });

  return profile;
}

export const getProfile = async (username: string) => {
  const profile = await main(username)
    .then(async (profile) => {
      await prisma.$disconnect();

      return profile;
    })
    .catch(async (e) => {
      console.log(e);
      await prisma.$disconnect();
      process.exit(1);
    });

  return profile;
};
