import { useQuery } from "@tanstack/react-query";
import { fetchContactInfo } from "../services/contactInfoService";
import { ContactInfo } from "../types/ContactInfo";

export const useContactInfo = (lang: string) => {
  return useQuery<ContactInfo, Error>({
    queryKey: ["contact-info", lang],
    queryFn: async () => {
      const response = await fetchContactInfo(lang);
      return response.data;
    },
  });
};
