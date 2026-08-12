"use client";

import React from "react";
import { AppointmentItem } from "@/src/types/appointmentType";
import { useGetAllAppointmentsQuery } from "@/src/redux/api/appointmentApi";

interface AppointmentPickerSelectProps {
  value?: string;
  onChange: (appointment: AppointmentItem | null) => void;
  label?: string;
}

const AppointmentPickerSelect: React.FC<AppointmentPickerSelectProps> = ({
  value,
  onChange,
  label = "Link to Appointment (Optional)",
}) => {
  const { data, isLoading } = useGetAllAppointmentsQuery({ limit: 100 });
  const appointments = data?.data || [];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const appointment =
      appointments.find((a) => a.id === e.target.value) || null;
    onChange(appointment);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value || ""}
        onChange={handleChange}
        disabled={isLoading}
        className="w-full max-w-xl rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white disabled:opacity-60"
      >
        <option value="">
          {isLoading ? "Loading appointments..." : "— No linked appointment —"}
        </option>
        {appointments.map((appointment) => (
          <option key={appointment.id} value={appointment.id}>
            {appointment.full_name} — {appointment.phone} · Serial #
            {appointment.serial_number} ({appointment.appointment_date})
          </option>
        ))}
      </select>
    </div>
  );
};

export default AppointmentPickerSelect;
