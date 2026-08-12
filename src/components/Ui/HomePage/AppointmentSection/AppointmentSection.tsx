"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Phone,
  Mail,
  Cake,
  CalendarDays,
  Clock,
  StickyNote,
  CheckCircle2,
  Loader2,
  PhoneCall,
  Sparkles,
  MapPin,
} from "lucide-react";
import { useCreateAppointmentMutation } from "@/src/redux/api/appointmentApi";
import { useGetActiveChambersQuery } from "@/src/redux/api/chamberApi";
import { useGetActiveServicesQuery } from "@/src/redux/api/serviceApi";
import { AppointmentItem } from "@/src/types/appointmentType";
import { WEEKDAY_LABELS } from "@/src/types/chamberType";
import { ApiError } from "@/src/types/authType";

/* ================= TYPES ================= */
type PatientType = "new" | "returning";

interface AppointmentForm {
  fullName: string;
  phone: string;
  email: string;
  dob: string;
  service: string;
  preferredDate: string;
  patientType: PatientType;
  notes?: string;
}

/* ================= CONSTANTS ================= */
// TODO: replace with the clinic's real phone/WhatsApp number (same as Navbar)
const CONTACT_PHONE = "+880 1XXX-XXXXXX";

const todayISO = new Date().toISOString().slice(0, 10);

const formatDate = (dateStr: string) =>
  new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

