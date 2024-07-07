import dotenv from 'dotenv';
import { v2 as Cloudinary } from 'cloudinary';

jest.mock('dotenv');
jest.mock('cloudinary');

const mockConfig = {
    CLOUD_NAME: 'test_cloud_name',
    API_KEY: 'test_api_key',
    API_SECRET: 'test_api_secret'
};

// Set up process.env variables
process.env.CLOUD_NAME = mockConfig.CLOUD_NAME;
process.env.API_KEY = mockConfig.API_KEY;
process.env.API_SECRET = mockConfig.API_SECRET;

import { cloudinary } from '../../app/middleware/cloudinary';
describe('Cloudinary Configuration', () => {
    beforeAll(() => {
        // Mock process.env to simulate environment variables
        jest.spyOn(dotenv, 'config');
        jest.spyOn(Cloudinary, 'config');
    });

    afterAll(() => {
        // Restore process.env after tests
        jest.restoreAllMocks();
    });

    it('should initialize Cloudinary configuration with environment variables', () => {
        // Ensure dotenv.config() is called
        expect(dotenv.config).toHaveBeenCalled();

        // Ensure cloudinary.config() is called with correct parameters
        expect(cloudinary.config()).toEqual(expect.objectContaining({
            cloud_name: mockConfig.CLOUD_NAME,
            api_key: mockConfig.API_KEY,
            api_secret: mockConfig.API_SECRET
        }));
    });

    it('should export a configured Cloudinary instance', () => {
        // Ensure cloudinary is the correct instance of Cloudinary
        expect(cloudinary).toBe(Cloudinary);

        // Ensure Cloudinary instance is configured correctly
        expect(cloudinary.config()).toEqual(expect.objectContaining({
            cloud_name: mockConfig.CLOUD_NAME,
            api_key: mockConfig.API_KEY,
            api_secret: mockConfig.API_SECRET
        }));
    });
});
