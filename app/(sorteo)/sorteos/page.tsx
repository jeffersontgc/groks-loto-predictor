"use client";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import TableSorteo from "@/app/components/sorteo/sorteos/table";
import ModalForm from "@/app/components/utils/modal";
import CreateSorteoFOrm from "@/app/components/sorteo/sorteos/form/create";
import { Sorteo, useGetSorteosQuery } from "@/graphql/generated/schema";
import { ENV } from "@/app/components/utils/constans";

const SorteosPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useGetSorteosQuery();

  const sorteos = data?.sorteos || [];

  const env = process.env.ENVIROMENT;

  return (
    <div className="h-full w-full p-6">
      {/* Header con botón */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🎲 Sorteos</h1>
        {env === ENV && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-900 cursor-pointer text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 shadow-lg"
          >
            <FiPlus className="text-lg" />
            Agregar Número Ganador
          </button>
        )}
      </div>

      {/* Tabla de sorteos */}
      <TableSorteo sorteos={sorteos as Sorteo[]} />

      {/* Modal */}
      <ModalForm
        visible={isModalOpen}
        handleVisible={() => setIsModalOpen(false)}
        title="Agregar Número Ganador"
        subTitle="Agrega un número ganador para el sorteo"
      >
        <CreateSorteoFOrm setIsModalOpen={setIsModalOpen} />
      </ModalForm>
    </div>
  );
};

export default SorteosPage;
