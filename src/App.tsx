import { useState, useEffect, useRef } from "react";

  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const filteredWorkspaces = workspaces.filter((w) =>
    w.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>CloudOps Provisioning Portal</h1>
      <input 
        ref={searchInputRef}
        value={searchTerm}
        onChange={handleSearchChange}
        type="text"
        placeholder="Search workspaces..."
        style={{ padding: "8px", width: "100%", maxWidth: "400px", marginBottom: "20px" }}
      />
    </div>
  );