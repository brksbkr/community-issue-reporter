import axios from 'axios';

const DATABASE_URL =
  'https://community-issue-reporter-85d79-default-rtdb.firebaseio.com';

export type ReportInput = {
  title: string;
  category: string;
  description: string;
  latitude: number;
  longitude: number;
};

export async function createReport(report: ReportInput): Promise<string> {
  const response = await axios.post<{ name: string }>(
    `${DATABASE_URL}/reports.json`,
    {
      ...report,
      status: 'Submitted',
      createdAt: new Date().toISOString(),
    }
  );

  return response.data.name;
}