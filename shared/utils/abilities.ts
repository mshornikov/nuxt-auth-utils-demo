export const register = defineAbility(
  { allowGuest: true },
  (user: UserData | undefined) => !user,
);

export const login = defineAbility(
  { allowGuest: true },
  (user: UserData | undefined) => !user,
);

export const listUsers = defineAbility(
  (user: UserData) => user.role === 'admin',
);

export const deleteUser = defineAbility(
  (user: UserData) => user.role === 'admin',
);