/* ================= COMPONENT ================= */
const AppointmentSection = () => {
  const [confirmation, setConfirmation] = useState<AppointmentItem | null>(null);

  const { data: chambersData, isLoading: chambersLoading } =
    useGetActiveChambersQuery();
  const chambers = useMemo(() => chambersData?.data || [], [chambersData]);

  const { data: servicesData } = useGetActiveServicesQuery();
  const services = servicesData?.data || [];

  const [createAppointment] = useCreateAppointmentMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentForm>({
    defaultValues: { patientType: "new" },
  });

  const preferredDate = watch("preferredDate");

  const chamberPreview = useMemo(() => {
    if (!preferredDate) return null;
    const dayOfWeek = new Date(`${preferredDate}T00:00:00`).getDay();
    return chambers.find((c) => c.day_of_week === dayOfWeek) || null;
  }, [preferredDate, chambers]);

  const noChamberForDate = !!preferredDate && !chambersLoading && !chamberPreview;

  const onSubmit = async (data: AppointmentForm) => {
    try {
      const res = await createAppointment({
        full_name: data.fullName,
        phone: data.phone,
        email: data.email,
        dob: data.dob,
        service: data.service,
        patient_type: data.patientType,
        notes: data.notes,
        appointment_date: data.preferredDate,
      }).unwrap();

      setConfirmation(res.data);
    } catch (err) {
      const apiError = err as ApiError;
      alert(
        (Array.isArray(apiError.data?.message)
          ? apiError.data.message.join(", ")
          : apiError.data?.message) ||
          apiError.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  const handleReset = () => {
    setConfirmation(null);
    reset();
  };

  return (
    <section className="relative overflow-hidden bg-gray-50/60 py-20 md:py-28">
      <div className="container relative">
        {/* HEADER */}
        <div className="max-w-2xl">
          <span className="text-sm font-semibold tracking-wide uppercase text-[#2AA7FF]">
            Book an Appointment
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight tracking-tight text-black">
            Schedule Your Visit
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
            Fill out the form below — you&apos;ll get a serial number and an
            estimated visit time by email, takes less than two minutes.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ================= FORM / CONFIRMATION CARD ================= */}
          <div className="lg:col-span-8 rounded-3xl border border-gray-100 bg-white shadow-lg p-6 md:p-10">
            {confirmation ? (
              /* ---------------- CONFIRMATION VIEW ---------------- */
              <div className="text-center max-w-lg mx-auto py-4">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2AA7FF]/10 text-[#2AA7FF]">
                  <CheckCircle2 size={32} />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-black">
                  Appointment Requested
                </h3>
                <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm font-medium text-black">
                  <span className="w-2 h-2 rounded-full bg-[#2AA7FF]" />
                  Serial #{confirmation.serial_number} ·{" "}
                  {confirmation.status === "confirmed"
                    ? "Confirmed"
                    : "Pending Confirmation"}
                </span>
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  We&apos;ve emailed your serial number and estimated visit
                  time to {confirmation.email}. Here&apos;s a summary for
                  your records.
                </p>

                <dl className="mt-8 text-left rounded-2xl border border-gray-100 bg-gray-50/60 p-5 space-y-3">
                  {[
                    ["Patient", confirmation.full_name],
                    ["Contact", `${confirmation.phone} · ${confirmation.email}`],
                    ["Reason for Visit", confirmation.service],
                    [
                      "Chamber",
                      confirmation.chamber
                        ? `${confirmation.chamber.location_name}${
                            confirmation.chamber.address
                              ? ` — ${confirmation.chamber.address}`
                              : ""
                          }`
                        : "—",
                    ],
                    [
                      "Date & Estimated Time",
                      `${formatDate(confirmation.appointment_date)} at ${confirmation.estimated_time}`,
                    ],
                    [
                      "Consultation Fee",
                      confirmation.chamber
                        ? `৳${confirmation.chamber.fee} (payable at the chamber)`
                        : "—",
                    ],
                    [
                      "Patient Type",
                      confirmation.patient_type === "new"
                        ? "New Patient"
                        : "Returning Patient",
                    ],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between gap-4 text-sm"
                    >
                      <dt className="text-gray-500">{label}</dt>
                      <dd className="font-semibold text-black text-right">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <button
                  onClick={handleReset}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl border border-[#2AA7FF] text-[#2AA7FF] font-semibold px-6 py-3 hover:bg-[#2AA7FF]/5 transition"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              /* ---------------- FORM VIEW ---------------- */
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-10"
              >
                {/* REASON FOR VISIT */}
                <div>
                  <h3 className="text-base font-bold text-black">
                    Reason for Visit
                  </h3>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1.5">
                        Service
                      </label>
                      <select
                        {...register("service", {
                          required: "Please select a service",
                        })}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#2AA7FF]/40 focus:border-[#2AA7FF]"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        {services.map((service) => (
                          <option key={service.id} value={service.title}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.service.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1.5">
                        Patient Type
                      </label>
                      <div className="flex gap-3">
                        {(["new", "returning"] as PatientType[]).map(
                          (type) => (
                            <label key={type} className="flex-1 cursor-pointer">
                              <input
                                type="radio"
                                value={type}
                                {...register("patientType", {
                                  required: true,
                                })}
                                className="peer sr-only"
                              />
                              <span className="flex items-center justify-center rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 peer-checked:border-[#2AA7FF] peer-checked:bg-[#2AA7FF] peer-checked:text-white transition">
                                {type === "new" ? "New Patient" : "Returning"}
                              </span>
                            </label>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* DATE & CHAMBER */}
                <div>
                  <h3 className="text-base font-bold text-black">
                    Preferred Date
                  </h3>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-black mb-1.5">
                      <CalendarDays size={15} className="inline -mt-0.5 mr-1.5 text-[#2AA7FF]" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      min={todayISO}
                      {...register("preferredDate", {
                        required: "Please choose a date",
                        validate: () =>
                          !noChamberForDate ||
                          "No chamber is scheduled that day — please pick another date",
                      })}
                      className="w-full sm:w-64 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#2AA7FF]/40 focus:border-[#2AA7FF]"
                    />
                    {errors.preferredDate && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.preferredDate.message}
                      </p>
                    )}
                  </div>

                  {preferredDate && chamberPreview && (
                    <div className="mt-5 rounded-xl border border-[#2AA7FF]/20 bg-[#2AA7FF]/5 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-black">
                        <MapPin size={15} className="text-[#2AA7FF]" />
                        {WEEKDAY_LABELS[chamberPreview.day_of_week]} Chamber
                      </div>
                      <p className="mt-1.5 text-sm text-gray-700">
                        {chamberPreview.location_name}
                        {chamberPreview.address ? ` — ${chamberPreview.address}` : ""}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-600">
                        <span className="inline-flex items-center gap-1">
                          <Clock size={12} />
                          {chamberPreview.start_time}–{chamberPreview.end_time}
                        </span>
                        <span>Fee: ৳{chamberPreview.fee}</span>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        Your serial number and estimated visit time will be
                        assigned when you submit this form.
                      </p>
                    </div>
                  )}

                  {noChamberForDate && (
                    <p className="mt-3 text-xs text-red-500">
                      No chamber is scheduled on{" "}
                      {WEEKDAY_LABELS[new Date(`${preferredDate}T00:00:00`).getDay()]}
                      s — please pick another date.
                    </p>
                  )}
                </div>

                {/* PATIENT INFO */}
                <div>
                  <h3 className="text-base font-bold text-black">
                    Your Information
                  </h3>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1.5">
                        <User size={15} className="inline -mt-0.5 mr-1.5 text-[#2AA7FF]" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        {...register("fullName", {
                          required: "Full name is required",
                        })}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2AA7FF]/40 focus:border-[#2AA7FF]"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1.5">
                        <Cake size={15} className="inline -mt-0.5 mr-1.5 text-[#2AA7FF]" />
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        max={todayISO}
                        {...register("dob", {
                          required: "Date of birth is required",
                        })}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#2AA7FF]/40 focus:border-[#2AA7FF]"
                      />
                      {errors.dob && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.dob.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1.5">
                        <Phone size={15} className="inline -mt-0.5 mr-1.5 text-[#2AA7FF]" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="01XXX-XXXXXX"
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[+\d][\d\s-]{6,}$/,
                            message: "Enter a valid phone number",
                          },
                        })}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2AA7FF]/40 focus:border-[#2AA7FF]"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1.5">
                        <Mail size={15} className="inline -mt-0.5 mr-1.5 text-[#2AA7FF]" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Enter a valid email address",
                          },
                        })}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2AA7FF]/40 focus:border-[#2AA7FF]"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-black mb-1.5">
                        <StickyNote size={15} className="inline -mt-0.5 mr-1.5 text-[#2AA7FF]" />
                        Notes / Symptoms{" "}
                        <span className="text-gray-400 font-normal">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        rows={4}
                        maxLength={500}
                        placeholder="Briefly describe your symptoms or reason for visit..."
                        {...register("notes")}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2AA7FF]/40 focus:border-[#2AA7FF] resize-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#2AA7FF] text-white font-semibold px-8 py-3.5 hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                  {isSubmitting ? "Submitting..." : "Request Appointment"}
                </button>
              </form>
            )}
          </div>

          {/* ================= SIDEBAR ================= */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#2AA7FF]/10 text-[#2AA7FF]">
                <Clock size={20} />
              </span>
              <h4 className="mt-4 text-base font-bold text-black">
                Weekly Chamber Schedule
              </h4>
              <div className="mt-3 space-y-1.5 text-sm text-gray-600">
                {WEEKDAY_LABELS.map((label, dayIndex) => {
                  const chamber = chambers.find((c) => c.day_of_week === dayIndex);
                  return (
                    <div key={label} className="flex justify-between gap-3">
                      <span>{label}</span>
                      <span className="font-medium text-black text-right">
                        {chamber
                          ? `${chamber.location_name} · ${chamber.start_time}–${chamber.end_time}`
                          : "Closed"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#2AA7FF]/10 text-[#2AA7FF]">
                <PhoneCall size={20} />
              </span>
              <h4 className="mt-4 text-base font-bold text-black">
                Need Help Booking?
              </h4>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Call or WhatsApp us directly and our team will help you find
                a slot.
              </p>
              <a
                href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
                className="mt-3 inline-block text-sm font-semibold text-[#2AA7FF]"
              >
                {CONTACT_PHONE}
              </a>
            </div>

            <div className="rounded-2xl border border-[#2AA7FF]/20 bg-[#2AA7FF]/5 p-6">
              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#2AA7FF] text-white">
                <Sparkles size={20} />
              </span>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li>Takes less than 2 minutes</li>
                <li>You get a serial number &amp; estimated arrival time</li>
                <li>Consultation fee is paid at the chamber</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
