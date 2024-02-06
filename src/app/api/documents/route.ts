import { NextRequest, NextResponse } from "next/server";

import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import {} from "@aws-sdk/client-s3";

const Bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
  },
});

// endpoint to upload a file to the bucket
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("file") as File[];

  const response = await Promise.all(
    files.map(async (file) => {
      const Body = (await file.arrayBuffer()) as Buffer;
      s3.send(new PutObjectCommand({ Bucket, Key: file.name, Body }));
    })
  );
  // console.log(response)

  return NextResponse.json(response);
}
