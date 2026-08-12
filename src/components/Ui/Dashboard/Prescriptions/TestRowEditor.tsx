"use client";

import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { PrescriptionTestItem } from "@/src/types/prescriptionType";

interface TestRowEditorProps {
  rows: PrescriptionTestItem[];
  onChange: (rows: PrescriptionTestItem[]) => void;
}

const TestRowEditor: React.FC<TestRowEditorProps> = ({ rows, onChange }) => {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    onChange([
      ...rows,
      { name: name.trim(), instructions: instructions.trim() || undefined },
    ]);
    setName("");
    setInstructions("");
  };

  const handleRemove = (index: number) => {
    onChange(rows.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4">
      <label className="font-semibold text-sm text-gray-700">Advised Tests</label>

      {rows.length > 0 && (
        <div className="space-y-2">
          {rows.map((row, index) => (
            <div
              key={`${row.name}-${index}`}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
            >
              <div className="flex-1 min-w-0 grid grid-cols-2 gap-2 text-sm">
                <span className="font-medium text-gray-800 truncate">{row.name}</span>
                <span className="text-gray-600 truncate">{row.instructions || "—"}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-500 hover:text-red-700 shrink-0"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Test name (e.g. CBC)"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Instructions (optional)"
            className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center justify-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shrink-0"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestRowEditor;
