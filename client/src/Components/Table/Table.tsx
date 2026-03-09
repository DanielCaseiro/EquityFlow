import type { ReactNode } from "react";

type ConfigRow<T> = {
  label: ReactNode;
  render: (data: T) => ReactNode;
};

type Props<T> = {
  config: ConfigRow<T>[];
  data: T[];
};

function Table<T>({ config, data }: Props<T>) {
  const renderedRows = data.map((item, rowIndex) => {
    return (
      <tr key={rowIndex}>
        {config.map((column, colIndex) => (
          <td key={colIndex} className="p-3">
            {column.render(item)}
          </td>
        ))}
      </tr>
    );
  });

  const renderedHeaders = config.map((column, index) => {
    return (
      <th
        key={index}
        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        {column.label}
      </th>
    );
  });

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <table className="min-w-full divide-y divide-gray-200 m-5">
        <thead className="bg-gray-50">
          <tr>{renderedHeaders}</tr>
        </thead>

        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
}

export default Table;