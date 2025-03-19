import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

// Remove TypeScript declarations and use standard JS
const prisma = global.prismaGlobal || prismaClientSingleton()

export default prisma

// Store the instance on global object in non-production environments
if (process.env.NODE_ENV !== 'production') global.prismaGlobal = prisma
