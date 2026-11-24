import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import { app } from '../src/app.js';

const request = supertest(app);

// ============================================================
// Health endpoint — example provided, do not modify
// ============================================================
describe('GET /health', () => {
  it('should return 200 OK', async () => {
    const res = await request.get('/health');
    expect(res.statusCode).toEqual(200);
  });
});

// ============================================================
// Tests for the add endpoint
// ============================================================
describe('GET /api/v1/add', () => {
  it('should return the sum of two numbers', async() => {
    const res = await request.get('/api/v1/add').query({ a: '10', b: '5' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ result: 15 });
  });

  it('should handle negative numbers', async() => {
    const res = await request.get('/api/v1/add').query({ a: '-10', b: '4' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ result: -6 });
  });

  it('should return 400 if operands are missing', async() => {
    const res = await request.get('/api/v1/add').query({ a: '10' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Invalid operands' });
  });

  it('should return 400 if operands are not numbers', async() => {
    const res = await request.get('/api/v1/add').query({ a: 'abc', b: '4' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Invalid operands' });
  });
});

// ============================================================
// Tests for the subtract endpoint
// ============================================================
describe('GET /api/v1/subtract', () => {
  it('should return the difference of two numbers', async () => {
    const res = await request.get('/api/v1/subtract').query({ a: '20', b: '8' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ result: 12 });
  });

  it('should handle negative numbers', async () => {
    const res = await request.get('/api/v1/subtract').query({ a: '-5', b: '-15' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ result: 10 });
  });

  it('should return 400 if operands are missing', async () => {
    const res = await request.get('/api/v1/subtract').query({ b: '5' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Invalid operands' });
  });

  it('should return 400 if operands are not numbers', async () => {
    const res = await request.get('/api/v1/subtract').query({ a: '10', b: 'abc' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Invalid operands' });
  });
});

// ============================================================
// Tests for the multiply endpoint
// ============================================================
describe('GET /api/v1/multiply', () => {
  it('should return the product of two numbers', async () => {
    const res = await request.get('/api/v1/multiply').query({ a: '6', b: '7' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ result: 42 });
  });

  it('should handle negative numbers', async () => {
    const res = await request.get('/api/v1/multiply').query({ a: '-4', b: '3' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ result: -12 });
  });

  it('should return 400 if operands are missing', async () => {
    const res = await request.get('/api/v1/multiply');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Invalid operands' });
  });

  it('should return 400 if operands are not numbers', async () => {
    const res = await request.get('/api/v1/multiply').query({ a: 'abc', b: 'xyz' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Invalid operands' });
  });
});

// ============================================================
// Tests for the divide endpoint
// ============================================================
describe('GET /api/v1/divide', () => {
  it('should return the quotient of two numbers', async () => {
    const res = await request.get('/api/v1/divide').query({ a: '20', b: '4' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ result: 5 });
  });

  it('should handle negative numbers', async () => {
    const res = await request.get('/api/v1/divide').query({ a: '-18', b: '3' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ result: -6 });
  });

  it('should return 400 if operands are missing', async () => {
    const res = await request.get('/api/v1/divide').query({ a: '10' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Invalid operands' });
  });

  it('should return 400 if operands are not numbers', async () => {
    const res = await request.get('/api/v1/divide').query({ a: '10', b: 'abc' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Invalid operands' });
  });

  it('should return 400 when b is 0 (division by zero)', async () => {
    const res = await request.get('/api/v1/divide').query({ a: '10', b: '0' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Division by zero' });
  });
});
