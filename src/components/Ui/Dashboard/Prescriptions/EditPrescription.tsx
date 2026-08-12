"use client";

/* eslint-disable react-hooks/incompatible-library */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { ApiError } from "@/src/types/authType";
import {
  PatientGender,
  PrescriptionMedicineItem,
  PrescriptionTestItem,
} from "@/src/types/prescriptionType";
import { AppointmentItem } from "@/src/types/appointmentType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import MedicineRowEditor from "./MedicineRowEditor";
import TestRowEditor from "./TestRowEditor";
import AppointmentPickerSelect from "./AppointmentPickerSelect";
import {
  useGetSinglePrescriptionQuery,
  useUpdatePrescriptionMutation,
} from "@/src/redux/api/prescriptionApi";

const calculateAge = (dob?: string): number | undefined => {
  if (!dob) return undefined;
  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) return undefined;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 0 ? age : undefined;
};

interface EditPrescriptionProps {
  id: string;
}

interface EditPrescriptionFormValues {
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

const ALL_PRESCRIPTIONS_PATH = "/dashboard/prescriptions/all-prescriptions";

const EditPrescription: React.FC<EditPrescriptionProps> = ({ id }) => {
  const router = useRouter();

  const [medicines, setMedicines] = useState<PrescriptionMedicineItem[]>([]);
  const [tests, setTests] = useState<PrescriptionTestItem[]>([]);
  const [appointmentId, setAppointmentId] = useState<string | undefined>();

  const { data: prescriptionData, isLoading: isFetching } =
    useGetSinglePrescriptionQuery(id);
  const [updatePrescription, { isLoading: isUpdating }] =
    useUpdatePrescriptionMutation();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<EditPrescriptionFormValues>();

  useEffect(() => {
    if (prescriptionData?.data) {
      const item = prescriptionData.data;
      reset({
        patient_name: item.patient_name,
        patient_age: item.patient_age,
        patient_gender: item.patient_gender,
        patient_phone: item.patient_phone || "",
        patient_address: item.patient_address || "",
        diagnosis: item.diagnosis || "",
        advice: item.advice || "",
        follow_up_date: item.follow_up_date || "",
        prescription_date: item.prescription_date,
      });
      setMedicines(item.medicines || []);
      setTests(item.tests || []);
      setAppointmentId(item.appointment_id);
    }
  }, [prescriptionData, reset]);

  const handlePickAppointment = (appointment: AppointmentItem | null) => {
    if (!appointment) {
      setAppointmentId(undefined);
      return;
    }

    setAppointmentId(appointment.id);

    setValue("patient_name", appointment.full_name, { shouldValidate: true });
    setValue("patient_phone", appointment.phone);

    const age = calculateAge(appointment.dob);
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

  const onSubmit: SubmitHandler<EditPrescriptionFormValues> = async (values) => {
    try {
      await updatePrescription({
        id,
        data: {
          patient_name: values.patient_name,
          patient_age: values.patient_age || undefined,
          patient_gender: values.patient_gender || undefined,
          patient_phone: values.patient_phone || undefined,
          patient_address: values.patient_address || undefined,
          appointment_id: appointmentId,
          diagnosis: values.diagnosis || undefined,
          medicines,
          tests,
          advice: values.advice || undefined,
          follow_up_date: values.follow_up_date || undefined,
          prescription_date: values.prescription_date,
        },
      }).unwrap();

      toast.success("Prescription updated successfully!");
      router.push(ALL_PRESCRIPTIONS_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update prescription.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading prescription details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Prescription"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Prescriptions", link: ALL_PRESCRIPTIONS_PATH },
          { title: "Edit Prescription" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        {/* Link to Appointment */}
        <AppointmentPickerSelect value={appointmentId} onChange={handlePickAppointment} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Name */}
          <Input
            label="Patient Name"
            text="patient_name"
            register={register("patient_name", {
              required: "Patient name is required",
            })}
            errors={errors}
          />

          {/* Age */}
          <Input
            label="Age (Optional)"
            text="patient_age"
            type="number"
            register={register("patient_age", { valueAsNumber: true })}
            errors={errors}
            required={false}
          />

          {/* Gender */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Gender (Optional)
            </label>
            <select
              {...register("patient_gender")}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
            >
              <option value="">Not specified</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Phone */}
          <Input
            label="Phone (Optional)"
            text="patient_phone"
            register={register("patient_phone")}
            errors={errors}
            required={false}
          />

          {/* Prescription Date */}
          <Input
            label="Prescription Date"
            text="prescription_date"
            type="date"
            register={register("prescription_date", {
              required: "Prescription date is required",
            })}
            errors={errors}
          />

          {/* Follow-up Date */}
          <Input
            label="Follow-up Date (Optional)"
            text="follow_up_date"
            type="date"
            register={register("follow_up_date")}
            errors={errors}
            required={false}
          />

          {/* Address */}
          <div className="col-span-full flex flex-col gap-1">
            <label htmlFor="patient_address" className="text-sm font-medium text-gray-700">
              Address (Optional)
            </label>
            <textarea
              id="patient_address"
              rows={2}
              {...register("patient_address")}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
            />
          </div>

          {/* Diagnosis */}
          <div className="col-span-full flex flex-col gap-1">
            <label htmlFor="diagnosis" className="text-sm font-medium text-gray-700">
              Diagnosis / Chief Complaints (Optional)
            </label>
            <textarea
              id="diagnosis"
              rows={2}
              {...register("diagnosis")}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
            />
          </div>

          {/* Medicines & Tests */}
          <div className="col-span-full flex flex-col gap-4">
            <MedicineRowEditor rows={medicines} onChange={setMedicines} />
            <TestRowEditor rows={tests} onChange={setTests} />
          </div>

          {/* Advice */}
          <div className="col-span-full flex flex-col gap-1">
            <label htmlFor="advice" className="text-sm font-medium text-gray-700">
              Advice (Optional)
            </label>
            <textarea
              id="advice"
              rows={3}
              {...register("advice")}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-5 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition text-sm font-medium text-gray-700 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </button>

          <GradientButton
            type="submit"
            text={isUpdating ? "Updating..." : "Update Prescription"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditPrescription;
