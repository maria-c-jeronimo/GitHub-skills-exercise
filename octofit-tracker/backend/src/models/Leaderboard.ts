import { model, Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    period: { type: String, required: true, enum: ['weekly', 'monthly', 'all-time'] },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

leaderboardSchema.index({ period: 1, rank: 1 });

export default model('Leaderboard', leaderboardSchema);
