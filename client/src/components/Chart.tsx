import { FC } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

interface Props {
  totalIncome: number;
  totalExpense: number;
}

const COLORS = ["#16A34A", "#EF4444"];

export const Chart: FC<Props> = ({ totalIncome, totalExpense }) => {
  const data = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];

  return (
    <PieChart width={260} height={260}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={80}
        outerRadius={100}
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  );
};
