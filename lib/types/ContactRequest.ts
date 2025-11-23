export interface ContactRequest {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface ContactRequestResponse {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}
