"use client";

import React, { RefObject, useState } from "react";
import { Printer, Download, Share2, Loader2 } from "lucide-react";
import { PrescriptionItem } from "@/src/types/prescriptionType";
import {
  downloadPrescriptionPDF,
  getPrescriptionPdfFile,
} from "@/src/utils/prescriptionPdf";

interface PrescriptionActionsProps {
  prescription: PrescriptionItem;
  documentRef: RefObject<HTMLDivElement | null>;
  shareUrl: string;
}

const filenameFor = (prescription: PrescriptionItem) =>
  `Prescription-${prescription.patient_name.replace(/\s+/g, "-")}-${prescription.prescription_date}.pdf`;

const PrescriptionActions: React.FC<PrescriptionActionsProps> = ({
  prescription,
  documentRef,
  shareUrl,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    if (!documentRef.current) return;
    setIsDownloading(true);
    try {
      await downloadPrescriptionPDF(documentRef.current, filenameFor(prescription));
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const shareText = `Prescription for ${prescription.patient_name} (${prescription.prescription_date}) from Dr. Anarul Islam.`;

    if (!documentRef.current) return;
    setIsSharing(true);
    try {
      const file = await getPrescriptionPdfFile(
        documentRef.current,
        filenameFor(prescription),
      );

      const canShareFiles =
        typeof navigator !== "undefined" &&
        "canShare" in navigator &&
        navigator.canShare?.({ files: [file] });

      if (canShareFiles && navigator.share) {
        await navigator.share({
          title: "Prescription",
          text: shareText,
          files: [file],
        });
        return;
      }
    } catch {
      // Web Share can throw on user cancel or lack of support — fall
      // through to the WhatsApp link fallback below either way.
    } finally {
      setIsSharing(false);
    }

    const waText = encodeURIComponent(`${shareText}\n${shareUrl}`);
    window.open(`https://wa.me/?text=${waText}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="print:hidden flex flex-wrap items-center justify-end gap-3 mb-6">
      <button
        type="button"
        onClick={handlePrint}
        className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
      >
        <Printer size={16} />
        Print
      </button>

      <button
        type="button"
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-60"
      >
        {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
        {isDownloading ? "Preparing..." : "Download PDF"}
      </button>

      <button
        type="button"
        onClick={handleShare}
        disabled={isSharing}
        className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition disabled:opacity-60"
      >
        {isSharing ? <Loader2 size={16} className="animate-spin" /> : <Share2 size={16} />}
        {isSharing ? "Preparing..." : "Share (WhatsApp)"}
      </button>
    </div>
  );
};

export default PrescriptionActions;
