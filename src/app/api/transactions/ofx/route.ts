import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

// import tokenController from '@/database/controllers/TokenController';
import { XMLParser } from 'fast-xml-parser';
import { buffer } from 'micro';

export async function POST(request: NextApiRequest) {
  try {
    const req = await request.body;

    const reqBuffer = await buffer(req);
    const file = reqBuffer.toString();

    const parse = new XMLParser();
    const xmlData = file.toString();
    const jsonObj = parse.parse(xmlData);

    console.log(jsonObj);

    return NextResponse.json({ status: 0, message: 'Failed to add a expanse' });
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
