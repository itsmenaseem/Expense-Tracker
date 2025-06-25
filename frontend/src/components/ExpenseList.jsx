
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";

const ExpenseList = ({ expenses, selectedCategory, onEdit, onDelete }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
        <CardDescription>
          {selectedCategory === "all" ? "All recent expenses" : `Recent ${selectedCategory} expenses`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          {expenses.slice(0, 10).map((expense) => (
            <div key={expense._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg space-y-3 sm:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <Badge variant="secondary" className="w-fit">{expense.category}</Badge>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm sm:text-base truncate">{expense.description}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{expense.date}</p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <div className="text-lg font-semibold">₹{expense.amount.toFixed(2)}</div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(expense)}
                  >
                    <Edit className="w-4 h-4" />
                    <span className="sr-only sm:not-sr-only sm:ml-1 hidden sm:inline">Edit</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(expense._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only sm:not-sr-only sm:ml-1 hidden sm:inline">Delete</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {expenses.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <p className="text-base sm:text-lg mb-2">No expenses found for this category</p>
              <p className="text-sm">Try adding a new expense or changing the filter</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseList;
