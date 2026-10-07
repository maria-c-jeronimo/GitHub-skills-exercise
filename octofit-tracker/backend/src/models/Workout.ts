import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    activityType: {
      type: String,
      required: true,
      enum: ['run', 'ride', 'walk', 'strength', 'yoga'],
    },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
