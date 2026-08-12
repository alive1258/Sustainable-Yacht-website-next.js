"use client";

import React, { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useDebounce } from "@/src/hooks/useDebounce";
import { PrescriptionItem } from "@/src/types/prescriptionType";
import { ApiError } from "@/src/types/authType";
import Pagination from "@/src/utils/Pagination";
import {
  useDeletePrescriptionMutation,
  useGetAllPrescriptionsQuery,
} from "@/src/redux/api/prescriptionApi";

const LIMIT = 10;

const AllPrescriptions: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, isFetching, refetch } = useGetAllPrescriptionsQuery({
    search: (debouncedSearch as string) || undefined,
    page: currentPage,
    limit: LIMIT,
  });

  const [deletePrescription] = useDeletePrescriptionMutation();

  const prescriptions: PrescriptionItem[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handleDeletePrescription = async (prescription: PrescriptionItem) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete the prescription for "${prescription.patient_name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await deletePrescription(prescription.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Prescription for "${prescription.patient_name}" has been deleted.`,
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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Prescriptions</h1>
          <p className="text-sm text-gray-500">
            Write, manage, and share digital prescriptions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search patient name or phone..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full sm:w-72 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
          />

          <Link href="/dashboard/prescriptions/add-prescription">
            <button className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 transition w-full sm:w-auto">
              <Plus size={18} />
              New Prescription
            </button>
          </Link>
        </div>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                #
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Patient
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Diagnosis
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Rx / Tests
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Follow-up
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {prescriptions?.length > 0 ? (
              prescriptions.map((prescription, index) => (
                <tr
                  key={prescription.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-3 text-sm">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>

                  <td className="px-5 py-3 text-sm">
                    <p className="font-medium text-gray-800">
                      {prescription.patient_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {[
                        prescription.patient_age
                          ? `${prescription.patient_age}y`
                          : null,
                        prescription.patient_gender,
                        prescription.patient_phone,
                      ]
                        .filter(Boolean)
                        .join(" · ") || "—"}
                    </p>
                  </td>

                  <td className="px-5 py-3 text-sm text-gray-600 max-w-[220px] truncate">
                    {prescription.diagnosis || "—"}
                  </td>

                  <td className="px-5 py-3 text-center text-sm text-gray-600">
                    {prescription.medicines?.length || 0} /{" "}
                    {prescription.tests?.length || 0}
                  </td>

                  <td className="px-5 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {prescription.prescription_date}
                  </td>

                  <td className="px-5 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {prescription.follow_up_date || "—"}
                  </td>

                  <td className="px-5 py-3">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/dashboard/prescriptions/view-prescription/${prescription.id}`}
                      >
                        <button
                          className="rounded-lg p-2 cursor-pointer text-gray-600 hover:bg-gray-100 transition"
                          title="View / Print / Share"
                        >
                          <Eye size={18} />
                        </button>
                      </Link>

                      <Link
                        href={`/dashboard/prescriptions/edit-prescription/${prescription.id}`}
                      >
                        <button
                          className="rounded-lg p-2 cursor-pointer text-emerald-600 hover:bg-emerald-100 transition"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDeletePrescription(prescription)}
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
                <td colSpan={7} className="py-10 text-center text-gray-500">
                  No prescriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {prescriptions.length > 0 && (
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

export default AllPrescriptions;
