// ==========================================
// 1. Core Entity Model
// ==========================================
export interface EducationUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface EducationRowItem {
  icon: string;
  title: string;
  subtitle: string;
  period?: string;
  placeholder?: boolean;
}

export interface EducationItem {
  id: string;
  eyebrow: string;
  heading: string;
  description?: string;
  education?: EducationRowItem[];
  certificates?: EducationRowItem[];
  awards?: EducationRowItem[];
  experience?: EducationRowItem[];
  leadership?: EducationRowItem[];
  position: number;
  is_active: boolean;
  addedBy?: EducationUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface CreateEducationRequest {
  eyebrow?: string;
  heading: string;
  description?: string;
  education?: EducationRowItem[];
  certificates?: EducationRowItem[];
  awards?: EducationRowItem[];
  experience?: EducationRowItem[];
  leadership?: EducationRowItem[];
  position?: number;
  is_active?: boolean;
}

export interface UpdateEducationRequest {
  id: string;
  data: Partial<CreateEducationRequest>;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface EducationQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  heading?: string;
  position?: number;
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

export interface SingleEducationResponse extends BaseApiResponse {
  data: EducationItem;
}

export interface EducationPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: EducationItem[];
}
