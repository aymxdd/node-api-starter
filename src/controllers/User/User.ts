import { Request, Response } from 'express';
import { Users } from '../../types';

export class UserController {
  public create(req: Request, res: Response): void {
    const item: Users.User = {
      id: req.body.id,
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
    const { id } = req.params;

    res.json({
      error: 'not implemented',
      data: { id }
    });
  }

  public update(req: Request, res: Response): void {
    const item: Users.User = {
      id: req.body.id,
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
    const { id } = req.params;

    res.json({
      error: 'not implemented',
      data: { id }
    });
  }

  public login(req: Request, res: Response): void {
    const { id, password } = req.params;

    if (id && id.length > 0 && typeof id === 'string' && password && password.length > 0 && typeof password === 'string') {
      // replace this line with database logic to check if user exists and fetch his password hash
      const passwordHash = 'abcd1234';

      if (res.locals.auth.comparePasswordHash(password, passwordHash)) {
        res.json({
          error: false,
          data: {
            id: id,
            token: res.locals.auth.createToken(id, req.clientIp),
          }
        })
      } else {
        res.json({ error: 'invalid password' });
      }
    } else {
      res.json({ error: 'invalid id or password' });
    }
  }
}