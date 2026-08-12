"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Plus, ArrowLeft, Upload, X, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ApiError } from "@/src/types/authType";
import { HeroStat } from "@/src/types/heroType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import Textarea from "@/src/components/Common/Form/Textarea";
import { useCreateHeroMutation } from "@/src/redux/api/heroApi";

interface AddHeroFormValues {
  title: string;
  badge?: string;
  affiliation?: string;
  description?: string;
  primary_button_text?: string;
  primary_button_link?: string;
  secondary_button_text?: string;
  secondary_button_link?: string;
  rating_value?: string;
  rating_label?: string;
  floating_badge?: string;
  position?: number;
  is_active: boolean;
  image?: FileList;
}

const ALL_HERO_PATH = "/dashboard/hero/all-hero";

const AddHero = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [specialties, setSpecialties] = useState<string[]>([]);
  const [specialtyInput, setSpecialtyInput] = useState("");

  const [stats, setStats] = useState<HeroStat[]>([]);
  const [statIcon, setStatIcon] = useState("");
  const [statValue, setStatValue] = useState("");
  const [statLabel, setStatLabel] = useState("");

  const [createHero, { isLoading }] = useCreateHeroMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddHeroFormValues>({
    defaultValues: {
      title: "",
      primary_button_text: "Book Appointment",
      primary_button_link: "#appointment",
      secondary_button_text: "Watch Intro Video",
      secondary_button_link: "#video",
      position: 1,
      is_active: true,
    },
  });

  const imageFileList = watch("image");

  useEffect(() => {
    if (imageFileList && imageFileList.length > 0) {
      const file = imageFileList[0];
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(null);
    }
  }, [imageFileList]);

  const handleAddSpecialty = () => {
    const value = specialtyInput.trim();
    if (!value) return;
    setSpecialties((prev) => [...prev, value]);
    setSpecialtyInput("");
  };

  const handleRemoveSpecialty = (index: number) => {
    setSpecialties((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddStat = () => {
    if (!statIcon.trim() || !statValue.trim() || !statLabel.trim()) return;
    setStats((prev) => [
      ...prev,
      { icon: statIcon.trim(), value: statValue.trim(), label: statLabel.trim() },
    ]);
    setStatIcon("");
    setStatValue("");
    setStatLabel("");
  };

  const handleRemoveStat = (index: number) => {
    setStats((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<AddHeroFormValues> = async (values) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("is_active", String(values.is_active));

      if (values.badge) formData.append("badge", values.badge);
      if (values.affiliation) formData.append("affiliation", values.affiliation);
      if (values.description) formData.append("description", values.description);
      if (values.primary_button_text)
        formData.append("primary_button_text", values.primary_button_text);
      if (values.primary_button_link)
        formData.append("primary_button_link", values.primary_button_link);
      if (values.secondary_button_text)
        formData.append("secondary_button_text", values.secondary_button_text);
      if (values.secondary_button_link)
        formData.append("secondary_button_link", values.secondary_button_link);
      if (values.rating_value) formData.append("rating_value", values.rating_value);
      if (values.rating_label) formData.append("rating_label", values.rating_label);
      if (values.floating_badge)
        formData.append("floating_badge", values.floating_badge);

      if (
        values.position !== undefined &&
        values.position !== null &&
        !isNaN(values.position)
      ) {
        formData.append("position", String(values.position));
      }

      if (specialties.length > 0) {
        formData.append("specialties", JSON.stringify(specialties));
      }
      if (stats.length > 0) {
        formData.append("stats", JSON.stringify(stats));
      }

      if (values.image?.[0]) {
        formData.append("image", values.image[0]);
      }

      await createHero(formData).unwrap();
      toast.success("Hero section created successfully!");
      reset();
      setImagePreview(null);
      setSpecialties([]);
      setStats([]);
      router.push(ALL_HERO_PATH);
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
        title="Add Hero Section"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Hero Section", link: ALL_HERO_PATH },
          { title: "Add Hero" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <Input
            label="Title"
            text="title"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          {/* Badge */}
          <Input
            label="Badge (Optional)"
            text="badge"
            placeholder="MBBS (DU) • CMU (Ultrasonography) • MS Neurosurgery (Course)"
            register={register("badge")}
            errors={errors}
            required={false}
          />

          {/* Affiliation */}
          <Input
            label="Affiliation (Optional)"
            text="affiliation"
            placeholder="Bangladesh Medical University (Ex-PG Hospital), Mirpur"
            register={register("affiliation")}
            errors={errors}
            required={false}
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

          {/* Primary Button */}
          <Input
            label="Primary Button Text"
            text="primary_button_text"
            register={register("primary_button_text")}
            errors={errors}
            required={false}
          />
          <Input
            label="Primary Button Link"
            text="primary_button_link"
            register={register("primary_button_link")}
            errors={errors}
            required={false}
          />

          {/* Secondary Button */}
          <Input
            label="Secondary Button Text"
            text="secondary_button_text"
            register={register("secondary_button_text")}
            errors={errors}
            required={false}
          />
          <Input
            label="Secondary Button Link"
            text="secondary_button_link"
            register={register("secondary_button_link")}
            errors={errors}
            required={false}
          />

          {/* Rating */}
          <Input
            label="Rating Value (Optional)"
            text="rating_value"
            placeholder="5"
            register={register("rating_value")}
            errors={errors}
            required={false}
          />
          <Input
            label="Rating Label (Optional)"
            text="rating_label"
            placeholder="50000+ Patient Reviews"
            register={register("rating_label")}
            errors={errors}
            required={false}
          />

          {/* Floating Badge */}
          <Input
            label="Floating Badge Text (Optional)"
            text="floating_badge"
            placeholder="Available for Appointments"
            register={register("floating_badge")}
            errors={errors}
            required={false}
          />

          {/* Description */}
          <Textarea
            label="Description (Optional)"
            text="description"
            placeholder="Compassionate, personalized medical care..."
            register={register("description")}
            errors={errors}
            required={false}
            className="col-span-full"
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

          {/* Specialties */}
          <div className="col-span-full flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Areas of Focus (Optional)
            </label>

            {specialties.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty, index) => (
                  <span
                    key={`${specialty}-${index}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700"
                  >
                    {specialty}
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecialty(index)}
                      className="text-emerald-500 hover:text-emerald-700"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={specialtyInput}
                onChange={(e) => setSpecialtyInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSpecialty();
                  }
                }}
                placeholder="e.g. Brain and Spinal Tumors"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddSpecialty}
                className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>

          {/* Trust Stats */}
          <div className="col-span-full flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Trust Stats (Optional)
            </label>
            <p className="text-xs text-gray-500">
              Icon name uses Lucide icon names, e.g. &quot;Award&quot;, &quot;Activity&quot;, &quot;Users&quot;.
            </p>

            {stats.length > 0 && (
              <div className="space-y-2">
                {stats.map((stat, index) => (
                  <div
                    key={`${stat.label}-${index}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <div className="flex-1 min-w-0 grid grid-cols-3 gap-2 text-sm">
                      <span className="text-gray-500">{stat.icon}</span>
                      <span className="font-medium text-gray-800">{stat.value}</span>
                      <span className="text-gray-600">{stat.label}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveStat(index)}
                      className="text-red-500 hover:text-red-700 shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={statIcon}
                onChange={(e) => setStatIcon(e.target.value)}
                placeholder="Icon (e.g. Award)"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="text"
                value={statValue}
                onChange={(e) => setStatValue(e.target.value)}
                placeholder="Value (e.g. 5+ Yrs)"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="text"
                value={statLabel}
                onChange={(e) => setStatLabel(e.target.value)}
                placeholder="Label (e.g. In Experience)"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddStat}
                className="flex items-center justify-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shrink-0"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>

          {/* Image Upload & Preview */}
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-emerald-500 transition">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Doctor Photo
            </label>

            {imagePreview ? (
              <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <Image
                  src={imagePreview}
                  alt="Hero Photo Preview"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="mb-4 h-40 w-40 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 text-gray-400">
                <Upload size={24} />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="block w-full text-sm text-gray-500
              file:mr-4
              file:py-2
              file:px-4
              file:rounded-full
              file:border-0
              file:font-semibold
              file:bg-emerald-50
              file:text-emerald-700
              hover:file:bg-emerald-100"
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
            text={isLoading ? "Saving..." : "Create Hero"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddHero;
