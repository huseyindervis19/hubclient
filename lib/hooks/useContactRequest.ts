import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { ContactRequest } from '../types/ContactRequest';
import { createContactRequest } from '../services/contactRequestService';

export const useCreateContactRequest = (): UseMutationResult<
  ContactRequest,
  Error,
  Partial<ContactRequest>
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<ContactRequest>) => createContactRequest(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contact-requests'] }),
  });
};
