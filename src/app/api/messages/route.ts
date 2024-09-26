import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { Message } from "@lib/DB";
import { Payload } from "@lib/DB";
import { DB_type } from "@lib/DB";

export const GET = async (request: NextRequest) => {
  readDB();

  const roomId = request.nextUrl.searchParams.get("roomId");

  const foundRoom = DB.messages.filter((message:Message)=> message.roomId === roomId);
  if(foundRoom.length < 1){
    return NextResponse.json(
    {
      ok: false,
      message: `Room is not found`,
    },
    { status: 404 } ////
    );
  }

  return NextResponse.json(
  {
    ok: true,
    message: foundRoom,
  },
  );

};
   /*return NextResponse.json(
     {
       ok: false,
       message: `Room is not found`,
     },
     { status: 404 }
   );
};*/

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const {username , password } = body;

  readDB();
  const user =DB.users.find(
    (u) => u.username === username && u.password === password
  )

  if(!user)
   return NextResponse.json(
     {
       ok: false,
       message: `Room is not found`,
     },
     { status: 404 }
   );

   
  const messageId = nanoid();

  writeDB();

  return NextResponse.json({
    ok: true,
    // messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request: NextRequest) => {
  const payload = checkToken();

  if(!payload){
   return NextResponse.json(
  {
       ok: false,
      message: "Invalid token",
    },
    { status: 401 }
   );
  }
  readDB();

  
  return NextResponse.json(
     {
       ok: false,
       message: "Message is not found",
     },
     { status: 404 }
   );

  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};

