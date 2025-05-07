import { Prisma, PrismaClient, type SliderItem } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();
  const user = await prisma.user.delete({
    where: { id: 1000 }
  });
}

main().catch(error => {
  console.log("Error faced");
  console.log(error);
});