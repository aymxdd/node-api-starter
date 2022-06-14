import { Request, Response } from 'express';
import { Example } from '../../types';

export class ExampleController {
  public create(req: Request, res: Response): void {
    const item: Example.Example = {
      id: req.body.id,
      content: req.body.content
    };

    res.json({ error: 'not implemented', data: item });
  }

  public read(req: Request, res: Response): void {
    const { id } = req.params;

    res.json({ error: 'not implemented', data: { id } });
  }

  public update(req: Request, res: Response): void {
    const item: Example.Example = {
      id: req.body.id,
      content: req.body.content
    };

    res.json({ error: 'not implemented', data: item });
  }

  public delete(req: Request, res: Response): void {
    const { id } = req.params;

    res.json({ error: 'not implemented', data: { id } });
  }
}