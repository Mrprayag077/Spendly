import { LoaderCircle } from "lucide-react";

function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50">
      <LoaderCircle className="w-16 h-16 animate-spin text-blue-600" />
      <p className="mt-4 text-lg font-medium text-gray-700">{message}</p>
    </div>
  );
}

export default LoadingScreen;
