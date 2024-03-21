import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(tweetText: string, userId: number) {
  const tweet = await prisma.tweets.create({
    data: {
      likes: 0,
      tweet: tweetText,
      userId: userId,
    },
  });

  return tweet;
}

export const createTweet = async ({
  tweetText,
  userId,
}: {
  tweetText: string;
  userId: number;
}) => {
  const tweet = await main(tweetText, userId)
    .then(async (tweet) => {
      await prisma.$disconnect();

      return tweet;
    })
    .catch(async (e) => {
      console.log(e);

      await prisma.$disconnect();

      process.exit(1);
    });

  return tweet;
};
