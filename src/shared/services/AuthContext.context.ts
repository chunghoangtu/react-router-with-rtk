import { createContext } from "react";

import type { AuthUser } from "@shared/types/commonTypes";

export const AuthContext = createContext(null as AuthUser | null)