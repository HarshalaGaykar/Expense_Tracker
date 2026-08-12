import Expense from "../models/Expense.js";


const createExpense = async (req, res) => {
    try {
        const {
            expenseName,
            amount,
            date,
            description
        } = req.body;

        const expense = new Expense({
            expenseName,
            amount,
            date,
            description
        });

        await expense.save();

        res.status(201).json({
            message: "Expense created successfully",
            expense
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create expense",
            error: error.message
        });
    }
};


const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();

        res.status(200).json(expenses);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch expenses",
            error: error.message
        });
    }
};


const getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findById(
            req.params.id
        );

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json(expense);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch expense",
            error: error.message
        });
    }
};


const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            message: "Expense updated successfully",
            expense
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update expense",
            error: error.message
        });
    }
};


const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(
            req.params.id
        );

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            message: "Expense deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete expense",
            error: error.message
        });
    }
};


export {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
};