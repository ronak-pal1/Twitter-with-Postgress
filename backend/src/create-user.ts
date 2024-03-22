import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(info: {
  username: string;
  password: string;
  fullname: string;
  profileURL: string;
  bannerURL: string;
  bio: string;
}) {
  await prisma.users.create({
    data: {
      username: info.username,
      password: info.password,
      profile: {
        create: {
          fullName: info.fullname,
          profileURL: info.profileURL,
          bannerURL: info.bannerURL,
          bio: info.bio,
        },
      },
    },
  });
}

export const createUser = (info: {
  username: string;
  password: string;
  fullname: string;
  profileURL: string;
  bannerURL: string;
  bio: string;
}) => {
  main(info)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
};
