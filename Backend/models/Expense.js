import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    expenseName: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    description: {
        type: String
    }
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;