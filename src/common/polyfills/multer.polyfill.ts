export interface MulterOptionsFileFilterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

export type MulterOptionsFileFilterCallback = (
  error: Error | null,
  acceptFile: boolean,
) => void;
