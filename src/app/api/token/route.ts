import { NextRequest, NextResponse } from 'next/server';

import tokenController from '@/database/controllers/TokenController';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token');
    if (token == undefined)
      return NextResponse.json({ status: 0, message: 'Token invalid' });
    const res = await tokenController.validToken(token?.value);
    return NextResponse.json(res);
  } catch (e) {
    console.error(e);
    return NextResponse.json(e);
  }
}
