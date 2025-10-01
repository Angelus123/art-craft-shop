import { prisma } from "@/lib/prisma";

export async function getCategories() {
  return prisma.category.findMany();
}

export async function createCategory(data: any) {
  return prisma.category.create({ data });
}

export async function updateCategory(id: string, data: any) {
  return prisma.category.update({ where: { id }, data });
}
