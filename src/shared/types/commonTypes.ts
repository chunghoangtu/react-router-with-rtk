
export type User = {
  id: string;
  fullName: string;
};

export type AuthUser = User & {
  permissions: string[];
  roles: string[];
}