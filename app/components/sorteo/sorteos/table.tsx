import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Sorteo } from "@/graphql/generated/schema";

interface TableSorteoProps {
  sorteos: Sorteo[];
  handleDelete: (uuid: string) => void;
}

const TableSorteo: React.FC<TableSorteoProps> = ({
  sorteos,
  handleDelete,
}: TableSorteoProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Fecha</th>
              <th className="px-6 py-4 text-left font-semibold">Hora</th>
              <th className="px-6 py-4 text-left font-semibold">
                Número Ganador
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Multiplicador
              </th>
              <th className="px-6 py-4 text-left font-semibold">MAS 1</th>
              <th className="px-6 py-4 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sorteos.map((sorteo: Sorteo) => (
              <tr key={sorteo.uuid} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900">{sorteo.drawDate}</td>
                <td className="px-6 py-4 text-gray-900">{sorteo.drawTime}</td>
                <td className="px-6 py-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 px-3 py-1 rounded-full font-bold shadow-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 transform hover:scale-105">
                    {sorteo.winningNumber.toString().padStart(2, "0")}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-900">{sorteo.multiplier}</td>
                <td className="px-6 py-4 text-gray-900">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md font-semibold">
                    {sorteo.multiplierValue}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="text-gray-600 hover:text-gray-800 p-1 cursor-pointer hover:scale-110 transition-transform">
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(sorteo.uuid)}
                      className="text-gray-600 hover:text-red-600 p-1 cursor-pointer hover:scale-110 transition-transform"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSorteo;
