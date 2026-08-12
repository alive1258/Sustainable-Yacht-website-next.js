"use client";

import React, { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useDebounce } from "@/src/hooks/useDebounce";
import { EducationItem } from "@/src/types/educationType";
import { ApiError } from "@/src/types/authType";
import Pagination from "@/src/utils/Pagination";
import {
  useDeleteEducationMutation,
  useGetAllEducationQuery,
} from "@/src/redux/api/educationApi";

const LIMIT = 10;

const groupCount = (item: EducationItem) =>
  (item.education?.length || 0) +
  (item.certificates?.length || 0) +
  (item.awards?.length || 0) +
  (item.experience?.length || 0) +
  (item.leadership?.length || 0);

const AllEducation: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, isFetching, refetch } = useGetAllEducationQuery({
    search: (debouncedSearch as string) || undefined,
    page: currentPage,
    limit: LIMIT,
  });

  const [deleteEducation] = useDeleteEducationMutation();

  const educations: EducationItem[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  const handleDeleteEducation = async (education: EducationItem) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete education section "${education.heading}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await deleteEducation(education.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Education section "${education.heading}" has been deleted.`,
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
          <h1 className="text-2xl font-semibold text-gray-900">
            Education Section
          </h1>
          <p className="text-sm text-gray-500">
            Manage qualifications, certifications, experience & leadership
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search education entries..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full sm:w-72 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
          />

          <Link href="/dashboard/education/add-education">
            <button className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 transition w-full sm:w-auto">
              <Plus size={18} />
              Add Education
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
                Heading
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Eyebrow
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Rows
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Position
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Created
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {educations?.length > 0 ? (
              educations.map((education, index) => (
                <tr
                  key={education.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-3 text-sm">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>

                  <td className="px-5 py-3 text-sm font-medium text-gray-800 max-w-xs truncate">
                    {education.heading}
                  </td>

                  <td className="px-5 py-3 text-sm text-gray-600 max-w-xs truncate">
                    {education.eyebrow || "N/A"}
                  </td>

                  <td className="px-5 py-3 text-center text-sm text-gray-600">
                    {groupCount(education)}
                  </td>

                  <td className="px-5 py-3 text-center text-sm text-gray-600">
                    {education.position}
                  </td>

                  <td className="px-5 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        education.is_active
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-gray-50 text-gray-500 border-gray-200"
                      }`}
                    >
                      {education.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-5 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {new Date(education.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-3">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/dashboard/education/edit-education/${education.id}`}
                      >
                        <button
                          className="rounded-lg p-2 cursor-pointer text-emerald-600 hover:bg-emerald-100 transition"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDeleteEducation(education)}
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
                  No education entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {educations.length > 0 && (
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

export default AllEducation;
