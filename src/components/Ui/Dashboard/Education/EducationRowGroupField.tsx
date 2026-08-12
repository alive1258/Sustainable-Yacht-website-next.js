"use client";

import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { EducationRowItem } from "@/src/types/educationType";

interface EducationRowGroupFieldProps {
  label: string;
  hint?: string;
  rows: EducationRowItem[];
  onChange: (rows: EducationRowItem[]) => void;
}

const EducationRowGroupField: React.FC<EducationRowGroupFieldProps> = ({
  label,
  hint,
  rows,
  onChange,
}) => {
  const [icon, setIcon] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [period, setPeriod] = useState("");
  const [placeholder, setPlaceholder] = useState(false);

  const handleAdd = () => {
    if (!icon.trim() || !title.trim() || !subtitle.trim()) return;
    onChange([
      ...rows,
      {
        icon: icon.trim(),
        title: title.trim(),
        subtitle: subtitle.trim(),
        period: period.trim() || undefined,
        placeholder,
      },
    ]);
    setIcon("");
    setTitle("");
    setSubtitle("");
    setPeriod("");
    setPlaceholder(false);
  };

  const handleRemove = (index: number) => {
    onChange(rows.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4">
      <label className="font-semibold text-sm text-gray-700">{label}</label>
      {hint && <p className="text-xs text-gray-500">{hint}</p>}

      {rows.length > 0 && (
        <div className="space-y-2">
          {rows.map((row, index) => (
            <div
              key={`${row.title}-${index}`}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
            >
              <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
                <span className="text-gray-500 truncate">{row.icon}</span>
                <span className="font-medium text-gray-800 truncate">
                  {row.title}
                </span>
                <span className="text-gray-600 truncate">{row.subtitle}</span>
                <span className="text-gray-500 truncate">
                  {row.period || "—"}
                </span>
                <span className="text-xs text-gray-400">
                  {row.placeholder ? "Placeholder" : ""}
                </span>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        <input
          type="text"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="Icon (e.g. GraduationCap)"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Subtitle"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
        <input
          type="text"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          placeholder="Period (optional)"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs text-gray-600 shrink-0">
            <input
              type="checkbox"
              checked={placeholder}
              onChange={(e) => setPlaceholder(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            Placeholder
          </label>
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

export default EducationRowGroupField;
