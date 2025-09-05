export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">Loading LexiGuard</h2>
          <p className="text-gray-300">Preparing your legal rights information...</p>
        </div>
      </div>
    </div>
  );
}
