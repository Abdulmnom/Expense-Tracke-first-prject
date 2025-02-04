import mongoose from "mongoose";


interface Transaction {
    _id: mongoose.Schema.Types.ObjectId,
    amount: number,
    userId: mongoose.Schema.Types.ObjectId,
    startDate: Date,
}

const transactionSchema = new mongoose.Schema<Transaction>(
    {
        amount: { type: Number, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, required: true , ref: 'User'  },
        startDate: { type: Date, required: true },
    },
    { timestamps: true }
)


export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);