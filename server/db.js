const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://woodsbrandonm:nr25XJ20URqALGvP@cluster0.lbo79r5.mongodb.net/?retryWrites=true&w=majority/pixelhunter');

const pixelSchema = new mongoose.Schema({
  userName: String,
  score: Number,
});

const PixelPlayer = mongoose.model('Pixel Player', pixelSchema);

const getAll = async () => {
  const allScores = await PixelPlayer.find({})
    .sort({ score: -1 })
    .limit(10);
  return allScores;
};

const findAndUpdate = async (player) => {
  const user = await PixelPlayer.findOne({ userName: player.userName });
  if (user) {
    user.score = player.score;
    await user.save();
    return 'new score saved';
  }
  await PixelPlayer.create({ userName: player.userName, score: player.score });
  return 'new player added to leaderboard';
};

module.exports = { findAndUpdate, getAll };
