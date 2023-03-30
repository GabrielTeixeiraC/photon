import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const firstUserId = '0730ffac-d039-4194-9571-01aa2aa0efbd'

const secondUserId = '00880d75-a933-4fef-94ab-e05744435297'

async function run() {
  await prisma.user.deleteMany();

  /**
   * Create user
   */
  await Promise.all([
    prisma.user.create({
      data: {
        id: firstUserId,
        name: 'Gabriel Lima Barros',
        email: 'lima@gmail.com',
        password: '123Seguro&',
      }
    }),

    prisma.user.create({
      data: {
        id: secondUserId,
        name: 'Gabriel Teixeira Carvalho',
        email: 'teixeira@gmail.com',
        password: '123Seguro&',
      }
    })
  ]);
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })