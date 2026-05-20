import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const prisma = new PrismaClient();

// Share file
router.post('/:fileId/share', verifyToken, async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;
    const { userId, permission } = req.body;
    const currentUserId = req.user?.userId;

    // Verify file ownership
    const file = await prisma.file.findUnique({ where: { id: fileId } });
    if (!file || file.ownerId !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    // Create share
    const share = await prisma.share.create({
      data: {
        id: uuidv4(),
        fileId,
        userId,
        permission,
      },
    });

    res.status(201).json({
      success: true,
      message: 'File shared successfully',
      share,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get shared files
router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const shares = await prisma.share.findMany({
      where: { userId },
      include: { file: true },
    });

    res.json({
      success: true,
      shares,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Revoke share
router.delete('/:shareId', verifyToken, async (req: Request, res: Response) => {
  try {
    const { shareId } = req.params;

    await prisma.share.delete({ where: { id: shareId } });

    res.json({
      success: true,
      message: 'Share revoked successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
