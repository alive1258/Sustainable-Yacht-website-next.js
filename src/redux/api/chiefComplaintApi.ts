import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ComplaintTemplateItem,
  CreateComplaintTemplateRequest,
} from "@/src/types/chiefComplaintType";

const CHIEF_COMPLAINTS_URL = "/chief-complaints";

export const chiefComplaintApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. GET QUICK-PICK COMPLAINTS (shared, curated list)
    getQuickPickComplaints: builder.query<ApiResponse<string[]>, void>({
      query: () => ({
        url: `${CHIEF_COMPLAINTS_URL}/quick-pick`,
        method: "GET",
      }),
    }),

    // 2. GET MY COMPLAINT TEMPLATES (current doctor's saved shortcuts)
    getMyComplaintTemplates: builder.query<ApiResponse<ComplaintTemplateItem[]>, void>({
      query: () => ({
        url: `${CHIEF_COMPLAINTS_URL}/my-templates`,
        method: "GET",
      }),
      providesTags: [tagTypes.chief_complaints],
    }),

    // 3. SAVE A COMPLAINT TEMPLATE (idempotent — reuses existing by name)
    addComplaintTemplate: builder.mutation<
      ApiResponse<ComplaintTemplateItem>,
      CreateComplaintTemplateRequest
    >({
      query: (data) => ({
        url: `${CHIEF_COMPLAINTS_URL}/my-templates`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.chief_complaints],
    }),

    // 4. DELETE A COMPLAINT TEMPLATE
    deleteComplaintTemplate: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${CHIEF_COMPLAINTS_URL}/my-templates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.chief_complaints],
    }),
  }),
});

export const {
  useGetQuickPickComplaintsQuery,
  useGetMyComplaintTemplatesQuery,
  useAddComplaintTemplateMutation,
  useDeleteComplaintTemplateMutation,
} = chiefComplaintApi;
