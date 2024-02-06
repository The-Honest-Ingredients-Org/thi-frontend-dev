export const config = {
  bucketName: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
  dirName: process.env.NEXT_PUBLIC_AWS_FOLDER_NAME,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
};
