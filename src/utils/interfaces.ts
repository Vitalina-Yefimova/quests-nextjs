export interface User {
  id: string;
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  verify?: boolean;
  emailVerified?: boolean;
  newEmail?: string;
  hasPassword?: boolean;
  authMethod: "email" | "phone";
}

export interface Quest {
  id: string;
  title: string;
  genres: { genreName: string }[];
  players: {
    min: number;
    max: number;
  };
  difficulty: "easy" | "medium" | "hard";
  duration: "60 min" | "90 min" | "120 min";
  description: string;
  image: string;
  imageBg: string;
  price: string;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}


