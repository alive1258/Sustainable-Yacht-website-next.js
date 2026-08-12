// ==========================================
// 1. Core Entity Model
// ==========================================
export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

export type AppointmentSource = "online" | "staff";
export type PatientType = "new" | "returning";
export type Gender = "male" | "female" | "other";
/** Consultation modality — distinct from AppointmentSource (who made the booking) */
export type AppointmentType = "online" | "on-chamber";

export interface AppointmentChamberSummary {
  id: string;
  location_name: string;
  address?: string;
  fee: number;
  start_time: string;
  end_time: string;
}

export interface AppointmentStaffSummary {
  id: string;
  name?: string;
  email?: string;
}

export interface AppointmentItem {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  dob?: string;
  gender?: Gender;
  age_years?: number;
  age_months?: number;
  age_days?: number;
  service: string;
  patient_type: PatientType;
  notes?: string;
  chamber_id: string;
  chamber?: AppointmentChamberSummary;
  appointment_date: string;
  serial_number: number;
  estimated_time: string;
  status: AppointmentStatus;
  source: AppointmentSource;
  appointment_type: AppointmentType;
  created_by?: string;
  createdBy?: AppointmentStaffSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
  no_show: "No Show",
};

export const GENDER_LABELS: Record<Gender, string> = {
  male: "Male",
  female: "Female",
  other: "Other",
};

export const APPOINTMENT_TYPE_LABELS: Record<AppointmentType, string> = {
  online: "Online",
  "on-chamber": "On-Chamber",
};

// ==========================================
// 2. Request Payloads
// ==========================================
export interface CreateAppointmentRequest {
  full_name: string;
  phone: string;
  email?: string;
  dob?: string;
  gender?: Gender;
  age_years?: number;
  age_months?: number;
  age_days?: number;
  service: string;
  patient_type?: PatientType;
  notes?: string;
  appointment_date: string;
  chamber_id?: string;
  appointment_type?: AppointmentType;
}

export interface UpdateAppointmentRequest {
  id: string;
  data: Partial<CreateAppointmentRequest> & { status?: AppointmentStatus };
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface AppointmentQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: AppointmentStatus;
  source?: AppointmentSource;
  appointment_type?: AppointmentType;
  chamber_id?: string;
  appointment_date?: string;
  date_from?: string;
  date_to?: string;
  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}

// ==========================================
// 4. API Response Wrappers
// ==========================================
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationLinks {
  first?: string;
  last?: string;
  current?: string;
  next?: string;
  previous?: string;
}

export interface BaseApiResponse {
  apiVersion?: string;
  statusCode?: number;
  status?: number;
  success: boolean;
  message: string;
}

export interface SingleAppointmentResponse extends BaseApiResponse {
  data: AppointmentItem;
}

export interface AppointmentPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: AppointmentItem[];
}
