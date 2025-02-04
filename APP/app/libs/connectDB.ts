
import mongoose from'mongoose';

const uri = process.env.MONGODB_URI as string;




// local host mongodb
 //const uri = "mongodb://127.0.0.1:27017/expanse-tracker";



export default async function connectDB() {
    
 return  await mongoose.connect(uri).then(() =>{
    console.log('Connected to MongoDB');

 }).catch((error) => {
    console.error('Error connecting to MongoDB:');
 })
}