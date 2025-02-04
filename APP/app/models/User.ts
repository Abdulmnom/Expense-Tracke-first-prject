import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// تعريف المخطط
const userSchema: Schema<IUser> = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true, // إزالة الفراغات الزائدة
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, 
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // التحقق من صيغة البريد الإلكتروني
    },
    password: {
      type: String,
      required: [true, "Password is required"], 
      minlength: [6, "Password must be at least 6 characters long"], 
    },
  },
  { timestamps: true } 

)
export default mongoose.models.User || mongoose.model("User", userSchema);
