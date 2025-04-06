export type UserRoles = (typeof USER_ROLE_TYPE)[number];

export interface UserData {
  name: string;
  role: UserRoles;
}
