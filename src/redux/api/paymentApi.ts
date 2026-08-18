import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  BookingPaymentsResponse,
  CheckoutSessionResponse,
  CreateCheckoutSessionPayload,
  PaymentPaginatedResponse,
  PaymentQueryParams,
} from "@/src/types/paymentType";

const PAYMENTS_URL = "/payments";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE CHECKOUT SESSION (authenticated customer)
    createCheckoutSession: builder.mutation<
      CheckoutSessionResponse,
      CreateCheckoutSessionPayload
    >({
      query: (data) => ({
        url: `${PAYMENTS_URL}/checkout-session`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.payments, tagTypes.bookings],
    }),

    // 2. GET MY PAYMENTS (authenticated customer's own history)
    getMyPayments: builder.query<PaymentPaginatedResponse, PaymentQueryParams | void>({
      query: (params) => ({
        url: `${PAYMENTS_URL}/mine`,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.payments],
    }),

    // 3. GET PAYMENTS FOR A BOOKING (owner or admin)
    getPaymentsByBooking: builder.query<BookingPaymentsResponse, string>({
      query: (bookingId) => ({
        url: `${PAYMENTS_URL}/booking/${bookingId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.payments],
    }),

    // 4. GET ALL PAYMENTS (admin, paginated & filtered)
    getAllPayments: builder.query<PaymentPaginatedResponse, PaymentQueryParams | void>({
      query: (params) => ({
        url: PAYMENTS_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.payments],
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetMyPaymentsQuery,
  useGetPaymentsByBookingQuery,
  useGetAllPaymentsQuery,
} = paymentApi;
