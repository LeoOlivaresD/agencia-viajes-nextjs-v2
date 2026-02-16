export default function SolicitudListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
      
      <div className="p-4 bg-gray-100 rounded-lg animate-pulse">
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
      
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-50 p-5 rounded-xl border-2 border-gray-200 animate-pulse">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded w-3/5"></div>
          </div>
        </div>
      ))}
    </div>
  );
}