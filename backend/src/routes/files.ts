import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

const router = Router();
const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage() });

// Get all files for user
router.get('/', async (req: Request, res: Response) => {
  try {
    const folderId = req.query.folderId as string | undefined;

    const files = await prisma.file.findMany({
      where: {
        ownerId: req.userId,
        folderId: folderId || null,
      },
      select: {
        id: true,
        name: true,
        size: true,
        mimeType: true,
        createdAt: true,
        ownerId: true,
      },
    });

    res.json({
      success: true,
      files,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch files',
    });
  }
});

// Upload file
router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file provided',
      });
    }

    const fileId = uuidv4();
    const fileName = `${fileId}-${req.file.originalname}`;
    const folderId = req.body.folderId || null;

    // In production, upload to S3
    // For now, we'll store in database with mock S3 URL
    const file = await prisma.file.create({
      data: {
        id: fileId,
        name: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
        fileUrl: `/uploads/${fileName}`,
        ownerId: req.userId as string,
        folderId,
      },
    });

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        id: file.id,
        name: file.name,
        size: file.size,
        mimeType: file.mimeType,
        createdAt: file.createdAt,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'File upload failed',
    });
  }
});

// Delete file
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const file = await prisma.file.findUnique({
      where: { id },
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    if (file.ownerId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    await prisma.file.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete file',
    });
  }
});

export default router;
