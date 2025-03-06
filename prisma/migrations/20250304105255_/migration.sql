/*
  Warnings:

  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `answer` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `submittedAt` on the `QuizAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `dept` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `session` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `QuestionResponse` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `correctAnswer` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quizId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QuestionResponse" DROP CONSTRAINT "QuestionResponse_quizAttemptId_fkey";

-- DropIndex
DROP INDEX "QuizAttempt_studentId_quizId_key";

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
DROP COLUMN "answer",
DROP COLUMN "createdAt",
ADD COLUMN     "correctAnswer" TEXT NOT NULL,
ADD COLUMN     "quizId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Question_id_seq";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "createdAt",
ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 25;

-- AlterTable
ALTER TABLE "QuizAttempt" DROP COLUMN "submittedAt",
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "score" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "dept",
DROP COLUMN "phone",
DROP COLUMN "session";

-- DropTable
DROP TABLE "QuestionResponse";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
