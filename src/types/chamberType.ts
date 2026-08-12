// ==========================================
// 1. Core Entity Model
// ==========================================
export interface ChamberUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface ChamberItem {
  id: string;
  day_of_week: number; // 0 = Sunday ... 6 = Saturday
  location_name: string;
  address?: string;
  fee: number;
  start_time: string; // "HH:mm"
  end_time: string; // "HH:mm"
  avg_minutes_per_patient: number;
  max_patients?: number;
  is_active: boolean;
  addedBy?: ChamberUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export const WEEKDAY_LABELS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

// ==========================================
// 2. Request Payloads
// ==========================================
export interface CreateChamberRequest {
  day_of_week: number;
  location_name: string;
  address?: string;
  fee: number;
  start_time: string;
  end_time: string;
  avg_minutes_per_patient?: number;
  max_patients?: number;
  is_active?: boolean;
}

/** Creates the same chamber schedule across several selected weekdays at once. */
export interface CreateChambersBulkRequest
  extends Omit<CreateChamberRequest, "day_of_week"> {
  day_of_week: number[];
}

export interface UpdateChamberRequest {
  id: string;
  data: Partial<CreateChamberRequest>;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface ChamberQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  location_name?: string;
  day_of_week?: number;
  is_active?: boolean;
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

export interface SingleChamberResponse extends BaseApiResponse {
  data: ChamberItem;
}

export interface ChamberPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: ChamberItem[];
}

export interface ActiveChambersResponse extends BaseApiResponse {
  data: ChamberItem[];
}
