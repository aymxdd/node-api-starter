import express, { Request, Response } from 'express';
import { userController } from '../../controllers';
import { Auth, useCache } from '../../services';

export const router = express.Router({
    strict: true
});

const auth = new Auth()

router.post('/', auth.checkToken, (req: Request, res: Response) => {
    userController.create(req, res);
});

router.get('/', useCache, auth.checkToken, (req: Request, res: Response) => {
    userController.read(req, res);
});

router.get('/:name', useCache, auth.checkToken, (req: Request, res: Response) => {
    userController.read(req, res);
});

router.patch('/', auth.checkToken, (req: Request, res: Response) => {
    userController.update(req, res);
});

router.delete('/:name', auth.checkToken, (req: Request, res: Response) => {
    userController.delete(req, res);
});