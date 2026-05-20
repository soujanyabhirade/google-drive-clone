export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface File {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  fileUrl: string;
  ownerId: string;
  folderId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Share {
  id: string;
  fileId: string;
  userId: string;
  permission: 'VIEW' | 'EDIT' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

export interface JWTPayload {
  userId: string;
  email: string;
}

export interface AuthRequest {
  userId: string;
  email: string;
}
