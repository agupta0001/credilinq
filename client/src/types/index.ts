export type FileType = {
  fieldname: string;
  originalname: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  resourceId: number;
};

export type ProcessStatementType = {
  uen: string;
  companyName: string;
  perfiosTransactionId: string;
  files: FileType[];
};
