export interface Report {
  id: string;
  title: string;
  reportLink: string;
  status: 'pending' | 'done';
  createdAt: string;
  updatedAt: string | null;
}

export interface ReportFormData {
  title: string;
  birthDateFrom: string;
  birthDateTo: string;
}

export interface PaginationMetadata {
  totalReports: number;
  currentPage: number;
  totalPages: number;
}

export interface ReportsResponse {
  reports: Report[];
  metadata: PaginationMetadata;
}