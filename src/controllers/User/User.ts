import { Request, Response } from 'express';
import { Users } from '../../types';

export class UserController {
  public create(req: Request, res: Response): void {
    const item: Users.User = {
      name: req.body.name,
      email: req.body.email,
      password: res.locals.auth.createPasswordHash(req.body.password),
    };

    res.json({
      error: 'not implemented',
      isValidItem: Users.isUserItem(item),
      data: item
    });
  }

  public read(req: Request, res: Response): void {
    const { name } = req.params;

    res.json({
      error: 'not implemented',
      data: { name }
    });
  }

  public update(req: Request, res: Response): void {
    const item: Users.User = {
      name: req.body.name,
      email: req.body.email,
      password: res.locals.auth.createPasswordHash(req.body.password),
    };

    res.json({
      error: 'not implemented',
      isValidItem: Users.isUserItem(item),
      data: item
    });
  }

  public delete(req: Request, res: Response): void {
    const { name } = req.params;

    res.json({
      error: 'not implemented',
      data: { name }
    });
  }
}