import mongoose from 'mongoose';

// const uri = process.env.MONGODB_URI as string;

const uri = "mongodb://127.0.0.1:27017/expanse-tracker";


if (!uri) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

export default async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true, // لتفادي تحذيرات Mongoose
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error); // طباعة تفاصيل الخطأ
    process.exit(1); // إنهاء التطبيق إذا لم يتم الاتصال
  }
}
