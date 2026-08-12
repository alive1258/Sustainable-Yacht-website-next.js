"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { ApiError } from "@/src/types/authType";
import {
  AppointmentStatus,
  APPOINTMENT_STATUS_LABELS,
  AppointmentType,
  APPOINTMENT_TYPE_LABELS,
  Gender,
  GENDER_LABELS,
  PatientType,
} from "@/src/types/appointmentType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import {
  useGetSingleAppointmentQuery,
  useUpdateAppointmentMutation,
} from "@/src/redux/api/appointmentApi";
import { useGetActiveChambersQuery } from "@/src/redux/api/chamberApi";
import { WEEKDAY_LABELS } from "@/src/types/chamberType";

interface EditAppointmentProps {
  id: string;
}

interface EditAppointmentFormValues {
  full_name: string;
  phone: string;
  dob?: string;
  gender?: Gender | "";
  age_years?: string;
  age_months?: string;
  age_days?: string;
  patient_type: PatientType;
  notes?: string;
  appointment_date: string;
  chamber_id: string;
  status: AppointmentStatus;
  appointment_type: AppointmentType;
}

const ALL_APPOINTMENTS_PATH = "/dashboard/appointments/all-appointments";

const EditAppointment: React.FC<EditAppointmentProps> = ({ id }) => {
  const router = useRouter();

  const { data: appointmentData, isLoading: isFetching } =
    useGetSingleAppointmentQuery(id);
  const [updateAppointment, { isLoading: isUpdating }] =
    useUpdateAppointmentMutation();

  const { data: chambersData } = useGetActiveChambersQuery();
  const chambers = chambersData?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm<EditAppointmentFormValues>();

  const appointmentDate = watch("appointment_date");
  const chamberId = watch("chamber_id");
  const originalDate = appointmentData?.data?.appointment_date;
  const originalChamberId = appointmentData?.data?.chamber_id;
  const isRescheduling =
    (!!originalDate && appointmentDate !== originalDate) ||
    (!!originalChamberId && chamberId !== originalChamberId);

  const selectedChamber = chambers.find((c) => c.id === chamberId) || null;
  const chamberMismatch =
    !!appointmentDate &&
    !!selectedChamber &&
    selectedChamber.day_of_week !==
      new Date(`${appointmentDate}T00:00:00`).getDay();

  // chamber_id's own `validate` rule only re-runs when that field itself
  // changes — force a re-check whenever the date changes too, so a stale
  // chamber pick (selected before the date changed) gets flagged instead
  // of silently reaching submit.
  useEffect(() => {
    if (chamberId) trigger("chamber_id");
  }, [appointmentDate, chamberId, trigger]);

  useEffect(() => {
    if (appointmentData?.data) {
      const item = appointmentData.data;
      reset({
        full_name: item.full_name,
        phone: item.phone,
        dob: item.dob || "",
        gender: item.gender || "",
        age_years: item.age_years != null ? String(item.age_years) : "",
        age_months: item.age_months != null ? String(item.age_months) : "",
        age_days: item.age_days != null ? String(item.age_days) : "",
        patient_type: item.patient_type,
        notes: item.notes || "",
        appointment_date: item.appointment_date,
        chamber_id: item.chamber_id,
        status: item.status,
        appointment_type: item.appointment_type,
      });
    }
  }, [appointmentData, reset]);

  const onSubmit: SubmitHandler<EditAppointmentFormValues> = async (values) => {
    try {
      await updateAppointment({
        id,
        data: {
          full_name: values.full_name,
          phone: values.phone,
          dob: values.dob || undefined,
          gender: values.gender || undefined,
          age_years: values.age_years ? Number(values.age_years) : undefined,
          age_months: values.age_months ? Number(values.age_months) : undefined,
          age_days: values.age_days ? Number(values.age_days) : undefined,
          patient_type: values.patient_type,
          notes: values.notes || undefined,
          appointment_date: values.appointment_date,
          chamber_id: values.chamber_id,
          status: values.status,
          appointment_type: values.appointment_type,
        },
      }).unwrap();

      toast.success("Appointment updated successfully!");
      router.push(ALL_APPOINTMENTS_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update appointment.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading appointment details...</span>
        </div>
      </div>
    );
  }

  const appointment = appointmentData?.data;

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Appointment"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Appointments", link: ALL_APPOINTMENTS_PATH },
          { title: "Edit Appointment" },
        ]}
      />

      {appointment && (
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-1 rounded-lg bg-gray-50 border border-gray-200 p-4 text-sm text-gray-600">
          <span>
            Serial: <strong className="text-gray-900">#{appointment.serial_number}</strong>
          </span>
          <span>
            ETA: <strong className="text-gray-900">{appointment.estimated_time}</strong>
          </span>
          <span>
            Chamber:{" "}
            <strong className="text-gray-900">
              {appointment.chamber?.location_name || "N/A"}
            </strong>
          </span>
          <span>
            Source:{" "}
            <strong className="text-gray-900">
              {appointment.source === "staff" ? "Booked by staff" : "Online"}
            </strong>
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <Input
            label="Patient Full Name"
            text="full_name"
            register={register("full_name", {
              required: "Patient name is required",
            })}
            errors={errors}
          />

          {/* Phone */}
          <Input
            label="Phone Number"
            text="phone"
            register={register("phone", { required: "Phone number is required" })}
            errors={errors}
          />

          {/* DOB */}
          <Input
            label="Date of Birth (Optional)"
            text="dob"
            type="date"
            register={register("dob")}
            errors={errors}
            required={false}
          />

          {/* Gender */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Gender</label>
            <select
              {...register("gender")}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
            >
              <option value="">Select gender</option>
              {Object.entries(GENDER_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Age (Years / Months / Days) */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Age (Optional)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-1">
                <input
                  type="number"
                  min={0}
                  max={150}
                  placeholder="Years"
                  {...register("age_years")}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
                />
                <span className="text-[11px] text-gray-400 text-center">Years</span>
              </div>
              <div className="flex flex-col gap-1">
                <input
                  type="number"
                  min={0}
                  max={11}
                  placeholder="Months"
                  {...register("age_months")}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
                />
                <span className="text-[11px] text-gray-400 text-center">Months</span>
              </div>
              <div className="flex flex-col gap-1">
                <input
                  type="number"
                  min={0}
                  max={30}
                  placeholder="Days"
                  {...register("age_days")}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
                />
                <span className="text-[11px] text-gray-400 text-center">Days</span>
              </div>
            </div>
          </div>

          {/* Patient Type */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Patient Type
            </label>
            <select
              {...register("patient_type")}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
            >
              <option value="new">New Patient</option>
              <option value="returning">Returning Patient</option>
            </select>
          </div>

          {/* Appointment Type */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Appointment Type
            </label>
            <select
              {...register("appointment_type")}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
            >
              {Object.entries(APPOINTMENT_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Appointment Date */}
          <div className="flex flex-col gap-1">
            <Input
              label="Appointment Date"
              text="appointment_date"
              type="date"
              register={register("appointment_date", {
                required: "Please choose a date",
              })}
              errors={errors}
            />
            {appointmentDate && (
              <p className="text-xs text-gray-500">
                That&apos;s a{" "}
                {WEEKDAY_LABELS[new Date(`${appointmentDate}T00:00:00`).getDay()]}.
              </p>
            )}
          </div>

          {/* Chamber */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Chamber<span className="text-red-500 ml-0.5">*</span>
            </label>
            <select
              {...register("chamber_id", {
                required: "Please select a chamber",
                validate: (value) => {
                  if (!appointmentDate) return true;
                  const chamber = chambers.find((c) => c.id === value);
                  if (!chamber) return true;
                  const dayOfWeek = new Date(`${appointmentDate}T00:00:00`).getDay();
                  return (
                    chamber.day_of_week === dayOfWeek ||
                    `${chamber.location_name} isn't scheduled on that date's weekday`
                  );
                },
              })}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
            >
              {chambers.map((chamber) => (
                <option key={chamber.id} value={chamber.id}>
                  {WEEKDAY_LABELS[chamber.day_of_week]} — {chamber.location_name} (৳
                  {chamber.fee}, {chamber.start_time}–{chamber.end_time})
                </option>
              ))}
            </select>
            {errors.chamber_id && (
              <span className="text-xs text-red-500">
                {errors.chamber_id.message}
              </span>
            )}
          </div>

          {/* Reschedule / mismatch notes */}
          <div className="col-span-full flex flex-col gap-1">
            {chamberMismatch && (
              <p className="text-xs text-red-500">
                {selectedChamber?.location_name} isn&apos;t scheduled on{" "}
                {WEEKDAY_LABELS[new Date(`${appointmentDate}T00:00:00`).getDay()]}s —
                pick a date that falls on that chamber&apos;s weekday.
              </p>
            )}
            {!chamberMismatch && isRescheduling && (
              <p className="text-xs text-amber-600">
                Changing the date or chamber reassigns the serial number and ETA.
              </p>
            )}
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              {...register("status")}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
            >
              {Object.entries(APPOINTMENT_STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div className="col-span-full flex flex-col gap-1">
            <label htmlFor="notes" className="text-sm font-medium text-gray-700">
              Notes / Symptoms (Optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              maxLength={500}
              {...register("notes")}
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
            text={isUpdating ? "Updating..." : "Update Appointment"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditAppointment;
