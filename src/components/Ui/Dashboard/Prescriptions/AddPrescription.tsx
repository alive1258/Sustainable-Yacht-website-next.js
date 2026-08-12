/* eslint-disable react-hooks/incompatible-library */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import {
  Plus,
  ArrowLeft,
  Save,
  Printer,
  Download,
  Share2,
  FileText,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

import { ApiError } from "@/src/types/authType";
import {
  PatientGender,
  PrescriptionChiefComplaintItem,
  PrescriptionMedicineItem,
  PrescriptionTestItem,
} from "@/src/types/prescriptionType";
import { AppointmentItem } from "@/src/types/appointmentType";
import { DOCTOR_PROFILE } from "@/src/constants/doctorProfile";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import TestRowEditor from "./TestRowEditor";
import AppointmentPickerSelect from "./AppointmentPickerSelect";
import ChiefComplaintsModal from "./ChiefComplaintsModal";
import { useCreatePrescriptionMutation } from "@/src/redux/api/prescriptionApi";

const calculateAge = (dob?: string): number | undefined => {
  if (!dob) return undefined;
  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) return undefined;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age >= 0 ? age : undefined;
};

interface AddPrescriptionFormValues {
  patient_name: string;
  patient_age?: number;
  patient_gender?: PatientGender;
  patient_phone?: string;
  patient_address?: string;
  diagnosis?: string;
  advice?: string;
  follow_up_date?: string;
  prescription_date: string;
}

// Left rail: quick-jump shortcuts into the sections we actually support today,
// plus the sections planned for later that render an honest "not available
// yet" placeholder instead of pretending to save data nowhere.
const LEFT_NAV_ITEMS = [
  { key: "prescription_log", label: "Prescription Log" },
  { key: "template_log", label: "Template Log" },
  { key: "chief_complaints", label: "Chief Complaints" },
  { key: "history", label: "History Of" },
  { key: "gyne_obs", label: "Gyne. & Obs. History" },
  { key: "examination", label: "On Examination" },
  { key: "pedz_calculator", label: "Pedz Calculator" },
  { key: "breast_examination", label: "Breast Examination" },
  { key: "local_examination", label: "Local Examination" },
  { key: "lab_reports", label: "Previous Lab Reports" },
  { key: "diagnosis", label: "Diagnosis" },
  { key: "treatment_plan", label: "Treatment Plan" },
  { key: "referred_by", label: "Referred By" },
] as const;

const RIGHT_TABS = [
  { key: "rx", label: "Rx" },
  { key: "advice", label: "Advice" },
  { key: "special_notes", label: "Special Notes" },
  { key: "investigation", label: "Investigation" },
  { key: "follow_up", label: "Follow Up" },
  { key: "referred_to", label: "Referred To" },
  { key: "medical_doc", label: "Medical Doc" },
  { key: "attachment", label: "Attachment" },
] as const;

type SectionKey =
  | (typeof LEFT_NAV_ITEMS)[number]["key"]
  | (typeof RIGHT_TABS)[number]["key"];

const SUPPORTED_SECTIONS = new Set<SectionKey>([
  "chief_complaints",
  "diagnosis",
  "rx",
  "advice",
  "investigation",
  "follow_up",
]);

const DURATION_UNIT_LABELS: Record<string, string> = {
  day: "Day",
  week: "Week",
  month: "Month",
  year: "Year",
};

const ALL_PRESCRIPTIONS_PATH = "/dashboard/prescriptions/all-prescriptions";
const todayISO = new Date().toISOString().slice(0, 10);

