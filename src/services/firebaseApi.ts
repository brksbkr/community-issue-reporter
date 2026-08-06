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

export type Report = ReportInput & {
  id: string;
  status: string;
  createdAt: string;
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

export async function getReports(): Promise<Report[]> {
  const response = await axios.get<
    Record<string, Omit<Report, 'id'>> | null
  >(`${DATABASE_URL}/reports.json`);

  if (!response.data) {
    return [];
  }

  return Object.entries(response.data)
    .map(([id, report]) => ({
      id,
      ...report,
    }))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
}