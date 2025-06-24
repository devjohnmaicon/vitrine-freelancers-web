
import { JWT } from "@auth/core/jwt";
import { DefaultUser, Session, User } from "@auth/core/types";


export type ExtendedToken = JWT & {
  name?: string;
  email?: string;
  companyId?: number;
};

export type ExtendedUser = DefaultUser & {
  companyId: number;
};

export type ExtendedSession = Session & {
  user: {
    name: string;
    email: string;
    companyId: number;
  };
};