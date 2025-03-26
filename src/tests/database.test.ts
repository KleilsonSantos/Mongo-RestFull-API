import mongoose from 'mongoose';
import { Logger } from '../config/logger';
import { connect, disconnect } from '../config/db';


jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: {
    readyState: 0,
    close: jest.fn(),
  },
}));

jest.mock('../config/logger', () => ({
  Logger: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));



describe('🔌 Conexão com Banco de Dados', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (mongoose.connection as { readyState: number }).readyState = 0; // Redefine o estado da conexão
  });

  it('✅ Deve conectar ao MongoDB com sucesso', async () => {
    (mongoose.connect as jest.Mock).mockResolvedValue({
      connection: { readyState: 1 },
    });

    const connection = await connect();

    expect(mongoose.connect).toHaveBeenCalled();
    expect(connection.connection.readyState).toBe(1);
    expect(Logger.info).toHaveBeenCalledWith(
      '✅🔗 Connected to MongoDB database successfully.',
    );
  });

  it('✅ Deve reutilizar conexão existente se já estiver conectada', async () => {
    (mongoose.connection as { readyState: number }).readyState = 1;

    const connection = await connect();

    expect(mongoose.connect).not.toHaveBeenCalled();
    expect(connection).toBe(mongoose);
    expect(Logger.info).toHaveBeenCalledWith(
      '✅🔗 Reusing existing database connection.',
    );
  });

  it('❌ Deve falhar ao conectar ao MongoDB e chamar Logger.error', async () => {
    const errorMsg = 'Erro ao conectar ao MongoDB';
    (mongoose.connect as jest.Mock).mockRejectedValue(new Error(errorMsg));
    (mongoose.connection as { readyState: number }).readyState = 0;

    await expect(connect()).rejects.toThrow(errorMsg);
    expect(Logger.error).toHaveBeenCalledWith(
      expect.stringContaining('❌ Database connection error:'),
    );
  });

  it('✅ Deve desconectar do MongoDB com sucesso', async () => {
    (mongoose.connection as { readyState: number }).readyState = 1;

    const connectionClose = await disconnect();

    expect(mongoose.connection.close).toHaveBeenCalled();
    expect(connectionClose).toBeUndefined();
    expect(Logger.info).toHaveBeenCalledWith(
      '✅🔗 Disconnected from MongoDB database.',
    );
  });

  it('🔌 Não deve desconectar se não houver conexão ativa', async () => {
    (mongoose.connection as { readyState: number }).readyState = 0;
    const connectionClose = await disconnect();

    expect(mongoose.connection.close).not.toHaveBeenCalled();
    expect(connectionClose).toBeUndefined();
    expect(Logger.info).not.toHaveBeenCalledWith(
      '✅🔗 Disconnected from MongoDB database.',
    );
  });
});

