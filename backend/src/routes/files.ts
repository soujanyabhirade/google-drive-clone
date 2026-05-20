import express, { Request, Response } from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage() });

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Upload file
router.post(
  '/upload',
  verifyToken,
  upload.single('file'),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file provided',
        });
      }

      const { folderId } = req.body;
      const userId = req.user?.userId;
      const fileId = uuidv4();
      const s3Key = `${userId}/${fileId}/${req.file.originalname}`;

      // Upload to S3
      const params = {
        Bucket: process.env.AWS_S3_BUCKET || '',
        Key: s3Key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      await s3.upload(params).promise();

      // Save to database
      const file = await prisma.file.create({
        data: {
          id: fileId,
          name: req.file.originalname,
          size: req.file.size,
          mimeType: req.file.mimetype,
          s3Key,
          folderId: folderId || null,
          ownerId: userId || '',
        },
      });

      res.status(201).json({
        success: true,
        message: 'File uploaded successfully',
        file,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// Get files in folder
router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const { folderId } = req.query;
    const userId = req.user?.userId;

    const files = await prisma.file.findMany({
      where: {
        ownerId: userId,
        folderId: folderId ? (folderId as string) : null,
      },
    });

    res.json({
      success: true,
      files,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete file
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    // Find file
    const file = await prisma.file.findUnique({ where: { id } });
    if (!file || file.ownerId !== userId) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    // Delete from S3
    await s3
      .deleteObject({
        Bucket: process.env.AWS_S3_BUCKET || '',
        Key: file.s3Key,
      })
      .promise();

    // Delete from database
    await prisma.file.delete({ where: { id } });

    res.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
