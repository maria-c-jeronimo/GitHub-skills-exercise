import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';
import { connectDatabase } from '../config/database';

// Seed the octofit_db database with test data
async function seedDatabase() {
  const users = [
    new mongoose.Types.ObjectId('650000000000000000000001'),
    new mongoose.Types.ObjectId('650000000000000000000002'),
    new mongoose.Types.ObjectId('650000000000000000000003'),
  ];
  const teams = [
    new mongoose.Types.ObjectId('660000000000000000000001'),
    new mongoose.Types.ObjectId('660000000000000000000002'),
  ];
  const activities = [
    new mongoose.Types.ObjectId('670000000000000000000001'),
    new mongoose.Types.ObjectId('670000000000000000000002'),
    new mongoose.Types.ObjectId('670000000000000000000003'),
    new mongoose.Types.ObjectId('670000000000000000000004'),
  ];
  const leaderboardEntries = [
    new mongoose.Types.ObjectId('680000000000000000000001'),
    new mongoose.Types.ObjectId('680000000000000000000002'),
    new mongoose.Types.ObjectId('680000000000000000000003'),
    new mongoose.Types.ObjectId('680000000000000000000004'),
    new mongoose.Types.ObjectId('680000000000000000000005'),
  ];
  const workouts = [
    new mongoose.Types.ObjectId('690000000000000000000001'),
    new mongoose.Types.ObjectId('690000000000000000000002'),
    new mongoose.Types.ObjectId('690000000000000000000003'),
  ];

  try {
    await connectDatabase();

    await Promise.all([
      User.deleteMany({ _id: { $in: users } }),
      Team.deleteMany({ _id: { $in: teams } }),
      Activity.deleteMany({ _id: { $in: activities } }),
      Leaderboard.deleteMany({ _id: { $in: leaderboardEntries } }),
      Workout.deleteMany({ _id: { $in: workouts } }),
    ]);

    await Team.insertMany([
      {
        _id: teams[0],
        name: 'Trail Blazers',
        description: 'Outdoor runners who make every mile count.',
        members: [users[0], users[1]],
        totalPoints: 285,
      },
      {
        _id: teams[1],
        name: 'Core Crushers',
        description: 'A balanced crew focused on strength and consistency.',
        members: [users[2]],
        totalPoints: 160,
      },
    ]);

    await User.insertMany([
      {
        _id: users[0],
        username: 'maya.moves',
        email: 'maya@example.com',
        displayName: 'Maya Chen',
        team: teams[0],
        totalPoints: 175,
      },
      {
        _id: users[1],
        username: 'liam.runs',
        email: 'liam@example.com',
        displayName: 'Liam Patel',
        team: teams[0],
        totalPoints: 110,
      },
      {
        _id: users[2],
        username: 'zoe.strong',
        email: 'zoe@example.com',
        displayName: 'Zoe Rivera',
        team: teams[1],
        totalPoints: 160,
      },
    ]);

    await Activity.insertMany([
      {
        _id: activities[0],
        user: users[0],
        activityType: 'run',
        durationMinutes: 38,
        distanceKm: 6.2,
        points: 75,
        completedAt: new Date('2026-10-05T07:30:00Z'),
      },
      {
        _id: activities[1],
        user: users[1],
        activityType: 'ride',
        durationMinutes: 52,
        distanceKm: 18.4,
        points: 60,
        completedAt: new Date('2026-10-04T09:00:00Z'),
      },
      {
        _id: activities[2],
        user: users[2],
        activityType: 'strength',
        durationMinutes: 45,
        points: 80,
        completedAt: new Date('2026-10-05T17:15:00Z'),
      },
      {
        _id: activities[3],
        user: users[0],
        activityType: 'yoga',
        durationMinutes: 30,
        points: 40,
        completedAt: new Date('2026-10-03T18:00:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        _id: leaderboardEntries[0],
        period: 'weekly',
        user: users[0],
        points: 175,
        rank: 1,
      },
      {
        _id: leaderboardEntries[1],
        period: 'weekly',
        user: users[2],
        points: 160,
        rank: 2,
      },
      {
        _id: leaderboardEntries[2],
        period: 'weekly',
        user: users[1],
        points: 110,
        rank: 3,
      },
      {
        _id: leaderboardEntries[3],
        period: 'weekly',
        team: teams[0],
        points: 285,
        rank: 1,
      },
      {
        _id: leaderboardEntries[4],
        period: 'weekly',
        team: teams[1],
        points: 160,
        rank: 2,
      },
    ]);

    await Workout.insertMany([
      {
        _id: workouts[0],
        name: 'Steady 5K Builder',
        activityType: 'run',
        difficulty: 'beginner',
        durationMinutes: 35,
        description: 'Build an aerobic base with an easy warm-up, steady run, and cool-down.',
      },
      {
        _id: workouts[1],
        name: 'Full-Body Strength Circuit',
        activityType: 'strength',
        difficulty: 'intermediate',
        durationMinutes: 40,
        description: 'Cycle through squats, push-ups, rows, and core work with controlled rests.',
      },
      {
        _id: workouts[2],
        name: 'Recovery Flow',
        activityType: 'yoga',
        difficulty: 'beginner',
        durationMinutes: 25,
        description: 'A gentle mobility sequence for hips, hamstrings, shoulders, and back.',
      },
    ]);

    console.log('Database seeding complete');
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error seeding database:', error);
  process.exitCode = 1;
});
