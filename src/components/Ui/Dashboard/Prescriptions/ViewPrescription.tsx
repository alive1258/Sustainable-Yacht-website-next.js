"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Edit, Loader2 } from "lucide-react";
import { useGetSinglePrescriptionQuery } from "@/src/redux/api/prescriptionApi";
import PrescriptionDocument from "./PrescriptionDocument";
import PrescriptionActions from "./PrescriptionActions";

interface ViewPrescriptionProps {
  id: string;
}

const ALL_PRESCRIPTIONS_PATH = "/dashboard/prescriptions/all-prescriptions";

const ViewPrescription: React.FC<ViewPrescriptionProps> = ({ id }) => {
  const { data, isLoading } = useGetSinglePrescriptionQuery(id);
  const documentRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading prescription...</span>
        </div>
      </div>
    );
  }

  const prescription = data?.data;
  if (!prescription) return null;

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/prescription/${prescription.share_token}`
      : "";

  return (
    <div>
      <div className="print:hidden flex items-center justify-between mb-6">
        <Link
          href={ALL_PRESCRIPTIONS_PATH}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to Prescriptions
        </Link>

        <Link
          href={`/dashboard/prescriptions/edit-prescription/${prescription.id}`}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          <Edit size={16} />
          Edit
        </Link>
      </div>

      <PrescriptionActions
        prescription={prescription}
        documentRef={documentRef}
        shareUrl={shareUrl}
      />

      <div className="rounded-2xl border border-gray-200 shadow-sm print:border-0 print:shadow-none overflow-hidden">
        <PrescriptionDocument ref={documentRef} prescription={prescription} />
      </div>
    </div>
  );
};

export default ViewPrescription;
