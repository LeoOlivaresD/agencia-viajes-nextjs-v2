export default function FormularioSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      {/* DNI */}
      <div>
        <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Nombre */}
      <div>
        <div className="h-5 bg-gray-200 rounded w-40 mb-2"></div>
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Email */}
      <div>
        <div className="h-5 bg-gray-200 rounded w-36 mb-2"></div>
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Origen y Destino */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
        <div>
          <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Tipo de Viaje */}
      <div>
        <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Fecha y Hora Salida */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
        <div>
          <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Fecha y Hora Regreso */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
        <div>
          <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Radio Buttons */}
      <div>
        <div className="h-5 bg-gray-200 rounded w-44 mb-3"></div>
        <div className="flex gap-5">
          <div className="h-5 w-20 bg-gray-200 rounded"></div>
          <div className="h-5 w-24 bg-gray-200 rounded"></div>
          <div className="h-5 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Botón */}
      <div className="h-12 bg-gray-200 rounded-lg"></div>
    </div>
  );
}