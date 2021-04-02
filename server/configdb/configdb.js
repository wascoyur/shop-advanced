import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// console.log('dbjs-process.env.MONGO_URI', process.env.MONGO_URI);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`Connect to Db: ${conn.connection.host}`.blue.bold);
  } catch (e) {
    console.log(`Error: ${e.message}`.redbold);
    process.exit(1);
  }
};
export default connectDB;
