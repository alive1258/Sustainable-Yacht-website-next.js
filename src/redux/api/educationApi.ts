import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  CreateEducationRequest,
  EducationItem,
  EducationPaginatedResponse,
  EducationQueryParams,
  UpdateEducationRequest,
} from "@/src/types/educationType";

const EDUCATION_URL = "/education";

export const educationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE EDUCATION
    createEducation: builder.mutation<
      ApiResponse<EducationItem>,
      CreateEducationRequest
    >({
      query: (data) => ({
        url: EDUCATION_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.education],
    }),

    // 2. GET ALL EDUCATION ENTRIES (Paginated & Filtered)
    getAllEducation: builder.query<
      EducationPaginatedResponse,
      EducationQueryParams | void
    >({
      query: (params) => ({
        url: EDUCATION_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.education],
    }),

    // 3. GET SINGLE EDUCATION ENTRY BY ID
    getSingleEducation: builder.query<ApiResponse<EducationItem>, string>({
      query: (id) => ({
        url: `${EDUCATION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.education],
    }),

    // 4. GET ACTIVE EDUCATION ENTRY (public homepage)
    getActiveEducation: builder.query<ApiResponse<EducationItem>, void>({
      query: () => ({
        url: `${EDUCATION_URL}/active`,
        method: "GET",
      }),
      providesTags: [tagTypes.education],
    }),

    // 5. UPDATE EDUCATION
    updateEducation: builder.mutation<
      ApiResponse<EducationItem>,
      UpdateEducationRequest
    >({
      query: ({ id, data }) => ({
        url: `${EDUCATION_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.education],
    }),

    // 6. DELETE EDUCATION
    deleteEducation: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${EDUCATION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.education],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateEducationMutation,
  useGetAllEducationQuery,
  useGetSingleEducationQuery,
  useGetActiveEducationQuery,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} = educationApi;
