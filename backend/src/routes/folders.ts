import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const prisma = new PrismaClient();

// Get all folders for user
router.get('/', async (req: Request, res: Response) => {
  try {
    const folders = await prisma.folder.findMany({
      where: {
        ownerId: req.userId,
      },
    });

    res.json({
      success: true,
      folders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch folders',
    });
  }
});

// Create folder
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, parentId } = req.body;

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
        ownerId: req.userId as string,
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
      message: error.message || 'Failed to create folder',
    });
  }
});

// Delete folder
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const folder = await prisma.folder.findUnique({
      where: { id },
    });

    if (!folder) {
      return res.status(404).json({
        success: false,
        message: 'Folder not found',
      });
    }

    if (folder.ownerId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    await prisma.folder.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Folder deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete folder',
    });
  }
});

export default router;
