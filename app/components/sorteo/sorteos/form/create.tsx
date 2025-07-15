import React from "react";
import { FiX } from "react-icons/fi";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {
  CreateSorteoInput,
  useCreateSorteoMutation,
} from "@/graphql/generated/schema";

type OptionType = {
  value: string;
  label: string;
};

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSorteoFOrm: React.FC<Props> = ({ setIsModalOpen }) => {
  const [createSorteo] = useCreateSorteoMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateSorteoInput>();

  // Opciones para los selects
  const timeOptions: OptionType[] = [
    { value: "11:00 AM", label: "11:00 AM" },
    { value: "3:00 PM", label: "3:00 PM" },
    { value: "6:00 PM", label: "6:00 PM" },
    { value: "9:00 PM", label: "9:00 PM" },
  ];

  const multiplierOptions: OptionType[] = [
    { value: "Gratis", label: "Gratis" },
    { value: "2x", label: "2x" },
    { value: "3x", label: "3x" },
    { value: "4x", label: "4x" },
    { value: "5x", label: "5x" },
  ];

  // Función para formatear la fecha como DD/MM/YYYY y limitar a 8 dígitos
  const formatDate = (value: string) => {
    // Eliminar todo lo que no sea número
    let cleaned = value.replace(/\D/g, "");
    // Limitar a 8 dígitos
    cleaned = cleaned.slice(0, 8);
    let formatted = "";
    if (cleaned.length <= 2) {
      formatted = cleaned;
    } else if (cleaned.length <= 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    }
    return formatted;
  };

  const onSubmit = (data: CreateSorteoInput) => {
    const newSorteo: CreateSorteoInput = {
      drawDate: data.drawDate,
      drawNumber: data.drawNumber,
      drawTime: data.drawTime,
      multiplier: data.multiplier,
      multiplierValue: data.multiplierValue,
      winningNumber: Number(data.winningNumber),
    };
    createSorteo({ variables: { args: newSorteo } });
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Agregar Número Ganador
          </h2>
          <button
            onClick={() => {
              setIsModalOpen(false);
              reset();
            }}
            className="text-gray-500 hover:text-gray-700 cursor-pointer hover:scale-110 transition-transform"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Fecha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha del Sorteo
            </label>
            <input
              type="text"
              placeholder="DD/MM/YYYY"
              {...register("drawDate", {
                required: "La fecha es requerida",
                validate: (value) => {
                  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
                    return "El formato debe ser DD/MM/YYYY";
                  }
                  const [day, month, year] = value.split("/").map(Number);
                  if (day < 1 || day > 31) return "Día inválido";
                  if (month < 1 || month > 12) return "Mes inválido";
                  if (year < 1900 || year > 2100) return "Año inválido";
                  return true;
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-black"
              maxLength={10}
              onChange={(e) => {
                const formatted = formatDate(e.target.value);
                e.target.value = formatted;
                // Llamar a la función original de react-hook-form

                register("drawDate").onChange(e);
              }}
            />
            {errors.drawDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.drawDate.message}
              </p>
            )}
          </div>

          {/* Hora */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hora del Sorteo
            </label>
            <Controller
              name="drawTime"
              control={control}
              rules={{ required: "La hora es requerida" }}
              render={({ field }) => (
                <Select<OptionType>
                  {...field}
                  value={timeOptions.find(
                    (option) => option.value === field.value
                  )}
                  options={timeOptions}
                  placeholder="Seleccionar hora"
                  className="w-full"
                  classNamePrefix="select"
                  isClearable
                  onChange={(option) => field.onChange(option?.value)}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "white",
                      borderColor: errors.drawTime
                        ? "#ef4444"
                        : state.isFocused
                          ? "#000000"
                          : "#d1d5db",
                      borderWidth: "1px",
                      boxShadow: state.isFocused ? "0 0 0 1px #000000" : "none",
                      "&:hover": {
                        borderColor: errors.drawTime ? "#ef4444" : "#000000",
                      },
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected
                        ? "#000000"
                        : state.isFocused
                          ? "#f3f4f6"
                          : "white",
                      color: state.isSelected ? "white" : "#000000",
                      "&:hover": {
                        backgroundColor: state.isSelected
                          ? "#000000"
                          : "#e5e7eb",
                      },
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "white",
                      border: "1px solid #d1d5db",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#000000",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#374151",
                    }),
                    input: (provided) => ({
                      ...provided,
                      color: "#000000",
                    }),
                  }}
                />
              )}
            />
            {errors.drawTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.drawTime.message}
              </p>
            )}
          </div>

          {/* Número de Sorteo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Sorteo
            </label>
            <input
              type="text"
              placeholder="#11570"
              {...register("drawNumber")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-gray-600"
            />
            {errors.drawNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.drawNumber.message}
              </p>
            )}
          </div>

          {/* Número Ganador */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número Ganador (0-99)
            </label>
            <input
              type="number"
              min="0"
              max="99"
              placeholder="45"
              {...register("winningNumber")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-gray-600"
            />
            {errors.winningNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.winningNumber.message}
              </p>
            )}
          </div>

          {/* Multiplicador */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Multiplicador
            </label>
            <Controller
              name="multiplier"
              control={control}
              rules={{ required: "El multiplicador es requerido" }}
              render={({ field }) => (
                <Select<OptionType>
                  {...field}
                  value={multiplierOptions.find(
                    (option) => option.value === field.value
                  )}
                  options={multiplierOptions}
                  placeholder="Seleccionar multiplicador"
                  className="w-full"
                  classNamePrefix="select"
                  isClearable
                  onChange={(option) => field.onChange(option?.value)}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "white",
                      borderColor: errors.multiplier
                        ? "#ef4444"
                        : state.isFocused
                          ? "#000000"
                          : "#d1d5db",
                      borderWidth: "1px",
                      boxShadow: state.isFocused ? "0 0 0 1px #000000" : "none",
                      "&:hover": {
                        borderColor: errors.multiplier ? "#ef4444" : "#000000",
                      },
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected
                        ? "#000000"
                        : state.isFocused
                          ? "#f3f4f6"
                          : "white",
                      color: state.isSelected ? "white" : "#000000",
                      "&:hover": {
                        backgroundColor: state.isSelected
                          ? "#000000"
                          : "#e5e7eb",
                      },
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "white",
                      border: "1px solid #d1d5db",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#000000",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#6b7280",
                    }),
                    input: (provided) => ({
                      ...provided,
                      color: "#000000",
                    }),
                  }}
                />
              )}
            />
            {errors.multiplier && (
              <p className="text-red-500 text-sm mt-1">
                {errors.multiplier.message}
              </p>
            )}
          </div>

          {/* Valor del Multiplicador */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor del Multiplicador (1-9)
            </label>
            <input
              type="number"
              min="1"
              max="9"
              placeholder="2"
              {...register("multiplierValue")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-gray-600"
            />
            {errors.multiplierValue && (
              <p className="text-red-500 text-sm mt-1">
                {errors.multiplierValue.message}
              </p>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                reset();
              }}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-all duration-200 cursor-pointer"
            >
              Guardar Sorteo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSorteoFOrm;
