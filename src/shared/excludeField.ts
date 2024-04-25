function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  // Convert the object into an array of key-value pairs using Object.entries()
  // Filter out the key-value pairs where the key is not included in the keys array
  const filteredEntries = Object.entries(user as Record<string, any>).filter(
    ([key]) => !keys.includes(key as Key)
  );

  // Convert the filtered array back into an object using Object.fromEntries()
  // Omitting the specified keys
  return Object.fromEntries(filteredEntries) as Omit<User, Key>;
}

export default exclude