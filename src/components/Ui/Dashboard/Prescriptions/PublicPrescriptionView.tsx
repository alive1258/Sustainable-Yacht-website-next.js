"use client";

import React, { useRef } from "react";
import { Loader2, FileWarning } from "lucide-react";
import { useGetPrescriptionByShareTokenQuery } from "@/src/redux/api/prescriptionApi";
import PrescriptionDocument from "./PrescriptionDocument";
import PrescriptionActions from "./PrescriptionActions";

interface PublicPrescriptionViewProps {
  token: string;
}

const PublicPrescriptionView: React.FC<PublicPrescriptionViewProps> = ({
  token,
}) => {
  const { data, isLoading, isError } = useGetPrescriptionByShareTokenQuery(token);
  const documentRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading prescription...</span>
        </div>
      </div>
    );
  }

  const prescription = data?.data;

  if (isError || !prescription) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-gray-50 text-center px-4">
        <FileWarning className="h-10 w-10 text-gray-400" />
        <p className="text-gray-600">
          This prescription link is invalid or no longer available.
        </p>
      </div>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="mx-auto max-w-3xl">
        <PrescriptionActions
          prescription={prescription}
          documentRef={documentRef}
          shareUrl={shareUrl}
        />

        <div className="rounded-2xl border border-gray-200 shadow-sm print:border-0 print:shadow-none overflow-hidden">
          <PrescriptionDocument ref={documentRef} prescription={prescription} />
        </div>
      </div>
    </div>
  );
};

export default PublicPrescriptionView;
