import { FC } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { CHART_COLORS } from "../app/constants";
import { CustomizedLabel } from "./CustomizedLabel";

interface Props {
  totalIncome: number;
  totalExpense: number;
}

export const Chart: FC<Props> = ({ totalIncome, totalExpense }) => {
  const data = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={CustomizedLabel}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
