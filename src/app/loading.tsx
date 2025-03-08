export default function SkeletonLoading() {
    return (
      <div className="w-full max-w-3xl mx-auto p-4">
        <div className="space-y-4">
          <div className="bg-gray-200 h-4 rounded w-3/4 animate-pulse"></div>
          <div className="bg-gray-200 h-4 rounded animate-pulse"></div>
          <div className="bg-gray-200 h-4 rounded w-5/6 animate-pulse"></div>
        </div>
      </div>
    );
  }