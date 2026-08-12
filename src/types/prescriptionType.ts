// ==========================================
// 1. Core Entity Model
// ==========================================
export type PatientGender = "male" | "female" | "other";

export interface PrescriptionMedicineItem {
  name: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  instructions?: string;
}

export interface PrescriptionTestItem {
  name: string;
  instructions?: string;
}

export type ComplaintDurationUnit = "day" | "week" | "month" | "year";

export interface PrescriptionChiefComplaintItem {
  name: string;
  duration_value?: number;
  duration_unit?: ComplaintDurationUnit;
  note?: string;
}

export interface PrescriptionAppointmentSummary {
  id: string;
  full_name: string;
  appointment_date: string;
}

export interface PrescriptionStaffSummary {
  id: string;
  name?: string;
  email?: string;
}

export interface PrescriptionItem {
  id: string;
  patient_name: string;
  patient_age?: number;
  patient_gender?: PatientGender;
  patient_phone?: string;
  patient_address?: string;
  appointment_id?: string;
  appointment?: PrescriptionAppointmentSummary;
  diagnosis?: string;
  chief_complaints?: PrescriptionChiefComplaintItem[];
  medicines?: PrescriptionMedicineItem[];
  tests?: PrescriptionTestItem[];
  advice?: string;
  follow_up_date?: string;
  prescription_date: string;
  share_token: string;
  addedBy?: PrescriptionStaffSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface CreatePrescriptionRequest {
  patient_name: string;
  patient_age?: number;
  patient_gender?: PatientGender;
  patient_phone?: string;
  patient_address?: string;
  appointment_id?: string;
  diagnosis?: string;
  chief_complaints?: PrescriptionChiefComplaintItem[];
  medicines?: PrescriptionMedicineItem[];
  tests?: PrescriptionTestItem[];
  advice?: string;
  follow_up_date?: string;
  prescription_date?: string;
}

export interface UpdatePrescriptionRequest {
  id: string;
  data: Partial<CreatePrescriptionRequest>;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface PrescriptionQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  appointment_id?: string;
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

export interface SinglePrescriptionResponse extends BaseApiResponse {
  data: PrescriptionItem;
}

export interface PrescriptionPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: PrescriptionItem[];
}
