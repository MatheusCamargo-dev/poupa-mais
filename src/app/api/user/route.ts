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
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (token == 'undefined' || token == undefined) {
      return NextResponse.json({ status: 0, message: 'Token invalid' });
    }
    const formData = await request.formData();
    const _id = formData.get('_id');
    const avatar = formData.get('avatar');
    const username = formData.get('username');
    const fullname = formData.get('fullname');
    const email = formData.get('email');
    const dataExpenseCategories = formData.getAll('expenseCategories');
    const category = dataExpenseCategories[0] as string;
    const expenseCategories = JSON.parse(category)

    const res = await tokenController.validToken(token);

    if (res && res.status == 1 && res.userData?.id == _id) {
      const query = {_id, username, fullname, email, expenseCategories};
      let updateUser;
      if(avatar && avatar !== 'null'){
        const { data: deleteData } = await supabase
        .storage
        .from('poupa-mais')
        .remove([`avatars/${_id}`]);
        if(deleteData){
          const { data: uploadData } = await supabase
          .storage
          .from('poupa-mais')
          .upload(`avatars/${_id}`, avatar, {
            cacheControl: '3600',
            upsert: false
          })
          if(uploadData){
              const data = {...query, avatar: uploadData.path};
              updateUser = await userController.updateUser(data);
          }
        }
      }else{
        updateUser = await userController.updateUser(query);
      }
      return NextResponse.json(updateUser);
   }
   return NextResponse.json(res);
  }catch(e){
    return NextResponse.json({message: e});
  }
}
