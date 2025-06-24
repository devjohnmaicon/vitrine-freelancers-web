export type RequestResponse = {
  message: string;
  status_code: number;
  error?: string | null;
  data?: any | null | [];
};