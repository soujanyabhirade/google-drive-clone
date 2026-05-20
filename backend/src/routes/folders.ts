import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const prisma = new PrismaClient();

// Create folder
router.post('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const { name, parentId } = req.body;
    const userId = req.user?.userId;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Folder name is required',
      });
    }

    const folder = await prisma.folder.create({
      data: {
        id: uuidv4(),
        name,
        parentId: parentId || null,
        ownerId: userId || '',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Folder created successfully',
      folder,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all folders
router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const folders = await prisma.folder.findMany({
      where: { ownerId: userId },
    });

    res.json({
      success: true,
      folders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete folder
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    // Find folder
    const folder = await prisma.folder.findUnique({ where: { id } });
    if (!folder || folder.ownerId !== userId) {
      return res.status(404).json({
        success: false,
        message: 'Folder not found',
      });
    }

    // Delete folder
    await prisma.folder.delete({ where: { id } });

    res.json({
      success: true,
      message: 'Folder deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
