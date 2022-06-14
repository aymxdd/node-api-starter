import express, { Request, Response } from 'express';
import { exampleController } from '../../controllers';
import { Auth, useCache } from '../../services';

export const router = express.Router({
    strict: true
});

const auth = new Auth()

router.post('/', auth.checkToken, (req: Request, res: Response) => {
    exampleController.create(req, res);
});

router.get('/', useCache, (req: Request, res: Response) => {
    exampleController.read(req, res);
});

router.get('/:id', useCache, (req: Request, res: Response) => {
    exampleController.read(req, res);
});

router.patch('/', auth.checkToken, (req: Request, res: Response) => {
    exampleController.update(req, res);
});

router.delete('/:id', auth.checkToken, (req: Request, res: Response) => {
    exampleController.delete(req, res);
});