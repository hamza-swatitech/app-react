import { NextRequest,NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/connectDB"
import User from "@/utils/models/User";

export async function POST(req:NextRequest){
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
      }
    
      try {
        await connectToDatabase();
        const body = await req.json();
        const { name, email, password } = body;
    
        if (!name || !email || !password) {
          return NextResponse.json({ message: 'Please provide all required fields' }, { status: 400 });
        }
    
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }
    
        // Create a new user
        const newUser = new User({ name, email, password });
        await newUser.save();
    
        return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
      } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
      }

}




export async function GET() {
    try {
        await connectToDatabase();
        const users = await User.find();
        return NextResponse.json({ data: users });
    } catch (error) {
        return NextResponse.json({ error });
    }
}