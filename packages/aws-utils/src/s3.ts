import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({ region: process.env.AWS_REGION });

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

export async function getAssetUrl(key: string, expiresInSeconds = 300): Promise<string> {
  const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });

  return await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
}

export async function getAssetUrls(
  keys: string[],
  expiresInSeconds = 300
): Promise<Record<string, string>> {
  const urls: Record<string, string> = {};

  await Promise.all(
    keys.map(async (key) => {
      urls[key] = await getAssetUrl(key, expiresInSeconds);
    })
  );

  return urls;
}
