"use client";

import React from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2 } from "lucide-react";
import { ChamberItem, WEEKDAY_LABELS } from "@/src/types/chamberType";
import { ApiError } from "@/src/types/authType";
import {
  useDeleteChamberMutation,
  useGetAllChambersQuery,
} from "@/src/redux/api/chamberApi";

const formatTime = (hhmm: string) => {
  const [hoursStr, minutesStr] = hhmm.split(":");
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return minutes === 0
    ? `${hour12} ${period}`
    : `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
};

const AllChambers: React.FC = () => {
  const { data, isLoading, refetch } = useGetAllChambersQuery({ limit: 100 });

  const [deleteChamber] = useDeleteChamberMutation();

  const chambers: ChamberItem[] = [...(data?.data || [])].sort(
    (a, b) => a.day_of_week - b.day_of_week,
  );

  const handleDeleteChamber = async (chamber: ChamberItem) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete the ${WEEKDAY_LABELS[chamber.day_of_week]} chamber "${chamber.location_name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await deleteChamber(chamber.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Chamber "${chamber.location_name}" has been deleted.`,
        timer: 1000,
        showConfirmButton: false,
      });

      refetch();
    } catch (err) {
      const apiError = err as ApiError;

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: apiError.data?.message || apiError.message || "Delete failed",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-3">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="h-12 w-full animate-pulse rounded-md bg-gray-200"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Weekly Chamber Schedule
          </h1>
          <p className="text-sm text-gray-500">
            Location, fee, hours, and how many minutes each patient gets — a day
            can have more than one chamber as long as times don&apos;t overlap
          </p>
        </div>

        <Link href="/dashboard/chambers/add-chamber">
          <button className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 transition w-full sm:w-auto">
            <Plus size={18} />
            Add Chamber
          </button>
        </Link>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Day
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Location
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Hours
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Fee
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Avg. Min/Patient
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Capacity
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {chambers?.length > 0 ? (
              chambers.map((chamber) => (
                <tr
                  key={chamber.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-3 text-sm font-semibold text-gray-800">
                    {WEEKDAY_LABELS[chamber.day_of_week]}
                  </td>

                  <td className="px-5 py-3 text-sm text-gray-600 max-w-xs truncate">
                    {chamber.location_name}
                  </td>

                  <td className="px-5 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {formatTime(chamber.start_time)} –{" "}
                    {formatTime(chamber.end_time)}
                  </td>

                  <td className="px-5 py-3 text-center  text-gray-600">
                    {chamber.fee} <span className="text-sm font-bo">TK</span>
                  </td>

                  <td className="px-5 py-3 text-center text-sm text-gray-600">
                    {chamber.avg_minutes_per_patient} min
                  </td>

                  <td className="px-5 py-3 text-center text-sm text-gray-600">
                    {chamber.max_patients ?? "Auto"}
                  </td>

                  <td className="px-5 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        chamber.is_active
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-gray-50 text-gray-500 border-gray-200"
                      }`}
                    >
                      {chamber.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-5 py-3">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/dashboard/chambers/edit-chamber/${chamber.id}`}
                      >
                        <button
                          className="rounded-lg p-2 cursor-pointer text-emerald-600 hover:bg-emerald-100 transition"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDeleteChamber(chamber)}
                        className="rounded-lg p-2 cursor-pointer text-red-600 hover:bg-red-100 transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-10 text-center text-gray-500">
                  No chambers scheduled yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllChambers;
