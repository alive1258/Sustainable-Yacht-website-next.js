import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  CreatePrescriptionRequest,
  PrescriptionItem,
  PrescriptionPaginatedResponse,
  PrescriptionQueryParams,
  UpdatePrescriptionRequest,
} from "@/src/types/prescriptionType";

const PRESCRIPTIONS_URL = "/prescriptions";

export const prescriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE PRESCRIPTION
    createPrescription: builder.mutation<
      ApiResponse<PrescriptionItem>,
      CreatePrescriptionRequest
    >({
      query: (data) => ({
        url: PRESCRIPTIONS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.prescriptions],
    }),

    // 2. GET ALL PRESCRIPTIONS (Paginated & Filtered)
    getAllPrescriptions: builder.query<
      PrescriptionPaginatedResponse,
      PrescriptionQueryParams | void
    >({
      query: (params) => ({
        url: PRESCRIPTIONS_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.prescriptions],
    }),

    // 3. GET SINGLE PRESCRIPTION BY ID (staff)
    getSinglePrescription: builder.query<ApiResponse<PrescriptionItem>, string>({
      query: (id) => ({
        url: `${PRESCRIPTIONS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.prescriptions],
    }),

    // 4. GET PRESCRIPTION BY SHARE TOKEN (public print/share view)
    getPrescriptionByShareToken: builder.query<ApiResponse<PrescriptionItem>, string>({
      query: (token) => ({
        url: `${PRESCRIPTIONS_URL}/share/${token}`,
        method: "GET",
      }),
      providesTags: [tagTypes.prescriptions],
    }),

    // 5. UPDATE PRESCRIPTION
    updatePrescription: builder.mutation<
      ApiResponse<PrescriptionItem>,
      UpdatePrescriptionRequest
    >({
      query: ({ id, data }) => ({
        url: `${PRESCRIPTIONS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.prescriptions],
    }),

    // 6. DELETE PRESCRIPTION
    deletePrescription: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${PRESCRIPTIONS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.prescriptions],
    }),

    // 7. SEARCH MEDICINES (autocomplete, staff-only)
    searchMedicines: builder.query<ApiResponse<string[]>, string>({
      query: (q) => ({
        url: `${PRESCRIPTIONS_URL}/medicines/search`,
        method: "GET",
        params: { q },
      }),
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreatePrescriptionMutation,
  useGetAllPrescriptionsQuery,
  useGetSinglePrescriptionQuery,
  useGetPrescriptionByShareTokenQuery,
  useUpdatePrescriptionMutation,
  useDeletePrescriptionMutation,
  useLazySearchMedicinesQuery,
} = prescriptionApi;
