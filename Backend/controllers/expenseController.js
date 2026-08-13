import Expense from "../models/Expense.js";


const createExpense = async (req, res) => {
    try {
        const {
            userId,
            expenseName,
            amount,
            date,
            description
        } = req.body;

        // Validation 4: Data Type and Boundary Check
        const expenseAmount = Number(amount);
        if (isNaN(expenseAmount) || expenseAmount <= 0) {
            return res.status(400).json({
                message: "Expense amount must be a positive number greater than 0"
            });
        }

        const expense = new Expense({
            userId,
            expenseName,
            amount: expenseAmount,
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
        const { userId } = req.query;
        let query = {};
        if (userId) {
            query.userId = userId;
        }
        
        const expenses = await Expense.find(query);

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