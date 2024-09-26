import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";


export const GET = async () => {
  const payload = checkToken();
  readDB();
  return NextResponse.json({
    ok: true,
    //rooms:
    //totalRooms:
  });
};


export const POST = async (request: NextRequest) => {
  const payload = checkToken();
  if (!payload) {
   return NextResponse.json(
     {
       ok: false,
       message: "Invalid token",
     },
     { status: 401 }
   );
  }

   
 const { role } = await request.json();

  readDB();

  
  
  if (role ==="Admin") {
   return NextResponse.json(
     {
       ok: false,
       message: `Room ${"replace this with room name"} already exists`,
     },
     { status: 400 }
   );
  }
  const roomId = nanoid();

  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    //roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};
