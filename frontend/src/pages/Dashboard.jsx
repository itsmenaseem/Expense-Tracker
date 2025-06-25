import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Filter, X, LogOut } from "lucide-react";
import { categories } from "@/constants/expenseCategories";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseSummary from "@/components/ExpenseSummary";
import ExpenseCharts from "@/components/ExpenseCharts";
import ExpenseList from "@/components/ExpenseList";
import DateRangePicker from "@/components/DateRangePicker";
import { toast } from "react-toastify";
import { isWithinInterval, parseISO } from "date-fns";
import axios from "axios";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateRange, setDateRange] = useState(undefined);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isEditExpenseOpen, setIsEditExpenseOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const filteredExpenses = expenses.filter((expense) => {
    // Filter by category
    const categoryMatch =
      selectedCategory === "all" || expense.category === selectedCategory;

    // Filter by date range
    let dateMatch = true;
    if (dateRange?.from && dateRange?.to) {
      const expenseDate = parseISO(expense.date);
      dateMatch = isWithinInterval(expenseDate, {
        start: dateRange.from,
        end: dateRange.to,
      });
    }

    return categoryMatch && dateMatch;
  });

  const hasActiveFilters =
    selectedCategory !== "all" || (dateRange?.from && dateRange?.to);

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setDateRange(undefined);
  };

  const handleAddExpense = async (formData) => {
    if (
      !formData.amount ||
      !formData.category ||
      !formData.description ||
      !formData.date
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/expense`,{
        amount:parseFloat(formData.amount),
        category: formData.category,
        description: formData.description,
        date: formData.date,
      },{
        headers:{
          Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hc2VlbUBscHUuaW4iLCJpZCI6IjY4NTk5OGI1OWE3ZTdlODc5MzA5NDA4MSIsImlhdCI6MTc1MDgzMTc2NSwiZXhwIjoxNzUwODMyNjY1fQ.guzFTH6YfXPFwIa_FCVTHyaoaGB3TBT5Z24lcT3R29M`
        }
      })
      const expense = response.data.expense

      setExpenses([...expenses, expense]);
      setIsAddExpenseOpen(false);

      toast({
        title: "Success",
        description: "Expense added successfully",
      });
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setIsEditExpenseOpen(true);
  };

  const handleUpdateExpense = (formData) => {
    if (
      !formData.amount ||
      !formData.category ||
      !formData.description ||
      !formData.date
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const updatedExpenses = expenses.map((expense) =>
      expense._id === editingExpense._id
        ? {
            ...expense,
            amount: parseFloat(formData.amount),
            category: formData.category,
            description: formData.description,
            date: formData.date,
          }
        : expense
    );

    setExpenses(updatedExpenses);
    setEditingExpense(null);
    setIsEditExpenseOpen(false);

    toast({
      title: "Success",
      description: "Expense updated successfully",
    });
  };

  const handleDeleteExpense = async(expenseId) => {
      try {
       const response = await axios.delete(`${import.meta.env.VITE_API_URL}/expense/${expenseId}`,{
          headers:{
            Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hc2VlbUBscHUuaW4iLCJpZCI6IjY4NTk5OGI1OWE3ZTdlODc5MzA5NDA4MSIsImlhdCI6MTc1MDgzMTc2NSwiZXhwIjoxNzUwODMyNjY1fQ.guzFTH6YfXPFwIa_FCVTHyaoaGB3TBT5Z24lcT3R29M'
          }
        })
        toast.success(response.data.message)
          const updatedExpenses = expenses.filter(
        (expense) => expense._id !== expenseId
      );
      setExpenses(updatedExpenses);
      } catch (error) {
        
      }
  };
  async function getExpenses() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/expense`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hc2VlbUBscHUuaW4iLCJpZCI6IjY4NTk5OGI1OWE3ZTdlODc5MzA5NDA4MSIsImlhdCI6MTc1MDgzMTc2NSwiZXhwIjoxNzUwODMyNjY1fQ.guzFTH6YfXPFwIa_FCVTHyaoaGB3TBT5Z24lcT3R29M`,
        },
      });
      setExpenses([...res.data.expenses]);
      console.log(res.data.expenses);
    } catch (error) {}
  }
  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Title and Description */}
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Expense Tracker
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Track and analyze your spending
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              onClick={() => setIsAddExpenseOpen(true)}
              className="w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
            <Button className="w-full sm:w-auto">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Filters:
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <DateRangePicker
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
            </div>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="w-full sm:w-auto"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <ExpenseSummary
          expenses={filteredExpenses}
          selectedCategory={selectedCategory}
        />

        {/* Charts */}
        <ExpenseCharts
          expenses={expenses}
          cat={selectedCategory}
          dateRange={dateRange}
        />

        {/* Recent Expenses */}
        <ExpenseList
          expenses={filteredExpenses}
          selectedCategory={selectedCategory}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />

        {/* Add Expense Form */}
        <ExpenseForm
          isOpen={isAddExpenseOpen}
          onClose={() => setIsAddExpenseOpen(false)}
          onSubmit={handleAddExpense}
        />

        {/* Edit Expense Form */}
        <ExpenseForm
          isOpen={isEditExpenseOpen}
          onClose={() => setIsEditExpenseOpen(false)}
          onSubmit={handleUpdateExpense}
          initialData={editingExpense}
          title="Edit Expense"
          description="Update the details of your expense"
        />
      </div>
    </div>
  );
};

export default Dashboard;
