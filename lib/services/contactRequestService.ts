import { ContactRequest } from '../types/ContactRequest';
import { ApiResponse } from '../types/ApiResponse';
import  apiClient  from '../axios';

export const createContactRequest = async (
  data: Partial<ContactRequest>
): Promise<ContactRequest> => {
  const response = await apiClient.post<ApiResponse<ContactRequest>>(
    '/contact-requests',
    data
  );
  return response.data.data;
};
