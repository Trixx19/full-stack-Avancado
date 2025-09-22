/*
  Warnings:

  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `clienteId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendedorId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendedorId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."PerfilUsuario" AS ENUM ('CLIENTE', 'VENDEDOR');

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropIndex
DROP INDEX "public"."Order_userId_idx";

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "userId",
ADD COLUMN     "clienteId" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'CONCLUIDA',
ADD COLUMN     "vendedorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "description" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "vendedorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "role",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "perfil" "public"."PerfilUsuario" NOT NULL DEFAULT 'CLIENTE';

-- DropEnum
DROP TYPE "public"."Role";

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_vendedorId_fkey" FOREIGN KEY ("vendedorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_vendedorId_fkey" FOREIGN KEY ("vendedorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
