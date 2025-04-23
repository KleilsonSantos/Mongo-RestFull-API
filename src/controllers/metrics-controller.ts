import Logger from '../config/logger';
import { register } from '../metrics/metrics';
import { Request, Response, NextFunction } from 'express';

const getAllMetrics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.set('Content-Type', register.contentType);

    const metrics = await register.metrics();
    res.status(200).end(metrics);

    Logger.info('✅ Metrics successfully retrieved');
  } catch (error) {
    Logger.error('❌ Internal Server Error while fetching metrics', error);
    res.status(500).json({ message: '❌ Internal Server Error' });
    next(error);
  }
};

export default getAllMetrics;
