import { NextResponse } from 'next/server';

import tokenController from '@/database/controllers/TokenController';
import cors from 'micro-cors';

const corsHandler = cors({
  allowMethods: ['POST', 'GET', 'HEAD'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id'],
  origin: '*'
});

export async function OPTIONS(request: any) {
  try {
    await corsHandler(request);
    return NextResponse.json({});
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}

export async function POST(request: any) {
  try {
    await corsHandler(request);
    const res = await request.json();
    const { email, password } = res.date;
    const auth = await tokenController.createToken({ email, password });
    return NextResponse.json(auth);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
