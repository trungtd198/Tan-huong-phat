import { getOptionalServerEnv } from '@/lib/env';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

const DEFAULT_CACHE_CONTROL_SECONDS = '31536000';
const DEFAULT_STORAGE_BUCKET = 'product-images';

type UploadImageInput = {
  path: string;
  file: Blob;
  contentType: string;
  cacheControl?: string;
  upsert?: boolean;
};

const getStorageBucket = () =>
  getOptionalServerEnv('SUPABASE_STORAGE_BUCKET') ?? DEFAULT_STORAGE_BUCKET;

const ensureStorageBucket = async (bucket: string) => {
  const supabase = createSupabaseServiceClient();
  const { error: getBucketError } = await supabase.storage.getBucket(bucket);

  if (!getBucketError) {
    return supabase;
  }

  const { error: createBucketError } = await supabase.storage.createBucket(
    bucket,
    {
      public: true,
    },
  );

  if (
    createBucketError &&
    createBucketError.message !== 'Bucket already exists'
  ) {
    throw createBucketError;
  }

  return supabase;
};

export const uploadImage = async ({
  path,
  file,
  contentType,
  cacheControl = DEFAULT_CACHE_CONTROL_SECONDS,
  upsert = false,
}: UploadImageInput) => {
  const bucket = getStorageBucket();
  const supabase = await ensureStorageBucket(bucket);
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl,
      contentType,
      upsert,
    });

  if (error) {
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return {
    bucket,
    path: data.path,
    publicUrl: publicUrlData.publicUrl,
  };
};

export const deleteImages = async (paths: string[]) => {
  if (paths.length === 0) {
    return;
  }

  const { error } = await createSupabaseServiceClient()
    .storage.from(getStorageBucket())
    .remove(paths);

  if (error) {
    throw error;
  }
};
