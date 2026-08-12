import React, { forwardRef } from "react";
import { PrescriptionItem } from "@/src/types/prescriptionType";
import { DOCTOR_PROFILE } from "@/src/constants/doctorProfile";

interface PrescriptionDocumentProps {
  prescription: PrescriptionItem;
}

const formatDate = (dateStr?: string) =>
  dateStr
    ? new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

/**
 * Canonical prescription layout — used on-screen (dashboard view + public
 * share page), captured by html2canvas for the PDF download, and printed
 * directly via window.print(). One template, three output paths.
 */
const PrescriptionDocument = forwardRef<HTMLDivElement, PrescriptionDocumentProps>(
  ({ prescription }, ref) => {
    const {
      patient_name,
      patient_age,
      patient_gender,
      patient_phone,
      patient_address,
      diagnosis,
      medicines,
      tests,
      advice,
      follow_up_date,
      prescription_date,
    } = prescription;

    return (
      <div
        ref={ref}
        className="mx-auto w-full max-w-3xl bg-white text-black p-8 sm:p-10"
      >
        {/* LETTERHEAD */}
        <div className="flex items-start justify-between border-b-2 border-[#2AA7FF] pb-4">
          <div>
            <h1 className="text-xl font-bold text-black">{DOCTOR_PROFILE.name}</h1>
            <p className="mt-0.5 text-sm text-gray-600">{DOCTOR_PROFILE.qualifications}</p>
            <p className="text-xs text-gray-500">{DOCTOR_PROFILE.affiliation}</p>
          </div>
          <div className="text-right">
            <span className="inline-block rounded bg-[#2AA7FF]/10 px-3 py-1 text-xs font-semibold text-[#2AA7FF]">
              Digital Prescription
            </span>
            <p className="mt-2 text-xs text-gray-500">
              Date: {formatDate(prescription_date)}
            </p>
          </div>
        </div>

        {/* PATIENT INFO */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-lg bg-gray-50 border border-gray-200 p-4 text-sm">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-gray-400">Patient</p>
            <p className="font-semibold text-black">{patient_name}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-gray-400">Age / Gender</p>
            <p className="font-semibold text-black">
              {patient_age ? `${patient_age}y` : "—"}
              {patient_gender ? ` / ${patient_gender}` : ""}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-gray-400">Phone</p>
            <p className="font-semibold text-black">{patient_phone || "—"}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-gray-400">Address</p>
            <p className="font-semibold text-black truncate">
              {patient_address || "—"}
            </p>
          </div>
        </div>

        {/* DIAGNOSIS */}
        {diagnosis && (
          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Diagnosis / Chief Complaints
            </p>
            <p className="mt-1 text-sm text-gray-800 leading-relaxed">{diagnosis}</p>
          </div>
        )}

        {/* MEDICINES */}
        <div className="mt-6">
          <p className="text-2xl font-serif italic text-[#2AA7FF]">℞</p>
          {medicines && medicines.length > 0 ? (
            <table className="mt-2 w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-300 text-left text-xs uppercase tracking-wide text-gray-500">
                  <th className="py-2 pr-2 w-6">#</th>
                  <th className="py-2 pr-2">Medicine</th>
                  <th className="py-2 pr-2">Dosage</th>
                  <th className="py-2 pr-2">Frequency</th>
                  <th className="py-2 pr-2">Duration</th>
                  <th className="py-2">Instructions</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-2 pr-2 text-gray-500">{index + 1}</td>
                    <td className="py-2 pr-2 font-semibold text-black">{med.name}</td>
                    <td className="py-2 pr-2 text-gray-700">{med.dosage || "—"}</td>
                    <td className="py-2 pr-2 text-gray-700">{med.frequency || "—"}</td>
                    <td className="py-2 pr-2 text-gray-700">{med.duration || "—"}</td>
                    <td className="py-2 text-gray-700">{med.instructions || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-1 text-sm text-gray-400 italic">No medicines prescribed.</p>
          )}
        </div>

        {/* TESTS */}
        {tests && tests.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Advised Tests
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              {tests.map((test, index) => (
                <li key={index} className="text-gray-800">
                  <span className="font-semibold text-black">{index + 1}. {test.name}</span>
                  {test.instructions && (
                    <span className="text-gray-500"> — {test.instructions}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ADVICE */}
        {advice && (
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Advice
            </p>
            <p className="mt-1 text-sm text-gray-800 leading-relaxed">{advice}</p>
          </div>
        )}

        {/* FOLLOW-UP */}
        {follow_up_date && (
          <div className="mt-6 inline-block rounded-lg border border-[#2AA7FF]/30 bg-[#2AA7FF]/5 px-4 py-2">
            <p className="text-xs text-gray-500">Follow-up Date</p>
            <p className="text-sm font-semibold text-black">
              {formatDate(follow_up_date)}
            </p>
          </div>
        )}

        {/* SIGNATURE */}
        <div className="mt-16 flex justify-end">
          <div className="text-center">
            <div className="w-48 border-t border-gray-400 pt-1">
              <p className="text-sm font-semibold text-black">{DOCTOR_PROFILE.name}</p>
              <p className="text-xs text-gray-500">BMDC Reg. No.: ____________</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

PrescriptionDocument.displayName = "PrescriptionDocument";

export default PrescriptionDocument;
