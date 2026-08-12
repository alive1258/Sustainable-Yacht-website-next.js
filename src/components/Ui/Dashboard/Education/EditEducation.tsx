"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { ApiError } from "@/src/types/authType";
import { EducationRowItem } from "@/src/types/educationType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import EducationRowGroupField from "./EducationRowGroupField";
import {
  useGetSingleEducationQuery,
  useUpdateEducationMutation,
} from "@/src/redux/api/educationApi";

interface EditEducationProps {
  id: string;
}

interface EditEducationFormValues {
  eyebrow?: string;
  heading: string;
  description?: string;
  position?: number;
  is_active: boolean;
}

const ALL_EDUCATION_PATH = "/dashboard/education/all-education";

const EditEducation: React.FC<EditEducationProps> = ({ id }) => {
  const router = useRouter();

  const [education, setEducation] = useState<EducationRowItem[]>([]);
  const [certificates, setCertificates] = useState<EducationRowItem[]>([]);
  const [awards, setAwards] = useState<EducationRowItem[]>([]);
  const [experience, setExperience] = useState<EducationRowItem[]>([]);
  const [leadership, setLeadership] = useState<EducationRowItem[]>([]);

  const { data: educationData, isLoading: isFetching } =
    useGetSingleEducationQuery(id);
  const [updateEducation, { isLoading: isUpdating }] =
    useUpdateEducationMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditEducationFormValues>();

  useEffect(() => {
    if (educationData?.data) {
      const item = educationData.data;
      reset({
        eyebrow: item.eyebrow || "",
        heading: item.heading || "",
        description: item.description || "",
        position: item.position ?? 1,
        is_active: item.is_active ?? true,
      });

      setEducation(item.education || []);
      setCertificates(item.certificates || []);
      setAwards(item.awards || []);
      setExperience(item.experience || []);
      setLeadership(item.leadership || []);
    }
  }, [educationData, reset]);

  const onSubmit: SubmitHandler<EditEducationFormValues> = async (values) => {
    try {
      await updateEducation({
        id,
        data: {
          eyebrow: values.eyebrow || undefined,
          heading: values.heading,
          description: values.description || undefined,
          position: values.position,
          is_active: values.is_active,
          // Always send row groups so removals persist (an empty array
          // still needs to reach the backend to clear previously saved rows).
          education,
          certificates,
          awards,
          experience,
          leadership,
        },
      }).unwrap();

      toast.success("Education section updated successfully!");
      router.push(ALL_EDUCATION_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update education section.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading education details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Education Section"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Education Section", link: ALL_EDUCATION_PATH },
          { title: "Edit Education" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Eyebrow */}
          <Input
            label="Eyebrow (Optional)"
            text="eyebrow"
            register={register("eyebrow")}
            errors={errors}
            required={false}
          />

          {/* Heading */}
          <Input
            label="Heading"
            text="heading"
            register={register("heading", { required: "Heading is required" })}
            errors={errors}
          />

          {/* Position */}
          <Input
            label="Display Position (Optional)"
            text="position"
            type="number"
            register={register("position", { valueAsNumber: true })}
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
            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
              Active (visible on homepage)
            </label>
          </div>

          {/* Description */}
          <div className="col-span-full flex flex-col gap-1">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description (Optional)
            </label>
            <textarea
              id="description"
              rows={2}
              {...register("description")}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
            />
          </div>

          {/* Row Groups */}
          <div className="col-span-full flex flex-col gap-4">
            <EducationRowGroupField
              label="Education (SSC, HSC, MBBS, ...)"
              rows={education}
              onChange={setEducation}
            />
            <EducationRowGroupField
              label="Certifications & Training"
              rows={certificates}
              onChange={setCertificates}
            />
            <EducationRowGroupField
              label="Honors & Recognition"
              rows={awards}
              onChange={setAwards}
            />
            <EducationRowGroupField
              label="Clinical Experience"
              rows={experience}
              onChange={setExperience}
            />
            <EducationRowGroupField
              label="Leadership / Beyond The Clinic"
              rows={leadership}
              onChange={setLeadership}
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
            text={isUpdating ? "Updating..." : "Update Education"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditEducation;
