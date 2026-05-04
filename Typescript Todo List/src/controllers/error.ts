import { Request, Response } from 'express';

const errorController = (req: Request, res: Response) => {
  res.status(404).send(
    `<h1>
      <center>Error 404 Page Not Found</center>
      </h1>`,
  );
};

export default errorController;
