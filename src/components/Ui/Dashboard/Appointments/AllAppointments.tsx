"use client";

import React, { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useDebounce } from "@/src/hooks/useDebounce";
import {
  AppointmentItem,
  AppointmentStatus,
  APPOINTMENT_STATUS_LABELS,
  AppointmentType,
  APPOINTMENT_TYPE_LABELS,
  GENDER_LABELS,
} from "@/src/types/appointmentType";
import { ApiError } from "@/src/types/authType";
import Pagination from "@/src/utils/Pagination";
import {
  useDeleteAppointmentMutation,
  useGetAllAppointmentsQuery,
  useUpdateAppointmentMutation,
} from "@/src/redux/api/appointmentApi";
import { useGetAllChambersQuery } from "@/src/redux/api/chamberApi";

const LIMIT = 15;

const STATUS_BADGE_STYLES: Record<AppointmentStatus, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed: "bg-blue-50 text-blue-700 border-blue-200",
  cancelled: "bg-gray-50 text-gray-500 border-gray-200",
  no_show: "bg-red-50 text-red-700 border-red-200",
};

const AllAppointments: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "">("");
  const [appointmentTypeFilter, setAppointmentTypeFilter] = useState<
    AppointmentType | ""
  >("");
  const [chamberFilter, setChamberFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data: chambersData } = useGetAllChambersQuery({ limit: 100 });
  const chambers = chambersData?.data || [];

  const { data, isLoading, isFetching, refetch } = useGetAllAppointmentsQuery({
    search: (debouncedSearch as string) || undefined,
    status: statusFilter || undefined,
    appointment_type: appointmentTypeFilter || undefined,
    chamber_id: chamberFilter || undefined,
    appointment_date: dateFilter || undefined,
    page: currentPage,
    limit: LIMIT,
  });

  const [updateAppointment] = useUpdateAppointmentMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();

  const appointments: AppointmentItem[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const resetToFirstPage = () => setCurrentPage(1);

  const handleStatusChange = async (
    appointment: AppointmentItem,
    status: AppointmentStatus,
  ) => {
    try {
      await updateAppointment({ id: appointment.id, data: { status } }).unwrap();
    } catch (err) {
      const apiError = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: apiError.data?.message || apiError.message || "Status update failed",
      });
    }
  };

  const handleDeleteAppointment = async (appointment: AppointmentItem) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete appointment for "${appointment.full_name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await deleteAppointment(appointment.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Appointment for "${appointment.full_name}" has been deleted.`,
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
        {[...Array(LIMIT)].map((_, i) => (
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
      <div className="flex flex-col gap-4 p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
            <p className="text-sm text-gray-500">
              Manage patient booking requests and the daily queue
            </p>
          </div>

          <Link href="/dashboard/appointments/add-appointment">
            <button className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 transition w-full sm:w-auto">
              <Plus size={18} />
              Book for Patient (Phone)
            </button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search name, phone, email..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              resetToFirstPage();
            }}
            className="w-full sm:w-64 rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
          />

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              resetToFirstPage();
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as AppointmentStatus | "");
              resetToFirstPage();
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
          >
            <option value="">All Statuses</option>
            {Object.entries(APPOINTMENT_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={appointmentTypeFilter}
            onChange={(e) => {
              setAppointmentTypeFilter(e.target.value as AppointmentType | "");
              resetToFirstPage();
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
          >
            <option value="">All Appointment Types</option>
            {Object.entries(APPOINTMENT_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={chamberFilter}
            onChange={(e) => {
              setChamberFilter(e.target.value);
              resetToFirstPage();
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
          >
            <option value="">All Chambers</option>
            {chambers.map((chamber) => (
              <option key={chamber.id} value={chamber.id}>
                {chamber.location_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Serial
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Patient
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Chamber
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Date &amp; ETA
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Source
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Type
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
            {appointments?.length > 0 ? (
              appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-3 text-center text-sm font-bold text-gray-800">
                    #{appointment.serial_number}
                  </td>

                  <td className="px-5 py-3 text-sm">
                    <p className="font-medium text-gray-800">
                      {appointment.full_name}
                    </p>
                    <p className="text-xs text-gray-500">{appointment.phone}</p>
                    {(appointment.gender ||
                      appointment.age_years != null ||
                      appointment.age_months != null ||
                      appointment.age_days != null) && (
                      <p className="text-xs text-gray-400">
                        {appointment.gender
                          ? GENDER_LABELS[appointment.gender]
                          : null}
                        {appointment.gender &&
                        (appointment.age_years != null ||
                          appointment.age_months != null ||
                          appointment.age_days != null)
                          ? " · "
                          : null}
                        {appointment.age_years != null ||
                        appointment.age_months != null ||
                        appointment.age_days != null
                          ? [
                              appointment.age_years != null
                                ? `${appointment.age_years}y`
                                : null,
                              appointment.age_months != null
                                ? `${appointment.age_months}m`
                                : null,
                              appointment.age_days != null
                                ? `${appointment.age_days}d`
                                : null,
                            ]
                              .filter(Boolean)
                              .join(" ")
                          : null}
                      </p>
                    )}
                  </td>

                  <td className="px-5 py-3 text-sm text-gray-600 max-w-[160px] truncate">
                    {appointment.chamber?.location_name || "N/A"}
                  </td>

                  <td className="px-5 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {appointment.appointment_date} · {appointment.estimated_time}
                  </td>

                  <td className="px-5 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                        appointment.source === "staff"
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : "bg-sky-50 text-sky-700 border-sky-200"
                      }`}
                    >
                      {appointment.source === "staff" ? "Phone" : "Online"}
                    </span>
                  </td>

                  <td className="px-5 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                        appointment.appointment_type === "online"
                          ? "bg-teal-50 text-teal-700 border-teal-200"
                          : "bg-indigo-50 text-indigo-700 border-indigo-200"
                      }`}
                    >
                      {APPOINTMENT_TYPE_LABELS[appointment.appointment_type]}
                    </span>
                  </td>

                  <td className="px-5 py-3 text-center">
                    <select
                      value={appointment.status}
                      onChange={(e) =>
                        handleStatusChange(
                          appointment,
                          e.target.value as AppointmentStatus,
                        )
                      }
                      className={`rounded-full border px-2.5 py-1 text-xs font-medium outline-none cursor-pointer ${STATUS_BADGE_STYLES[appointment.status]}`}
                    >
                      {Object.entries(APPOINTMENT_STATUS_LABELS).map(
                        ([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ),
                      )}
                    </select>
                  </td>

                  <td className="px-5 py-3">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/dashboard/appointments/edit-appointment/${appointment.id}`}
                      >
                        <button
                          className="rounded-lg p-2 cursor-pointer text-emerald-600 hover:bg-emerald-100 transition"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDeleteAppointment(appointment)}
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
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {appointments.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalResults={totalItems}
          limit={LIMIT}
          isFetching={isFetching}
        />
      )}
    </div>
  );
};

export default AllAppointments;
