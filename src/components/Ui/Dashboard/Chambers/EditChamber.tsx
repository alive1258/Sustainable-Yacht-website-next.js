"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { ApiError } from "@/src/types/authType";
import { WEEKDAY_LABELS } from "@/src/types/chamberType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import {
  useGetSingleChamberQuery,
  useUpdateChamberMutation,
} from "@/src/redux/api/chamberApi";

interface EditChamberProps {
  id: string;
}

interface EditChamberFormValues {
  day_of_week: number;
  location_name: string;
  address?: string;
  fee: number;
  start_time: string;
  end_time: string;
  avg_minutes_per_patient?: number;
  max_patients?: number;
  is_active: boolean;
}

const ALL_CHAMBERS_PATH = "/dashboard/chambers/all-chambers";

const formatTime = (hhmm: string) => {
  const [hoursStr, minutesStr] = hhmm.split(":");
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return minutes === 0
    ? `${hour12} ${period}`
    : `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
};

const EditChamber: React.FC<EditChamberProps> = ({ id }) => {
  const router = useRouter();

  const { data: chamberData, isLoading: isFetching } =
    useGetSingleChamberQuery(id);
  const [updateChamber, { isLoading: isUpdating }] = useUpdateChamberMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EditChamberFormValues>();

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedDay = watch("day_of_week");

  useEffect(() => {
    if (chamberData?.data) {
      const item = chamberData.data;
      reset({
        day_of_week: item.day_of_week,
        location_name: item.location_name || "",
        address: item.address || "",
        fee: item.fee,
        start_time: item.start_time,
        end_time: item.end_time,
        avg_minutes_per_patient: item.avg_minutes_per_patient,
        max_patients: item.max_patients,
        is_active: item.is_active ?? true,
      });
    }
  }, [chamberData, reset]);

  const onSubmit: SubmitHandler<EditChamberFormValues> = async (values) => {
    try {
      await updateChamber({
        id,
        data: {
          day_of_week: Number(values.day_of_week),
          location_name: values.location_name,
          address: values.address || undefined,
          fee: Number(values.fee),
          start_time: values.start_time,
          end_time: values.end_time,
          avg_minutes_per_patient: values.avg_minutes_per_patient
            ? Number(values.avg_minutes_per_patient)
            : undefined,
          max_patients: values.max_patients
            ? Number(values.max_patients)
            : undefined,
          is_active: values.is_active,
        },
      }).unwrap();

      toast.success("Chamber updated successfully!");
      router.push(ALL_CHAMBERS_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update chamber.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading chamber details...</span>
        </div>
      </div>
    );
  }

  const chamber = chamberData?.data;

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Chamber"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Chambers", link: ALL_CHAMBERS_PATH },
          { title: "Edit Chamber" },
        ]}
      />

      {chamber && (
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-1 rounded-lg bg-gray-50 border border-gray-200 p-4 text-sm text-gray-600">
          <span>
            Day:{" "}
            <strong className="text-gray-900">
              {WEEKDAY_LABELS[chamber.day_of_week]}
            </strong>
          </span>
          <span>
            Hours:{" "}
            <strong className="text-gray-900">
              {formatTime(chamber.start_time)} – {formatTime(chamber.end_time)}
            </strong>
          </span>
          <span>
            Fee: <strong className="text-gray-900">{chamber.fee} TK</strong>
          </span>
          <span>
            Capacity:{" "}
            <strong className="text-gray-900">
              {chamber.max_patients ?? "Auto"}
            </strong>
          </span>
          <span>
            Status:{" "}
            <strong className="text-gray-900">
              {chamber.is_active ? "Active" : "Inactive"}
            </strong>
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Day of Week */}
          <div className="col-span-full flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Day of Week<span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="mt-1 flex flex-wrap gap-2">
              {WEEKDAY_LABELS.map((label, index) => (
                <label key={label} className="cursor-pointer">
                  <input
                    type="radio"
                    value={index}
                    {...register("day_of_week", {
                      required: "Select a day",
                      valueAsNumber: true,
                    })}
                    checked={selectedDay === index}
                    className="peer sr-only"
                  />
                  <span className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-checked:text-white transition">
                    {label}
                  </span>
                </label>
              ))}
            </div>
            {errors.day_of_week && (
              <span className="text-xs text-red-500">
                {errors.day_of_week.message}
              </span>
            )}
          </div>

          {/* Location Name */}
          <Input
            label="Chamber / Hospital Name"
            text="location_name"
            register={register("location_name", {
              required: "Location name is required",
            })}
            errors={errors}
          />

          {/* Fee */}
          <Input
            label="Consultation Fee (TK)"
            text="fee"
            type="number"
            register={register("fee", {
              required: "Fee is required",
              valueAsNumber: true,
            })}
            errors={errors}
          />

          {/* Avg minutes per patient */}
          <Input
            label="Avg. Minutes per Patient"
            text="avg_minutes_per_patient"
            type="number"
            register={register("avg_minutes_per_patient", {
              valueAsNumber: true,
            })}
            errors={errors}
            required={false}
          />

          {/* Start time */}
          <Input
            label="Start Time"
            text="start_time"
            type="time"
            register={register("start_time", {
              required: "Start time is required",
            })}
            errors={errors}
          />

          {/* End time */}
          <Input
            label="End Time"
            text="end_time"
            type="time"
            register={register("end_time", {
              required: "End time is required",
            })}
            errors={errors}
          />

          {/* Max patients */}
          <Input
            label="Max Patients per Day (Optional)"
            text="max_patients"
            type="number"
            register={register("max_patients", { valueAsNumber: true })}
            errors={errors}
            required={false}
          />

          {/* Active Status */}
          <div className="flex items-center gap-2">
            <input
              id="is_active"
              type="checkbox"
              {...register("is_active")}
              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label
              htmlFor="is_active"
              className="text-sm font-medium text-gray-700"
            >
              Active (bookable)
            </label>
          </div>

          {/* Address */}
          <div className="col-span-full flex flex-col gap-1">
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              Address (Optional)
            </label>
            <textarea
              id="address"
              rows={2}
              {...register("address")}
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
            text={isUpdating ? "Updating..." : "Update Chamber"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditChamber;
