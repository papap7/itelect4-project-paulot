import type { Engineer } from "../types/index";

interface EngineerCardProps {
  engineer: Engineer;
  onSelect: (engineer: Engineer) => void;
}

function EngineerCard({ engineer, onSelect }: EngineerCardProps) {
  const handleClick = (): void => {
    onSelect(engineer);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">{engineer.name}</h2>
      <p className="text-gray-600 dark:text-gray-300">{engineer.email}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Role: {engineer.role}</p>
      <button 
        onClick={handleClick}
        className="mt-3 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Select Engineer
      </button>
    </div>
  );
}

export default EngineerCard;