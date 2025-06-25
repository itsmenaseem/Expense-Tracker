import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent
} from "@/components/ui/chart";
import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";
import { categories, categoryColors } from "@/constants/expenseCategories";

const chartConfig = {
  amount: {
    label: "Amount",
    color: "hsl(var(--chart-1))",
  },
};

const ExpenseCharts = ({ expenses, cat = "all", dateRange }) => {
  const filteredExpenses = expenses.filter((expense) => {
    const matchCategory = cat === "all" || expense.category === cat;
    const date = new Date(expense.date);
    const matchDate =
      (!dateRange?.from || date >= dateRange.from) &&
      (!dateRange?.to || date <= dateRange.to);
    return matchCategory && matchDate;
  });

  const categoryData = categories.map((category) => {
    const total = filteredExpenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
    return {
      name: category,
      amount: total,
      fill: categoryColors[category],
    };
  }).filter((item) => item.amount > 0);

  // ✅ Monthly chart: aggregate expenses per month
  const monthlyData = filteredExpenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toISOString().substring(0, 7);
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  const monthlyChartData = Object.entries(monthlyData)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([month, amount]) => ({ month, amount }));

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Expenses by Category</CardTitle>
          <CardDescription>Distribution of your spending across categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={window.innerWidth < 640 ? 60 : 80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Monthly Spending Trend</CardTitle>
          <CardDescription>Your spending pattern over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={12} tickMargin={8} />
                <YAxis fontSize={12} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseCharts;
