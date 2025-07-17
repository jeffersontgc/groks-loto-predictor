"use client";
import React, { useState } from "react";
import { FiCalendar, FiZap, FiTrendingUp } from "react-icons/fi";
import { FaBrain } from "react-icons/fa";
import { useSuggestNumbersLazyQuery } from "@/graphql/generated/schema";

const SuggestNumbers: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const [getSuggestions, { data, error }] = useSuggestNumbersLazyQuery();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (date) {
      const [year, month, day] = date.split("-");
      setSelectedDate(
        `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`
      );
      // Reset time if date changes
      setSelectedTime("");
    } else {
      setSelectedDate("");
      setSelectedTime("");
    }
  };

  // Determinar si la fecha seleccionada es sábado
  const isSaturday = (() => {
    if (!selectedDate) return false;
    const [day, month, year] = selectedDate.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    return date.getDay() === 6;
  })();

  const timeOptions = [
    { value: "11:00 AM", label: "11:00 AM" },
    { value: "3:00 PM", label: "3:00 PM" },
    { value: "6:00 PM", label: "6:00 PM", disabled: !isSaturday },
    { value: "9:00 PM", label: "9:00 PM" },
  ];

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  const handleGetSuggestions = async () => {
    if (!selectedDate || !selectedTime) return;
    setIsLoading(true);
    try {
      await getSuggestions({
        variables: { drawDate: selectedDate, drawTime: selectedTime },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateForInput = (dateStr: string) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  // Componente del gráfico personalizado
  const CustomChart = ({
    metrics,
  }: {
    metrics: {
      aiMetrics: { hitRate: number };
      grokMetrics: { hitRate: number };
      crossMetrics: { hitRate: number };
    };
  }) => {
    const chartData = [
      { label: "IA", value: metrics.aiMetrics.hitRate, color: "#4BC0C0" },
      { label: "Grok", value: metrics.grokMetrics.hitRate, color: "#36A2EB" },
      { label: "Cruz", value: metrics.crossMetrics.hitRate, color: "#FFCD56" },
    ];
    const chartHeight = 200;
    const barWidth = 80;
    const barSpacing = 40;
    const totalWidth = chartData.length * (barWidth + barSpacing) - barSpacing;

    return (
      <div className="w-full h-80 flex items-center justify-center">
        <svg width={totalWidth} height={chartHeight + 60} className="mx-auto">
          {/* Líneas de fondo */}
          {[0, 25, 50, 75, 100].map((tick) => (
            <g key={tick}>
              <line
                x1={0}
                y1={chartHeight - (tick / 100) * chartHeight}
                x2={totalWidth}
                y2={chartHeight - (tick / 100) * chartHeight}
                stroke="#E5E7EB"
                strokeWidth={1}
              />
              <text
                x={-10}
                y={chartHeight - (tick / 100) * chartHeight + 4}
                textAnchor="end"
                fontSize="12"
                fill="#6B7280"
              >
                {tick}%
              </text>
            </g>
          ))}

          {/* Barras */}
          {chartData.map((item, index) => {
            const x = index * (barWidth + barSpacing);
            const barHeight = (item.value / 100) * chartHeight;
            const y = chartHeight - barHeight;

            return (
              <g key={item.label}>
                {/* Barra */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={item.color}
                  rx={4}
                  ry={4}
                />

                {/* Valor en la barra */}
                <text
                  x={x + barWidth / 2}
                  y={y - 10}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#374151"
                >
                  {item.value}%
                </text>

                {/* Etiqueta debajo */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 20}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#6B7280"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎯Groks Loto Predictor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Utiliza inteligencia artificial y algoritmos avanzados para predecir
            los números más probables en el próximo sorteo
          </p>
        </div>

        {/* Date Selection Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FiCalendar className="text-2xl text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Selecciona la Fecha y Hora del Sorteo
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha del Sorteo
              </label>
              <input
                type="date"
                value={formatDateForInput(selectedDate)}
                onChange={handleDateChange}
                className="w-full px-4 py-3 border border-gray-300 placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                max="2030-12-31"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horario del Sorteo
              </label>
              <select
                value={selectedTime}
                onChange={handleTimeChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={!selectedDate}
              >
                <option value="">Selecciona un horario</option>
                {timeOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label} {option.disabled ? "(Solo Sábado)" : ""}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleGetSuggestions}
              disabled={!selectedDate || !selectedTime || isLoading}
              className="bg-gradient-to-r from-purple-600 cursor-pointer to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <FiZap className="text-lg" />
              )}
              {isLoading ? "Generando..." : "Obtener Sugerencias"}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                🧠 Analizando patrones históricos...
              </h3>
              <p className="text-gray-600 mb-4">
                Nuestro algoritmo está procesando los últimos 14 días de sorteos
              </p>
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {data && !isLoading && data.suggestNumbers.status === "ok" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* AI Suggestions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <FaBrain className="text-2xl text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Sugerencias de IA
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {data.suggestNumbers.numbers
                  .slice(0, 6)
                  .map((number, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-4 rounded-lg font-bold text-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    >
                      {number.toString().padStart(2, "0")}
                    </div>
                  ))}
                {Array.from({
                  length: Math.max(0, 6 - data.suggestNumbers.numbers.length),
                }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="bg-gray-200 text-gray-400 text-center py-4 rounded-lg font-bold text-xl"
                  >
                    --
                  </div>
                ))}
              </div>
            </div>

            {/* Algorithm Suggestions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <FiTrendingUp className="text-2xl text-green-600" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Algoritmo Grok
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {data.suggestNumbers.numbers
                  .slice(6, 12)
                  .map((number, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-green-500 to-teal-600 text-white text-center py-4 rounded-lg font-bold text-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    >
                      {number.toString().padStart(2, "0")}
                    </div>
                  ))}
                {Array.from({
                  length: Math.max(
                    0,
                    6 - Math.max(0, data.suggestNumbers.numbers.length - 6)
                  ),
                }).map((_, index) => (
                  <div
                    key={`empty-algo-${index}`}
                    className="bg-gray-200 text-gray-400 text-center py-4 rounded-lg font-bold text-xl"
                  >
                    --
                  </div>
                ))}
              </div>
            </div>

            {/* Lucky Cross Suggestions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <FiZap className="text-2xl text-yellow-600" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Cruz de la Suerte
                </h3>
              </div>
              <div className="relative w-full h-64 grid grid-cols-5 grid-rows-5 gap-2">
                {data.suggestNumbers.numbers.length >= 8 && (
                  <>
                    {/* Centro */}
                    <div className="col-start-3 row-start-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-center py-4 rounded-lg font-bold text-xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
                      {data.suggestNumbers.numbers[4]
                        ?.toString()
                        .padStart(2, "0") || "--"}
                    </div>
                    {/* Arriba (interior derecha) */}
                    <div className="col-start-1 row-start-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-center py-4 rounded-lg font-bold text-xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
                      {data.suggestNumbers.numbers[5]
                        ?.toString()
                        .padStart(2, "0") || "--"}
                    </div>
                    {/* Abajo (interior abajo) */}
                    <div className="col-start-5 row-start-5 bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-center py-4 rounded-lg font-bold text-xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
                      {data.suggestNumbers.numbers[6]
                        ?.toString()
                        .padStart(2, "0") || "--"}
                    </div>
                    {/* Izquierda (interior izquierda) */}
                    <div className="col-start-1 row-start-5 bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-center py-4 rounded-lg font-bold text-xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
                      {data.suggestNumbers.numbers[7]
                        ?.toString()
                        .padStart(2, "0") || "--"}
                    </div>
                    {/* Derecha (interior arriba) */}
                    <div className="col-start-5 row-start-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-center py-4 rounded-lg font-bold text-xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
                      {data.suggestNumbers.numbers[8]
                        ?.toString()
                        .padStart(2, "0") || "--"}
                    </div>
                  </>
                )}
                {/* Rellenar el resto de la cuadrícula con espacios vacíos */}
                {Array.from({ length: 25 }).map((_, index) => {
                  const col = (index % 5) + 1;
                  const row = Math.floor(index / 5) + 1;
                  if (
                    !(col === 3 && row === 3) && // Centro
                    !(
                      (col === 1 && row === 1) ||
                      (col === 5 && row === 5) ||
                      (col === 1 && row === 5) ||
                      (col === 5 && row === 1)
                    ) // Puntos de la X
                  ) {
                    return (
                      <div
                        key={index}
                        className="bg-gray-200 text-gray-400 text-center py-4 rounded-lg font-bold text-xl"
                      >
                        --
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 col-span-3">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Métricas de Acierto
              </h3>
              {data.suggestNumbers.metrics && (
                <CustomChart metrics={data.suggestNumbers.metrics} />
              )}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
            <p className="text-red-800">Error: {error.message}</p>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            ¿Cómo funciona?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaBrain className="text-purple-600 text-xl" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">IA Avanzada</h4>
              <p className="text-sm text-gray-600">
                Analiza patrones históricos usando machine learning
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiTrendingUp className="text-blue-600 text-xl" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Algoritmo Grok
              </h4>
              <p className="text-sm text-gray-600">
                Combina análisis estadístico con matemáticas avanzadas
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiZap className="text-green-600 text-xl" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Predicción Real
              </h4>
              <p className="text-sm text-gray-600">
                Basado en datos reales de los últimos 14 días
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestNumbers;
