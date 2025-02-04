import { NextRequest , NextResponse } from "next/server";

const bcrypt = require('bcryptjs');

import User from "@/app/models/User";

import connectDB from "@/app/libs/connectDB";
import Transaction from "@/app/models/Transaction";


interface Params {
    id: string;
}


interface Body {
    name: string;
    amount: number;
   startDate: Date;
}







export async function GET(request: NextRequest ,{ params}: {params: Params} ) {
  
    try {
        // params it is a string so we need to parse it to a number || let params
        await connectDB();
        const transaction = await Transaction.findById(params.id);
       return NextResponse.json(transaction);

    } catch(error: any) {
        console.error(error);
        return NextResponse.json({ message: "Error connecting to the  get the transaction" }, { status: 500 });
    }
}

// PATCh finction

export async function PATCH(request: NextRequest , { params}: {params: Params} ) {

    try {
        await connectDB();
        const { name , amount , startDate} : Body = await request.json()

        const transaction = await Transaction.findByIdAndUpdate(params.id,
            {
              
                   name,
                    amount,
                    startDate,
                
            },
            {
                new: true,
            }
            
        );
        return NextResponse.json(transaction);

    } catch(error: any) {
        console.error(error);
        return NextResponse.json({ message: "Error connecting to the update the transaction" }, { status: 500 });
    }
}


// DELETE Function

export async function DELETE(request: NextRequest , { params}: {params: Params} ) {

    try {
        await connectDB();
        const transaction = await Transaction.findByIdAndDelete(params.id);
        return NextResponse.json({ message: "Transaction deleted successfully" });

    } catch(error: any) {
        console.error(error);
        return NextResponse.json({ message: "Error connecting to the delete the transaction" }, { status: 500 });
    }
}