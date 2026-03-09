import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

type Props<T> = {
  data: T[];
  xAxis: keyof T;
  dataKey: keyof T;
};

function SimpleLineChart<T extends Record<string, unknown>>({
  data,
  xAxis,
  dataKey,
}: Props<T>) {
  return (
    <ResponsiveContainer width="99%" height={500}>
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 10,
          bottom: 5,
        }}
      >
        <Line
          type="monotone"
          dataKey={dataKey as string}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey={xAxis as string} />
        <YAxis />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;