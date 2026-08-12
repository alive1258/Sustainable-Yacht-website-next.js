import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ActiveChambersResponse,
  ChamberItem,
  ChamberPaginatedResponse,
  ChamberQueryParams,
  CreateChamberRequest,
  CreateChambersBulkRequest,
  UpdateChamberRequest,
} from "@/src/types/chamberType";

const CHAMBERS_URL = "/chambers";

export const chamberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE CHAMBER
    createChamber: builder.mutation<ApiResponse<ChamberItem>, CreateChamberRequest>({
      query: (data) => ({
        url: CHAMBERS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.chambers],
    }),

    // 1b. CREATE CHAMBER ACROSS MULTIPLE DAYS
    createChambersBulk: builder.mutation<
      ApiResponse<ChamberItem[]>,
      CreateChambersBulkRequest
    >({
      query: (data) => ({
        url: `${CHAMBERS_URL}/bulk`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.chambers],
    }),

    // 2. GET ALL CHAMBERS (Paginated & Filtered)
    getAllChambers: builder.query<ChamberPaginatedResponse, ChamberQueryParams | void>({
      query: (params) => ({
        url: CHAMBERS_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.chambers],
    }),

    // 3. GET ACTIVE CHAMBERS (public booking form)
    getActiveChambers: builder.query<ActiveChambersResponse, void>({
      query: () => ({
        url: `${CHAMBERS_URL}/active`,
        method: "GET",
      }),
      providesTags: [tagTypes.chambers],
    }),

    // 4. GET SINGLE CHAMBER BY ID
    getSingleChamber: builder.query<ApiResponse<ChamberItem>, string>({
      query: (id) => ({
        url: `${CHAMBERS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.chambers],
    }),

    // 5. UPDATE CHAMBER
    updateChamber: builder.mutation<ApiResponse<ChamberItem>, UpdateChamberRequest>({
      query: ({ id, data }) => ({
        url: `${CHAMBERS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.chambers],
    }),

    // 6. DELETE CHAMBER
    deleteChamber: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${CHAMBERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.chambers],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateChamberMutation,
  useCreateChambersBulkMutation,
  useGetAllChambersQuery,
  useGetActiveChambersQuery,
  useGetSingleChamberQuery,
  useUpdateChamberMutation,
  useDeleteChamberMutation,
} = chamberApi;
