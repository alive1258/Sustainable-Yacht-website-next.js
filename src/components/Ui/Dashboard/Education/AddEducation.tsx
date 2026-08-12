"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Plus, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

import { ApiError } from "@/src/types/authType";
import { EducationRowItem } from "@/src/types/educationType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import EducationRowGroupField from "./EducationRowGroupField";
import { useCreateEducationMutation } from "@/src/redux/api/educationApi";

interface AddEducationFormValues {
  eyebrow?: string;
  heading: string;
  description?: string;
  position?: number;
  is_active: boolean;
}

const ALL_EDUCATION_PATH = "/dashboard/education/all-education";

const AddEducation = () => {
  const router = useRouter();

  const [education, setEducation] = useState<EducationRowItem[]>([]);
  const [certificates, setCertificates] = useState<EducationRowItem[]>([]);
  const [awards, setAwards] = useState<EducationRowItem[]>([]);
  const [experience, setExperience] = useState<EducationRowItem[]>([]);
  const [leadership, setLeadership] = useState<EducationRowItem[]>([]);

  const [createEducation, { isLoading }] = useCreateEducationMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddEducationFormValues>({
    defaultValues: {
      eyebrow: "Background",
      heading: "",
      description: "",
      position: 1,
      is_active: true,
    },
  });

  const onSubmit: SubmitHandler<AddEducationFormValues> = async (values) => {
    try {
      await createEducation({
        eyebrow: values.eyebrow || undefined,
        heading: values.heading,
        description: values.description || undefined,
        position: values.position,
        is_active: values.is_active,
        education,
        certificates,
        awards,
        experience,
        leadership,
      }).unwrap();

      toast.success("Education section created successfully!");
      reset();
      setEducation([]);
      setCertificates([]);
      setAwards([]);
      setExperience([]);
      setLeadership([]);
      router.push(ALL_EDUCATION_PATH);
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
        title="Add Education Section"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Education Section", link: ALL_EDUCATION_PATH },
          { title: "Add Education" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Eyebrow */}
          <Input
            label="Eyebrow (Optional)"
            text="eyebrow"
            placeholder="Background"
            register={register("eyebrow")}
            errors={errors}
            required={false}
          />

          {/* Heading */}
          <Input
            label="Heading"
            text="heading"
            placeholder="Qualifications & Experience"
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
              placeholder="Dr. Anarul Islam's academic background, certifications, clinical practice, and community involvement — at a glance."
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
            text={isLoading ? "Saving..." : "Create Education"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddEducation;
