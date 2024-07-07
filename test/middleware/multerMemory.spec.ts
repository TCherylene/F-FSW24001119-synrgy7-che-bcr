import { multerMemory } from '../../app/middleware/multerMemory';
import { Request, Response } from 'express';

describe('multer with memoryStorage', () => {
    it('should handle file upload in memory', (done) => {
        const upload = multerMemory.single('file');

        const req = {
            file: {
                fieldname: 'file',
                originalname: 'test.jpg',
                buffer: Buffer.from('test data'),
                mimetype: 'image/jpeg'
            }
        } as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
            end: jest.fn().mockReturnThis()
        } as unknown as Response;

        upload(req, res, (err) => {
            expect(err).toBeUndefined();
            expect(req.file).toBeDefined();
            expect(req.file!.originalname).toBe('test.jpg');
            // Add more assertions as needed for file handling

            done();
        });
    });
});
