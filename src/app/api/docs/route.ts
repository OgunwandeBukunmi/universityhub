import { NextResponse, type NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const client = await clientPromise
export  async function GET(){
try{

const db = client.db("emmanuel")
const docs = await db.collection("docs").find({}).toArray()
console.log(docs)
return NextResponse.json({success : true,data : docs},{status:200})
}catch(err){
    console.log(err)
    return NextResponse.json({success:false,message : err.message},{status : 500})
}

}

export async function POST(req : NextRequest){
    const {title,faculty, description ,splitcategory }  = await req.json()
    try{
        const db = client.db("emmanuel")
        const doc = await db.collection("docs").insertOne({title,faculty, description , category : splitcategory})

        if(doc){
            console.log(doc)
            return  NextResponse.json({success : true,data:doc},{status:200})
        }
    }
    catch(err){
     console.log(err)
    return NextResponse.json({success:false,message : err.message},{status : 500})
    }
   
}

export async function DELETE(req: NextRequest){
    const{id} = await req.json()
    console.log(id)
    try{
    const db = client.db("emmanuel")
    const doc = await db.collection("docs").deleteOne({_id : new ObjectId(id)});
     if(doc){
         console.log(doc)
        return  NextResponse.json({success : true,data:doc},{status:200})
        }
        return NextResponse.json({succes : false},{status:404});
    }
    
    catch(err){
      console.log(err)
    return NextResponse.json({success:false,message : err.message},{status : 500})
}

}