const AddPrescription = () => {
  const router = useRouter();

  const [medicines, setMedicines] = useState<PrescriptionMedicineItem[]>([]);
  const [tests, setTests] = useState<PrescriptionTestItem[]>([]);
  const [chiefComplaints, setChiefComplaints] = useState<
    PrescriptionChiefComplaintItem[]
  >([]);
  const [isComplaintsModalOpen, setIsComplaintsModalOpen] = useState(false);
  const [appointmentId, setAppointmentId] = useState<string | undefined>();
  const [visitNo, setVisitNo] = useState<number | undefined>();
  const [activeSection, setActiveSection] = useState<SectionKey>("rx");

  const [createPrescription, { isLoading }] = useCreatePrescriptionMutation();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddPrescriptionFormValues>({
    defaultValues: { prescription_date: todayISO },
  });

  const patientGender = watch("patient_gender");

  const handlePickAppointment = (appointment: AppointmentItem | null) => {
    if (!appointment) {
      setAppointmentId(undefined);
      setVisitNo(undefined);
      return;
    }

    setAppointmentId(appointment.id);
    setVisitNo(appointment.serial_number);

    setValue("patient_name", appointment.full_name, { shouldValidate: true });
    setValue("patient_phone", appointment.phone);

    if (appointment.gender) {
      setValue("patient_gender", appointment.gender);
    }

    const age = appointment.age_years ?? calculateAge(appointment.dob);
    if (age !== undefined) {
      setValue("patient_age", age);
    }

    // Give the doctor a starting point rather than overwriting anything
    // they've already typed.
    if (!getValues("diagnosis")?.trim()) {
      const draftDiagnosis = [
        `Reason for visit: ${appointment.service}.`,
        appointment.notes ? `Patient notes: ${appointment.notes}` : null,
      ]
        .filter(Boolean)
        .join(" ");
      setValue("diagnosis", draftDiagnosis);
    }
  };

  const handleNewPrescription = () => {
    reset({ prescription_date: todayISO });
    setMedicines([]);
    setTests([]);
    setChiefComplaints([]);
    setAppointmentId(undefined);
    setVisitNo(undefined);
    setActiveSection("rx");
  };

  const onSubmit: SubmitHandler<AddPrescriptionFormValues> = async (values) => {
    try {
      await createPrescription({
        patient_name: values.patient_name,
        patient_age: values.patient_age || undefined,
        patient_gender: values.patient_gender || undefined,
        patient_phone: values.patient_phone || undefined,
        patient_address: values.patient_address || undefined,
        appointment_id: appointmentId,
        diagnosis: values.diagnosis || undefined,
        chief_complaints: chiefComplaints.length ? chiefComplaints : undefined,
        medicines,
        tests,
        advice: values.advice || undefined,
        follow_up_date: values.follow_up_date || undefined,
        prescription_date: values.prescription_date,
      }).unwrap();

      toast.success("Prescription created successfully!");
      handleNewPrescription();
      router.push(ALL_PRESCRIPTIONS_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Submission Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Something went wrong.",
        icon: "error",
      });
    }
  };

  const navButtonClass = (key: SectionKey) =>
    `w-full rounded-md px-3 py-2 text-left text-sm transition ${
      activeSection === key
        ? "bg-emerald-600 text-white font-medium"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <PageHeader
          title="New Prescription"
          breadcrumbs={[
            { title: "Dashboard", link: "/dashboard" },
            { title: "Prescriptions", link: ALL_PRESCRIPTIONS_PATH },
            { title: "New Prescription" },
          ]}
        />
        <AppointmentPickerSelect
          value={appointmentId}
          onChange={handlePickAppointment}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        {/* Link to Appointment */}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[200px_1fr_220px] items-start">
          {/* LEFT: section shortcuts */}
          <aside className="rounded-lg border border-gray-200 bg-gray-50 p-2 lg:sticky lg:top-4">
            <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Sections
            </p>
            <nav className="flex flex-col gap-0.5">
              {LEFT_NAV_ITEMS.map((item, index) => (
                <button
                  key={`${item.key}-${index}`}
                  type="button"
                  onClick={() => setActiveSection(item.key)}
                  className={navButtonClass(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* CENTER: prescription document — fluid width, min-height keeps A4 proportions on larger screens without hardcoding a fixed size on mobile */}
          <div className="flex w-full min-h-[297mm] flex-col rounded-lg border border-gray-200 bg-white overflow-hidden">
            {/* Letterhead */}
            <div className="flex flex-wrap items-start justify-between gap-3 border-b-2 border-emerald-600 bg-white p-5">
              <div>
                <h2 className="text-lg font-bold text-black">
                  {DOCTOR_PROFILE.name}
                </h2>
                <p className="mt-0.5 text-sm text-gray-600">
                  {DOCTOR_PROFILE.qualifications}
                </p>
                <p className="text-xs text-gray-500">
                  {DOCTOR_PROFILE.affiliation}
                </p>
              </div>
              <span className="inline-block rounded bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-emerald-700">
                New Prescription
              </span>
            </div>

            {/* Patient strip */}
            <div className="grid grid-cols-2 gap-4 border-b border-gray-200 bg-gray-50 p-4 sm:grid-cols-3 lg:grid-cols-5">
              <div className="col-span-2 flex flex-col gap-0.5 sm:col-span-1">
                <label
                  htmlFor="patient_name"
                  className="text-[11px] uppercase tracking-wide text-gray-400"
                >
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="patient_name"
                  {...register("patient_name", {
                    required: "Patient name is required",
                  })}
                  className={`border-b bg-transparent px-0.5 py-1 text-sm font-semibold text-black outline-none focus:border-emerald-600 ${
                    errors.patient_name ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {errors.patient_name?.message && (
                  <span className="text-xs text-red-500">
                    {String(errors.patient_name.message)}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-0.5">
                <label
                  htmlFor="patient_age"
                  className="text-[11px] uppercase tracking-wide text-gray-400"
                >
                  Age
                </label>
                <input
                  id="patient_age"
                  type="number"
                  {...register("patient_age", { valueAsNumber: true })}
                  className="border-b border-gray-300 bg-transparent px-0.5 py-1 text-sm font-semibold text-black outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] uppercase tracking-wide text-gray-400">
                  Sex
                </span>

                <span className="border-b border-transparent px-0.5 py-1 text-sm font-semibold capitalize text-black">
                  {patientGender || "—"}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] uppercase tracking-wide text-gray-400">
                  Visit No
                </span>
                <span className="border-b border-transparent px-0.5 py-1 text-sm font-semibold text-black">
                  {visitNo ?? "—"}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <label
                  htmlFor="prescription_date"
                  className="text-[11px] uppercase tracking-wide text-gray-400"
                >
                  Date<span className="text-red-500">*</span>
                </label>
                <input
                  id="prescription_date"
                  type="date"
                  {...register("prescription_date", {
                    required: "Prescription date is required",
                  })}
                  className={`border-b bg-transparent px-0.5 py-1 text-sm font-semibold text-black outline-none focus:border-emerald-600 ${
                    errors.prescription_date
                      ? "border-red-400"
                      : "border-gray-300"
                  }`}
                />
              </div>
            </div>

            {/* Active section content middle*/}
            <div className="grid min-h-0 flex-1 grid-cols-4 grid-rows-[1fr] gap-3 p-5">
              <div className="col-span-1 border-r-2 border-gray-200 pr-3">
                {activeSection === "chief_complaints" && (
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-gray-700">
                      Chief complaints:
                    </p>

                    {chiefComplaints.length === 0 ? (
                      <p className="text-sm italic text-gray-400">
                        No chief complaints added yet.
                      </p>
                    ) : (
                      <ul className="flex flex-col gap-1.5">
                        {chiefComplaints.map((item) => (
                          <li
                            key={item.name}
                            className="flex items-center gap-2 text-sm text-gray-700"
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setChiefComplaints((prev) =>
                                  prev.filter((c) => c.name !== item.name),
                                )
                              }
                              aria-label={`Remove ${item.name}`}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <X size={14} />
                            </button>
                            <span>
                              {item.name}
                              {item.duration_value && item.duration_unit && (
                                <span className="text-gray-400">
                                  {" "}
                                  - {item.duration_value}{" "}
                                  {DURATION_UNIT_LABELS[item.duration_unit]}(s)
                                </span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <button
                      type="button"
                      onClick={() => setIsComplaintsModalOpen(true)}
                      className="mt-1 flex w-fit items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800"
                    >
                      <Plus size={14} />
                      Add complaint
                    </button>
                  </div>
                )}
              </div>

              <div className="col-span-3">
                {activeSection === "diagnosis" && (
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="diagnosis"
                      className="text-sm font-medium text-gray-700"
                    >
                      Diagnosis (Optional)
                    </label>
                    <textarea
                      id="diagnosis"
                      rows={8}
                      placeholder="e.g. Recurrent tension headaches, no red-flag symptoms."
                      {...register("diagnosis")}
                      className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
                    />
                  </div>
                )}

                {activeSection === "advice" && (
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="advice"
                      className="text-sm font-medium text-gray-700"
                    >
                      Advice (Optional)
                    </label>
                    <textarea
                      id="advice"
                      rows={8}
                      placeholder="e.g. Adequate hydration, reduce screen time, avoid skipping meals."
                      {...register("advice")}
                      className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
                    />
                  </div>
                )}

                {activeSection === "investigation" && (
                  <TestRowEditor rows={tests} onChange={setTests} />
                )}

                {activeSection === "follow_up" && (
                  <Input
                    label="Follow-up Date (Optional)"
                    text="follow_up_date"
                    type="date"
                    register={register("follow_up_date")}
                    errors={errors}
                    required={false}
                    className="max-w-xs"
                  />
                )}

                {!SUPPORTED_SECTIONS.has(activeSection) && (
                  <p className="text-sm italic text-gray-400">
                    This section isn&apos;t wired up yet — coming in a future
                    update.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: actions + tabs */}
          <aside className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 rounded-lg border border-gray-200 p-2">
              <button
                type="button"
                onClick={handleNewPrescription}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-100"
              >
                <Plus size={16} />
                New Prescription
              </button>
              <GradientButton
                type="submit"
                text={isLoading ? "Saving..." : "Save"}
                icon={Save}
                disabled={isLoading}
                className="w-full"
              />
              {[
                { label: "Print", icon: Printer },
                { label: "Download", icon: Download },
                { label: "Share", icon: Share2 },
                { label: "Save Template", icon: FileText },
              ].map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  disabled
                  title="Available after the prescription is saved"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-400 cursor-not-allowed"
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>

            <div className="rounded-lg border border-gray-200 p-2">
              <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Sections
              </p>
              <nav className="flex flex-col gap-0.5">
                {RIGHT_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveSection(tab.key)}
                    className={navButtonClass(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        </div>

        {/* Cancel */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </button>
        </div>
      </form>

      <ChiefComplaintsModal
        isOpen={isComplaintsModalOpen}
        initialItems={chiefComplaints}
        onClose={() => setIsComplaintsModalOpen(false)}
        onSave={setChiefComplaints}
      />
    </div>
  );
};

export default AddPrescription;
