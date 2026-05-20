import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const prisma = new PrismaClient();

// Share file
router.post('/share', async (req: Request, res: Response) => {
  try {
    const { fileId, userId, permission } = req.body;

    if (!fileId || !userId || !permission) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    if (!['VIEW', 'EDIT', 'ADMIN'].includes(permission)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid permission',
      });
    }

    const file = await prisma.file.findUnique({ where: { id: fileId } });
    if (!file || file.ownerId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized',
      });
    }

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
      message: error.message || 'Failed to share file',
    });
  }
});

// Get shares for a file
router.get('/:fileId', async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;

    const shares = await prisma.share.findMany({
      where: { fileId },
    });

    res.json({
      success: true,
      shares,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch shares',
    });
  }
});

// Revoke share
router.delete('/:shareId', async (req: Request, res: Response) => {
  try {
    const { shareId } = req.params;

    await prisma.share.delete({
      where: { id: shareId },
    });

    res.json({
      success: true,
      message: 'Share revoked successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to revoke share',
    });
  }
});

export default router;
