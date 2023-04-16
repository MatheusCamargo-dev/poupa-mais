import { NextRequest, NextResponse } from 'next/server';

import tokenController from '@/database/controllers/TokenController';
import userController from '@/database/controllers/UserController';

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const { fullname, username, password, email } = res.date;
    const user = await userController.createUser({
      fullname,
      username,
      password,
      email
    });
    if (user) {
      return NextResponse.json(user);
    }
    return NextResponse.json({ status: 0, message: 'Failed to create a user' });
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (token == 'undefined' || token == undefined) {
      return NextResponse.json({ status: 0, message: 'Token invalid' });
    }

    const res = await tokenController.validToken(token);
    if (res && res.status == 1) {
      const user = await userController.showUser();
      return NextResponse.json(user);
    }
    return NextResponse.json(res);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
