export const register = defineAbility(
  { allowGuest: true },
  (user: UserData | undefined) => !user,
);

export const login = defineAbility(
  { allowGuest: true },
  (user: UserData | undefined) => !user,
);

export const viewStats = defineAbility(() => true);
