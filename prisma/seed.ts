// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function seedQuiz2() {
//   const quiz = await prisma.quiz.create({
//     data: {
//       title: 'Science and Technology Quiz',
//       questions: {
//         create: [
//           {
//             text: 'What is the speed of light in a vacuum?',
//             options: JSON.stringify(['300,000 km/s', '150,000 km/s', '450,000 km/s', '600,000 km/s']),
//             correctAnswer: '300,000 km/s',
//           },
//           {
//             text: 'What is the atomic number of Carbon?',
//             options: JSON.stringify(['6', '12', '14', '16']),
//             correctAnswer: '6',
//           },
//           {
//             text: 'Which planet is known as the Red Planet?',
//             options: JSON.stringify(['Mars', 'Venus', 'Jupiter', 'Saturn']),
//             correctAnswer: 'Mars',
//           },
//           {
//             text: 'What is the main gas found in the Earth\'s atmosphere?',
//             options: JSON.stringify(['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen']),
//             correctAnswer: 'Nitrogen',
//           },
//           {
//             text: 'Who is known as the father of computers?',
//             options: JSON.stringify(['Charles Babbage', 'Alan Turing', 'Bill Gates', 'Steve Jobs']),
//             correctAnswer: 'Charles Babbage',
//           },
//           {
//             text: 'What is the chemical symbol for Gold?',
//             options: JSON.stringify(['Au', 'Ag', 'Fe', 'Pb']),
//             correctAnswer: 'Au',
//           },
//           {
//             text: 'What is the unit of electrical resistance?',
//             options: JSON.stringify(['Ohm', 'Volt', 'Ampere', 'Watt']),
//             correctAnswer: 'Ohm',
//           },
//           {
//             text: 'Which element is used in making computer chips?',
//             options: JSON.stringify(['Silicon', 'Gold', 'Copper', 'Aluminum']),
//             correctAnswer: 'Silicon',
//           },
//           {
//             text: 'What is the largest organ in the human body?',
//             options: JSON.stringify(['Heart', 'Liver', 'Skin', 'Brain']),
//             correctAnswer: 'Skin',
//           },
//           {
//             text: 'What is the process by which plants make their food?',
//             options: JSON.stringify(['Photosynthesis', 'Respiration', 'Transpiration', 'Fermentation']),
//             correctAnswer: 'Photosynthesis',
//           },
//         ],
//       },
//     },
//   });
//   console.log('Quiz 2 created:', quiz);
// }

// seedQuiz2().then(() => prisma.$disconnect());


// for admin
// import { prisma } from '@/lib/prisma';

// async function main() {
//   await prisma.admin.upsert({
//     where: { id: 'user_2u7Wqmyab5zjJKd9khwqaNM9VDF' }, // Replace with actual Clerk userId
//     update: {},
//     create: {
//       id: 'user_2u7Wqmyab5zjJKd9khwqaNM9VDF',
//       email: 'admin@shibir.com',
//     },
//   });
//   console.log('Admin user created');
// }

// main().catch(console.error).finally(() => prisma.$disconnect());