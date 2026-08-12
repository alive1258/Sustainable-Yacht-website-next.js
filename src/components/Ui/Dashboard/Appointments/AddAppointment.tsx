"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Plus, ArrowLeft, CalendarClock } from "lucide-react";
import { toast } from "react-toastify";

import { ApiError } from "@/src/types/authType";
import {
  AppointmentType,
  APPOINTMENT_TYPE_LABELS,
  Gender,
  GENDER_LABELS,
  PatientType,
} from "@/src/types/appointmentType";
import { WEEKDAY_LABELS } from "@/src/types/chamberType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import { useCreateManualAppointmentMutation } from "@/src/redux/api/appointmentApi";
import { useGetActiveChambersQuery } from "@/src/redux/api/chamberApi";

interface AddAppointmentFormValues {
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
  appointment_type: AppointmentType;
}

const ALL_APPOINTMENTS_PATH = "/dashboard/appointments/all-appointments";
const todayISO = new Date().toISOString().slice(0, 10);
// Phone bookings skip the "Reason for Visit" picker — the backend still
// requires a non-empty service value, so every staff-created booking uses
// this fallback.
const DEFAULT_SERVICE = "General Consultation";

const AddAppointment = () => {
  const router = useRouter();
  const [createManualAppointment, { isLoading }] =
    useCreateManualAppointmentMutation();

  const { data: chambersData } = useGetActiveChambersQuery();
  const chambers = useMemo(() => chambersData?.data || [], [chambersData]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<AddAppointmentFormValues>({
    defaultValues: { patient_type: "new", appointment_type: "on-chamber" },
  });

  const appointmentDate = watch("appointment_date");
  const chamberId = watch("chamber_id");

  const appointmentWeekday =
    appointmentDate && !isNaN(new Date(`${appointmentDate}T00:00:00`).getTime())
      ? new Date(`${appointmentDate}T00:00:00`).getDay()
      : null;

  const chamberForDate = useMemo(() => {
    if (appointmentWeekday === null) return null;
    return chambers.find((c) => c.day_of_week === appointmentWeekday) || null;
  }, [appointmentWeekday, chambers]);

  // Date is the primary driver — every time it changes, snap the chamber
  // dropdown to whatever's scheduled that weekday (or clear it if nothing
  // is). Without the clear-on-no-match branch, a chamber picked for an
  // earlier date silently lingered selected after switching to a date with
  // no matching chamber, and only surfaced as a confusing error on submit.
  useEffect(() => {
    if (appointmentWeekday === null) return;
    setValue("chamber_id", chamberForDate?.id ?? "", { shouldValidate: true });
  }, [appointmentWeekday, chamberForDate, setValue]);

  // chamber_id's own `validate` rule only re-runs when that field itself
  // changes — force a re-check whenever the date changes too, so a stale
  // chamber pick (selected before the date changed) gets flagged instead
  // of silently reaching submit.
  useEffect(() => {
    if (chamberId) trigger("chamber_id");
  }, [appointmentDate, chamberId, trigger]);

  const selectedChamber = chambers.find((c) => c.id === chamberId) || null;
  const chamberMismatch =
    appointmentWeekday !== null &&
    !!selectedChamber &&
    selectedChamber.day_of_week !== appointmentWeekday;
  const noChamberForDate = appointmentWeekday !== null && !chamberForDate;

  const onSubmit: SubmitHandler<AddAppointmentFormValues> = async (values) => {
    try {
      await createManualAppointment({
        full_name: values.full_name,
        phone: values.phone,
        dob: values.dob || undefined,
        gender: values.gender || undefined,
        age_years: values.age_years ? Number(values.age_years) : undefined,
        age_months: values.age_months ? Number(values.age_months) : undefined,
        age_days: values.age_days ? Number(values.age_days) : undefined,
        service: DEFAULT_SERVICE,
        patient_type: values.patient_type,
        notes: values.notes || undefined,
        appointment_date: values.appointment_date,
        chamber_id: values.chamber_id || undefined,
        appointment_type: values.appointment_type,
      }).unwrap();

      toast.success("Appointment booked and confirmed!");
      reset();
      router.push(ALL_APPOINTMENTS_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Booking Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Something went wrong.",
        icon: "error",
      });
    }
  };

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Book Appointment for Patient"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Appointments", link: ALL_APPOINTMENTS_PATH },
          { title: "Book for Patient" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
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
            placeholder="01XXX-XXXXXX"
            register={register("phone", {
              required: "Phone number is required",
            })}
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
              defaultValue=""
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
                <span className="text-[11px] text-gray-400 text-center">
                  Years
                </span>
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
                <span className="text-[11px] text-gray-400 text-center">
                  Months
                </span>
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
                <span className="text-[11px] text-gray-400 text-center">
                  Days
                </span>
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
                min: { value: todayISO, message: "Date cannot be in the past" },
              })}
              errors={errors}
            />
            {appointmentWeekday !== null && (
              <p className="text-xs text-gray-500">
                That&apos;s a {WEEKDAY_LABELS[appointmentWeekday]}.
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
                  const dayOfWeek = new Date(
                    `${appointmentDate}T00:00:00`,
                  ).getDay();
                  return (
                    chamber.day_of_week === dayOfWeek ||
                    `${chamber.location_name} isn't scheduled on that date's weekday`
                  );
                },
              })}
              defaultValue=""
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
            >
              <option value="" disabled>
                Select a chamber
              </option>
              {chambers.map((chamber) => (
                <option key={chamber.id} value={chamber.id}>
                  {WEEKDAY_LABELS[chamber.day_of_week]} —{" "}
                  {chamber.location_name} (৳
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

          {/* Chamber / date consistency note */}
          <div className="col-span-full flex flex-col justify-center">
            {noChamberForDate ? (
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <CalendarClock size={18} className="shrink-0 mt-0.5" />
                <span>
                  No chamber is scheduled on{" "}
                  {WEEKDAY_LABELS[appointmentWeekday as number]}s — pick a
                  different date, or add a chamber for that day first.
                </span>
              </div>
            ) : chamberMismatch ? (
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <CalendarClock size={18} className="shrink-0 mt-0.5" />
                <span>
                  {selectedChamber?.location_name} isn&apos;t scheduled on{" "}
                  {WEEKDAY_LABELS[appointmentWeekday as number]}s — the date
                  must match the selected chamber&apos;s weekday.
                </span>
              </div>
            ) : (
              selectedChamber &&
              appointmentDate && (
                <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                  <CalendarClock size={18} className="shrink-0 mt-0.5" />
                  <span>
                    Serial number and estimated visit time are assigned on
                    submit.
                  </span>
                </div>
              )
            )}
          </div>

          {/* Notes */}
          <div className="col-span-full flex flex-col gap-1">
            <label
              htmlFor="notes"
              className="text-sm font-medium text-gray-700"
            >
              Notes / Symptoms (Optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              maxLength={500}
              placeholder="Briefly describe symptoms or reason for visit..."
              {...register("notes")}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </button>

          <GradientButton
            type="submit"
            text={isLoading ? "Booking..." : "Book Appointment"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddAppointment;
