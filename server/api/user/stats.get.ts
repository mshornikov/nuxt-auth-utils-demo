export default defineEventHandler(async (event) => {
  await authorize(event, viewStats);

  const { user } = await getUserSession(event);

  return { user };
});
