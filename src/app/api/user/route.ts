import { NextRequest, NextResponse } from 'next/server';

import tokenController from '@/database/controllers/TokenController';
import userController from '@/database/controllers/UserController';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { data } = await request.json();
    const { fullname, username, password, email } = data;
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

export async function PUT(request: NextRequest) {
  try{
    console.log('PUT ACCOUNT');
    const formData = await request.formData();
    const _id = formData.get('_id');
    const avatar = formData.get('avatar');
    const username = formData.get('username');
    const fullname = formData.get('fullname');
    const email = formData.get('email');
    if(avatar && username){

      const { data: deleteData } = await supabase
       .storage
       .from('poupa-mais')
       .remove([`avatars/${username}`]);
      if(deleteData){
        console.log(deleteData);
        const { data: uploadData } = await supabase
         .storage
         .from('poupa-mais')
         .upload(`avatars/${username}`, avatar, {
           cacheControl: '3600',
           upsert: false
         })
         console.log(uploadData);
      }
    }
    return NextResponse.json('updated with sucess');

  }catch(e){
    console.log(e);
    return NextResponse.json({message: e});

  }
}
