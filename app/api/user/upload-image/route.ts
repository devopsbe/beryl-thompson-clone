import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDB } from '@/lib/database';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get form data (with image)
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    
    if (!imageFile) {
      return NextResponse.json({ message: 'No image provided' }, { status: 400 });
    }

    // For a real production app, you would upload the image to a storage service like AWS S3
    // For simplicity in this demo, we'll convert the image to a base64 string and store it directly
    // Note: This is not recommended for production as it can lead to large database documents
    
    // Convert image to base64
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${imageFile.type};base64,${buffer.toString('base64')}`;

    // Update user in database
    await connectToDB();
    
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { image: base64Image },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Profile image updated successfully',
      image: base64Image
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ message: 'Error uploading image' }, { status: 500 });
  }
} 