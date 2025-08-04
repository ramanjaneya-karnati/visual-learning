import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/concepts', (req, res) => {
  const filePath = path.join(__dirname, '../data/concepts.json');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to load concepts' });
    res.json(JSON.parse(data));
  });
});

export default router;