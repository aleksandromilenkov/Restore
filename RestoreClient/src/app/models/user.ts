export type User = {
  email: string;
  userName: string;
  roles: string[];
  pictureUrl?: string;
};

export type Address = {
  name: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};
