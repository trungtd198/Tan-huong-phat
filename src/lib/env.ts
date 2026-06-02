export const getOptionalServerEnv = (key: string, fallback?: string) => {
  const value = process.env[key];

  return value && value.length > 0 ? value : fallback;
};

export const getRequiredServerEnv = (key: string) => {
  const value = getOptionalServerEnv(key);

  if (!value) {
    throw new Error(`Thiếu biến môi trường bắt buộc: ${key}`);
  }

  return value;
};

export const hasDatabaseEnv = () =>
  Boolean(getOptionalServerEnv('DATABASE_URL'));
