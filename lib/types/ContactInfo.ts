export interface ContactInfoTranslated {
  address: string;
}

export interface ContactInfo {
  id: number;
  phone: string;
  whatsapp: string;
  email: string;
  latitude: number | null;
  longitude: number | null;
  translated: ContactInfoTranslated;
  _links: {
    self: string;
    edit: string;
    delete: string;
  };
}
