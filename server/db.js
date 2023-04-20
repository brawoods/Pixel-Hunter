import mongoose from 'mongoose';

mongoose.connect('mongod://1270.0.1/pixelhunter');

const pixelSchema = new mongoose.Schema({
  userName: String,
  highScore: Number,
});

const PixelPlayer = mongoose.model('Pixel Player', pixelSchema);
