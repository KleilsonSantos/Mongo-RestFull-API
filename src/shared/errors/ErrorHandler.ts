import Logger from '../../config/logger';
import { sendToMonitoringService } from '../../shared/services/monitoringService';

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export class ErrorHandler {
  public static handle(error: unknown, shouldThrow: boolean = true): never {
    const errorMessage = isError(error) ? error.message : String(error);

    Logger.error(`💥⚠️ ${errorMessage}`);

    this.sendToMonitoring(error);

    if (shouldThrow) {
      throw error;
    } else {
      Logger.info(`⚠️ Erro tratado: ${errorMessage}`);
    }

    throw new Error('Unexpected flow in ErrorHandler');
  }

  private static sendToMonitoring(error: unknown) {
    sendToMonitoringService({
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? (error.stack ?? '') : '',
      timestamp: new Date().toISOString(),
    });
  }
}
