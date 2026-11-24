import express, { Request, Response } from 'express';

export const app = express();

app.use(express.json());

// (Do not modify) Health check endpoint
app.get('/health', function (_, res) {
  res.sendStatus(200);
});

function parseOperands(req: Request): { a: number; b: number } | null {
  const { a, b } = req.query;

  if (typeof a !== 'string' || typeof b !== 'string' || a.trim() === '' || b.trim() === '') {
    return null;
  }

  const numA = Number(a);
  const numB = Number(b);

  if (Number.isNaN(numA) || Number.isNaN(numB)) {
    return null;
  }

  return { a: numA, b: numB };
}

// TODO: Implement the add endpoint
// - Accept two query parameters: `a` and `b`
// - Return JSON: { result: <sum of a and b> }
// - If either `a` or `b` is missing or not a valid number, return 400: { error: 'Invalid operands' }
app.get('/api/v1/add', function (req: Request, res: Response) {
  const operands = parseOperands(req);
  if (!operands) {
    return res.status(400).json({ error: 'Invalid operands' });
  }
  
  return res.status(200).json({ result: operands.a + operands.b });
});

// TODO: Implement the subtract endpoint
// - Accept two query parameters: `a` and `b`
// - Return JSON: { result: <a minus b> }
// - If either `a` or `b` is missing or not a valid number, return 400: { error: 'Invalid operands' }
app.get('/api/v1/subtract', function (req: Request, res: Response) {
  const operands = parseOperands(req);
  if (!operands) {
    return res.status(400).json({ error: 'Invalid operands' });
  }
  
  return res.status(200).json({ result: operands.a - operands.b });
});

// TODO: Implement the multiply endpoint
// - Accept two query parameters: `a` and `b`
// - Return JSON: { result: <product of a and b> }
// - If either `a` or `b` is missing or not a valid number, return 400: { error: 'Invalid operands' }
app.get('/api/v1/multiply', function (req: Request, res: Response) {
  const operands = parseOperands(req);
  if (!operands) {
    return res.status(400).json({ error: 'Invalid operands' });
  }
  
  return res.status(200).json({ result: operands.a * operands.b });
});

// TODO: Implement the divide endpoint
// - Accept two query parameters: `a` and `b`
// - Return JSON: { result: <a divided by b> }
// - If either `a` or `b` is missing or not a valid number, return 400: { error: 'Invalid operands' }
// - If `b` is 0, return 400: { error: 'Division by zero' }
app.get('/api/v1/divide', function (req: Request, res: Response) {
  const operands = parseOperands(req);
  if (!operands) {
    return res.status(400).json({ error: 'Invalid operands' });
  }

  if (operands.b === 0) {
    return res.status(400).json({ error: 'Division by zero' });
  }
  
  return res.status(200).json({ result: operands.a / operands.b });
});
