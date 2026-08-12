"use client";

/* eslint-disable react-hooks/incompatible-library */

import React from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Plus, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

import { ApiError } from "@/src/types/authType";
import { WEEKDAY_LABELS } from "@/src/types/chamberType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import { useCreateChambersBulkMutation } from "@/src/redux/api/chamberApi";

interface AddChamberFormValues {
  // Checkbox group values arrive as strings — converted to numbers on submit.
  day_of_week: string[];
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

const AddChamber = () => {
  const router = useRouter();
  const [createChambersBulk, { isLoading }] = useCreateChambersBulkMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddChamberFormValues>({
    defaultValues: {
      day_of_week: [],
      location_name: "",
      address: "",
      start_time: "14:00",
      end_time: "20:00",
      avg_minutes_per_patient: 10,
      is_active: true,
    },
  });

  const onSubmit: SubmitHandler<AddChamberFormValues> = async (values) => {
    try {
      await createChambersBulk({
        day_of_week: values.day_of_week.map(Number),
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
      }).unwrap();

      toast.success(
        values.day_of_week.length > 1
          ? `Chamber created for ${values.day_of_week.length} days!`
          : "Chamber created successfully!",
      );
      reset();
      router.push(ALL_CHAMBERS_PATH);
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

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Add Chamber"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Chambers", link: ALL_CHAMBERS_PATH },
          { title: "Add Chamber" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Day(s) of Week */}
          <div className="col-span-full flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Day(s) of Week<span className="text-red-500 ml-0.5">*</span>
            </label>
            <p className="text-xs text-gray-500">
              Select every day this same location/time schedule applies to —
              one chamber entry is created per day selected.
            </p>
            <div className="mt-1 flex flex-wrap gap-2">
              {WEEKDAY_LABELS.map((label, index) => (
                <label key={label} className="cursor-pointer">
                  <input
                    type="checkbox"
                    value={index}
                    {...register("day_of_week", {
                      validate: (value) =>
                        (value && value.length > 0) ||
                        "Select at least one day",
                    })}
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
            placeholder="Pranto Specialized Hospital"
            register={register("location_name", {
              required: "Location name is required",
            })}
            errors={errors}
          />

          {/* Fee */}
          <Input
            label="Consultation Fee (৳)"
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
            register={register("avg_minutes_per_patient", { valueAsNumber: true })}
            errors={errors}
            required={false}
          />

          {/* Start time */}
          <Input
            label="Start Time"
            text="start_time"
            type="time"
            register={register("start_time", { required: "Start time is required" })}
            errors={errors}
          />

          {/* End time */}
          <Input
            label="End Time"
            text="end_time"
            type="time"
            register={register("end_time", { required: "End time is required" })}
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
            className="md:col-span-1"
          />

          {/* Active Status */}
          <div className="flex items-center gap-2">
            <input
              id="is_active"
              type="checkbox"
              {...register("is_active")}
              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
              Active (bookable)
            </label>
          </div>

          {/* Address */}
          <div className="col-span-full flex flex-col gap-1">
            <label htmlFor="address" className="text-sm font-medium text-gray-700">
              Address (Optional)
            </label>
            <textarea
              id="address"
              rows={2}
              placeholder="Mirpur-10, Dhaka"
              {...register("address")}
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
            text={isLoading ? "Saving..." : "Create Chamber"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddChamber;
