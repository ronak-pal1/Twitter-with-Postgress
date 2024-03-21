import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(skip: number, take: number) {
  const tweets = await prisma.tweets.findMany({
    skip: skip,
    take: take,
    include: {
      user: {
        select: {
          username: true,
          profile: {
            select: {
              fullName: true,
              profileURL: true,
              id: true,
            },
          },
        },
      },
    },

    orderBy: {
      id: "desc",
    },
  });

  // console.log(tweets);

  return tweets;
}

export const getTweets = async (skip: number, take: number) => {
  const tweets = await main(skip, take)
    .then(async (tweets) => {
      await prisma.$disconnect();

      return tweets;
    })
    .catch(async (e) => {
      console.log(e);

      await prisma.$disconnect();

      process.exit(1);
    });

  return tweets;
};
