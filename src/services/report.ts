import type { ReportFormData, ReportsResponse } from '../types/Report';
import { api } from './api';

export const reportsService = {
    async listReports(page: number = 1): Promise<ReportsResponse> {
        const { data } = await api.get<ReportsResponse>('/list-reports', {
            params: { page }
        });
        return data;
    },

    async generateReport(formData: ReportFormData): Promise<void> {
        await api.post('/generate-report', formData);
    },

    async getReport(reportId: string): Promise<{ file_url: string }> {
        const { data } = await api.get(`/get-report/${reportId}`);
        return data;
    }
};
