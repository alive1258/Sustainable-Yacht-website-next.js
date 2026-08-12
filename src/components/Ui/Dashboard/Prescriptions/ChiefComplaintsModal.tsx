"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Search, Plus, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import {
  ComplaintDurationUnit,
  PrescriptionChiefComplaintItem,
} from "@/src/types/prescriptionType";
import {
  useAddComplaintTemplateMutation,
  useGetMyComplaintTemplatesQuery,
  useGetQuickPickComplaintsQuery,
} from "@/src/redux/api/chiefComplaintApi";

interface ChiefComplaintsModalProps {
  isOpen: boolean;
  initialItems: PrescriptionChiefComplaintItem[];
  onClose: () => void;
  onSave: (items: PrescriptionChiefComplaintItem[]) => void;
}

type TabKey = "all" | "my_templates" | "quick_pick";

const TABS: { key: TabKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "my_templates", label: "My Templates" },
  { key: "quick_pick", label: "Quick pick" },
];

const DURATION_UNITS: ComplaintDurationUnit[] = ["day", "week", "month", "year"];
const DURATION_UNIT_LABELS: Record<ComplaintDurationUnit, string> = {
  day: "Day",
  week: "Week",
  month: "Month",
  year: "Year",
};

const QUICK_DURATION_VALUES = Array.from({ length: 10 }, (_, i) => i + 1);
const SEARCH_MIN_LENGTH = 2;

const formatDuration = (item: PrescriptionChiefComplaintItem): string | null => {
  if (!item.duration_value || !item.duration_unit) return null;
  return `${item.duration_value} ${DURATION_UNIT_LABELS[item.duration_unit]}(s)`;
};

