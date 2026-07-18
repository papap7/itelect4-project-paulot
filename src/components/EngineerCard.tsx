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
    <div className="card" style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
      <h2>{engineer.name}</h2>
      <p>{engineer.email}</p>
      <p>Role: {engineer.role}</p>
      <button onClick={handleClick}>Select Engineer</button>
    </div>
  );
}

export default EngineerCard;