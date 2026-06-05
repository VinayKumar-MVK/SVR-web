import React from 'react';

interface TableData {
  model: string;
  power: string;
  capacity: string;
}

interface TableProps {
  data: TableData[];
  title?: string;
  className?: string;
}

const Table: React.FC<TableProps> = ({ 
  data, 
  title = 'Technical Specifications',
  className = ''
}) => {
  return (
    <div className={`mt-8 ${className}`}>
      {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-left text-base">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Model</th>
              <th className="px-4 py-2 border border-gray-300">Power</th>
              <th className="px-4 py-2 border border-gray-300">Capacity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{item.model}</td>
                <td className="px-4 py-2 border border-gray-300">{item.power}</td>
                <td className="px-4 py-2 border border-gray-300">{item.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