const ChiefComplaintsModal: React.FC<ChiefComplaintsModalProps> = ({
  isOpen,
  initialItems,
  onClose,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>("quick_pick");
  const [search, setSearch] = useState("");
  const [addedItems, setAddedItems] = useState<PrescriptionChiefComplaintItem[]>([]);

  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [durationValue, setDurationValue] = useState<number>(1);
  const [isCustomDuration, setIsCustomDuration] = useState(false);
  const [durationUnit, setDurationUnit] = useState<ComplaintDurationUnit>("week");
  const [note, setNote] = useState("");

  const { data: quickPickRes, isLoading: isQuickPickLoading } =
    useGetQuickPickComplaintsQuery(undefined, { skip: !isOpen });
  const { data: templatesRes, isLoading: isTemplatesLoading } =
    useGetMyComplaintTemplatesQuery(undefined, { skip: !isOpen });
  const [addComplaintTemplate] = useAddComplaintTemplateMutation();

  const quickPick = useMemo(() => quickPickRes?.data ?? [], [quickPickRes]);
  const templates = useMemo(() => templatesRes?.data ?? [], [templatesRes]);
  const templateNames = useMemo(() => templates.map((t) => t.name), [templates]);

  // Reset to a clean slate every time the modal opens, seeded with whatever
  // is already on the prescription so re-opening doesn't lose earlier picks.
  useEffect(() => {
    if (!isOpen) return;
    setAddedItems(initialItems);
    setActiveTab("quick_pick");
    setSearch("");
    setSelectedName(null);
    setDurationValue(1);
    setIsCustomDuration(false);
    setDurationUnit("week");
    setNote("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const baseList = useMemo(() => {
    if (activeTab === "quick_pick") return quickPick;
    if (activeTab === "my_templates") return templateNames;

    const seen = new Set<string>();
    const combined: string[] = [];
    for (const name of [...quickPick, ...templateNames]) {
      const key = name.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      combined.push(name);
    }
    return combined;
  }, [activeTab, quickPick, templateNames]);

  const isSearching = search.trim().length >= SEARCH_MIN_LENGTH;
  const filteredList = useMemo(() => {
    if (!isSearching) return baseList;
    const q = search.trim().toLowerCase();
    return baseList.filter((name) => name.toLowerCase().includes(q));
  }, [baseList, isSearching, search]);

  const isListLoading = isQuickPickLoading || isTemplatesLoading;

  const handlePickComplaint = (name: string) => {
    setSelectedName(name);
  };

  const handleAddCustom = async () => {
    const name = search.trim();
    if (!name) return;

    setSelectedName(name);
    try {
      await addComplaintTemplate({ name }).unwrap();
    } catch {
      // Saving as a reusable template is a convenience — if it fails, the
      // doctor can still add this complaint to the prescription below.
    }
  };

  const handleAddToList = () => {
    if (!selectedName) return;

    const item: PrescriptionChiefComplaintItem = {
      name: selectedName,
      duration_value: durationValue,
      duration_unit: durationUnit,
      note: note.trim() || undefined,
    };

    setAddedItems((prev) => {
      const withoutDuplicate = prev.filter(
        (existing) => existing.name.toLowerCase() !== selectedName.toLowerCase(),
      );
      return [...withoutDuplicate, item];
    });

    setSelectedName(null);
    setNote("");
    setSearch("");
  };

  const handleRemoveAdded = (name: string) => {
    setAddedItems((prev) => prev.filter((item) => item.name !== name));
  };

  const handleSave = () => {
    onSave(addedItems);
    toast.success("Chief complaints saved.");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-base font-semibold text-black">
            Add Chief Complaints (C/C)
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {/* Tabs */}
          <div className="flex gap-1 border-b border-gray-200">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition ${
                  activeTab === tab.key
                    ? "border-emerald-600 text-emerald-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative mt-3">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search complaints (min 2 char)"
              className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Complaint chips */}
          <div className="mt-3 flex max-h-40 flex-wrap gap-2 overflow-y-auto">
            {isListLoading && (
              <p className="flex items-center gap-2 text-sm text-gray-400">
                <Loader2 size={14} className="animate-spin" />
                Loading...
              </p>
            )}

            {!isListLoading &&
              filteredList.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handlePickComplaint(name)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition ${
                    selectedName === name
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {name}
                </button>
              ))}

            {!isListLoading && isSearching && filteredList.length === 0 && (
              <button
                type="button"
                onClick={handleAddCustom}
                className="flex items-center gap-1 rounded-full border border-emerald-600 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
              >
                <Plus size={14} />
                Add &quot;{search.trim()}&quot;
              </button>
            )}
          </div>

          {/* Duration + note configurator */}
          <div className="mt-4 rounded-lg border border-gray-200 p-3">
            <p className="text-sm text-gray-600">
              {selectedName ? (
                <>
                  Configuring: <span className="font-semibold text-black">{selectedName}</span>
                </>
              ) : (
                "Select a complaint above to set its duration"
              )}
            </p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {QUICK_DURATION_VALUES.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setIsCustomDuration(false);
                    setDurationValue(value);
                  }}
                  className={`h-8 w-8 rounded-md border text-sm transition ${
                    !isCustomDuration && durationValue === value
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {value}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setIsCustomDuration(true)}
                className={`rounded-md border px-3 text-sm transition ${
                  isCustomDuration
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Custom
              </button>
              {isCustomDuration && (
                <input
                  type="number"
                  min={1}
                  max={999}
                  value={durationValue}
                  onChange={(e) => setDurationValue(Number(e.target.value) || 1)}
                  className="h-8 w-20 rounded-md border border-gray-300 px-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-emerald-600"
                />
              )}
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {DURATION_UNITS.map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => setDurationUnit(unit)}
                  className={`rounded-md border px-3 py-1 text-sm transition ${
                    durationUnit === unit
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {DURATION_UNIT_LABELS[unit]}
                </button>
              ))}
            </div>

            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add note..."
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-emerald-600"
            />

            <button
              type="button"
              onClick={handleAddToList}
              disabled={!selectedName}
              className="mt-2 flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={14} />
              Add
            </button>
          </div>

          {/* Added list */}
          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-700">
              Added C/C ({addedItems.length} Item{addedItems.length === 1 ? "" : "s"})
            </p>
            {addedItems.length === 0 ? (
              <p className="mt-1 text-sm italic text-gray-400">No complaints added yet.</p>
            ) : (
              <ul className="mt-2 divide-y divide-gray-100 rounded-lg border border-gray-200">
                {addedItems.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between px-3 py-2 text-sm"
                  >
                    <div>
                      <p className="font-medium text-black">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatDuration(item) ?? "—"}
                        {item.note ? ` · ${item.note}` : ""}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAdded(item.name)}
                      className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-gray-200 px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChiefComplaintsModal;
