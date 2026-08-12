import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  AppointmentItem,
  AppointmentPaginatedResponse,
  AppointmentQueryParams,
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
} from "@/src/types/appointmentType";

const APPOINTMENTS_URL = "/appointments";

export const appointmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE APPOINTMENT (public — homepage booking form)
    createAppointment: builder.mutation<
      ApiResponse<AppointmentItem>,
      CreateAppointmentRequest
    >({
      query: (data) => ({
        url: APPOINTMENTS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.appointments],
    }),

    // 2. CREATE APPOINTMENT MANUALLY (staff — phone-in patients)
    createManualAppointment: builder.mutation<
      ApiResponse<AppointmentItem>,
      CreateAppointmentRequest
    >({
      query: (data) => ({
        url: `${APPOINTMENTS_URL}/manual`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.appointments],
    }),

    // 3. GET ALL APPOINTMENTS (Paginated & Filtered)
    getAllAppointments: builder.query<
      AppointmentPaginatedResponse,
      AppointmentQueryParams | void
    >({
      query: (params) => ({
        url: APPOINTMENTS_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.appointments],
    }),

    // 4. GET SINGLE APPOINTMENT BY ID
    getSingleAppointment: builder.query<ApiResponse<AppointmentItem>, string>({
      query: (id) => ({
        url: `${APPOINTMENTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.appointments],
    }),

    // 5. UPDATE APPOINTMENT (edit details, change status, or reschedule)
    updateAppointment: builder.mutation<
      ApiResponse<AppointmentItem>,
      UpdateAppointmentRequest
    >({
      query: ({ id, data }) => ({
        url: `${APPOINTMENTS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.appointments],
    }),

    // 6. DELETE APPOINTMENT
    deleteAppointment: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${APPOINTMENTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.appointments],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateAppointmentMutation,
  useCreateManualAppointmentMutation,
  useGetAllAppointmentsQuery,
  useGetSingleAppointmentQuery,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentApi;
