import { useQuery } from "@tanstack/react-query";
import { fetchAllSocialLinks } from "../services/socialLinkService";
import { SocialLink } from "../types/SocialLink";

export const useSocialLinks = () => {
  return useQuery<SocialLink[], Error>({
    queryKey: ["social-links"],
    queryFn: async () => {
      const response = await fetchAllSocialLinks();
      return response.data;
    },
  });
};
