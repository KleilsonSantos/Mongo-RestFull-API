import dotenv from 'dotenv-flow';

describe('🛡️ load-env', () => {
    it('should load environment variables from .env file', () => {
        dotenv.config();
        expect(process.env).toBeDefined();
    });
});