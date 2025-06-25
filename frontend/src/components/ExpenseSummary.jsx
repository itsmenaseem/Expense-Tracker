
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

const ExpenseSummary = ({ expenses, selectedCategory }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {selectedCategory === "all" ? "All categories" : selectedCategory}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Transaction Count</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">{expenses.length}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Total transactions
          </p>
        </CardContent>
      </Card>

      <Card className="sm:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Amount</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">
            ${expenses.length > 0 ? (totalExpenses / expenses.length).toFixed(2) : "0.00"}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Per transaction
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseSummary;
