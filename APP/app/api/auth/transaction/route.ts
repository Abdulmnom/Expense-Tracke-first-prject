import { NextRequest , NextResponse } from "next/server";

import connectDB from "@/app/libs/connectDB";
import Transaction from "@/app/models/Transaction";

const bcrypt = require('bcryptjs');

interface Body {
    name: string;
    amount: number;
   startDate: Date;
}

export async function GET(request : NextRequest ) {
   
    try {
        connectDB()
        // cookies to get the userId from the cookie
        const userId = request.cookies.get('userId')?.value
        const transaction = await Transaction.find({ userId})
        return NextResponse.json(transaction)

    } catch(error:any){
        console.error(error);
        return NextResponse.json({ message: "welcom in api auth transaction this is error", error }, { status: 500 });
    }
}

export async function POST(request : NextRequest ) {

   try {
    await connectDB()
    const { name , amount , startDate } :  Body = await request.json();

    const userId = request.cookies.get('userId')?.value;

    const transaction = await Transaction.create({  name, amount, startDate, userId, });

    return NextResponse.json(transaction)

   } catch(error:any){
    return NextResponse.json({ message: error.message }, { status: 500 });
   }
} 


export async function DELETE(request: NextRequest) {
    try {
        await connectDB();
        const userId = request.cookies.get("userId")?.value

        // deleteMany All the transaction 
       await Transaction.deleteMany({ userId });

       return NextResponse.json({
        message: "All transactions deleted successfully",
       })

    } catch(error: any) {
        console.error(error);
        return NextResponse.json({ message: "Error connecting to the  Delete the transaction" }, { status: 500 });
    }
}