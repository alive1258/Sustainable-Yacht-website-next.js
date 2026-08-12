"use client";

import React, { useEffect, useRef, useState } from "react";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { useDebounce } from "@/src/hooks/useDebounce";
import { PrescriptionMedicineItem } from "@/src/types/prescriptionType";
import { useLazySearchMedicinesQuery } from "@/src/redux/api/prescriptionApi";

interface MedicineRowEditorProps {
  rows: PrescriptionMedicineItem[];
  onChange: (rows: PrescriptionMedicineItem[]) => void;
}

const MedicineRowEditor: React.FC<MedicineRowEditorProps> = ({ rows, onChange }) => {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [instructions, setInstructions] = useState("");

  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const debouncedName = useDebounce(name, 350);
  const [triggerSearch, { data, isFetching }] = useLazySearchMedicinesQuery();
  const suggestions = data?.data || [];

  useEffect(() => {
    const term = (debouncedName as string).trim();
    if (term.length >= 3) {
      triggerSearch(term);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [debouncedName, triggerSearch]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAdd = () => {
    if (!name.trim()) return;
    onChange([
      ...rows,
      {
        name: name.trim(),
        dosage: dosage.trim() || undefined,
        frequency: frequency.trim() || undefined,
        duration: duration.trim() || undefined,
        instructions: instructions.trim() || undefined,
      },
    ]);
    setName("");
    setDosage("");
    setFrequency("");
    setDuration("");
    setInstructions("");
    setShowSuggestions(false);
  };

  const handleRemove = (index: number) => {
    onChange(rows.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4">
      <label className="font-semibold text-sm text-gray-700">Medicines (Rx)</label>

      {rows.length > 0 && (
        <div className="space-y-2">
          {rows.map((row, index) => (
            <div
              key={`${row.name}-${index}`}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
            >
              <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
                <span className="font-medium text-gray-800 truncate">{row.name}</span>
                <span className="text-gray-600 truncate">{row.dosage || "—"}</span>
                <span className="text-gray-600 truncate">{row.frequency || "—"}</span>
                <span className="text-gray-600 truncate">{row.duration || "—"}</span>
                <span className="text-gray-500 truncate">{row.instructions || "—"}</span>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2">
        <div ref={wrapperRef} className="relative lg:col-span-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => name.trim().length >= 3 && setShowSuggestions(true)}
            placeholder="Medicine name"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
          {showSuggestions && (
            <div className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
              {isFetching && (
                <div className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500">
                  <Loader2 size={12} className="animate-spin" />
                  Searching...
                </div>
              )}
              {!isFetching && suggestions.length === 0 && (
                <div className="px-3 py-2 text-xs text-gray-400">
                  No suggestions — you can still use this name as typed.
                </div>
              )}
              {!isFetching &&
                suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setName(suggestion);
                      setShowSuggestions(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50"
                  >
                    {suggestion}
                  </button>
                ))}
            </div>
          )}
        </div>
        <input
          type="text"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          placeholder="Dosage (e.g. 500mg)"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
        <input
          type="text"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          placeholder="Frequency (e.g. 1+0+1)"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration (e.g. 5 days)"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Instructions"
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

export default MedicineRowEditor;
