import { NextRequest, NextResponse } from 'next/server';

interface Artwork {
  id: number;
  title: string;
  artist: string;
  price: number;
  status: 'Available' | 'Sold' | 'Reserved';
  category: string;
  medium: string;
  views: number;
  likes: number;
  featured: boolean;
  description?: string;
  imageUrl?: string;
  dimensions?: string;
  createdAt?: string;
}

let artworks: Artwork[] = [
  {
    id: 1,
    title: 'Sunset Dreams',
    artist: 'Maria Rodriguez',
    price: 2500,
    status: 'Available',
    category: 'Painting',
    medium: 'Oil on Canvas',
    views: 1247,
    likes: 89,
    featured: true,
    description: 'A beautiful sunset landscape capturing the golden hour over rolling hills.',
    dimensions: '24" x 36"',
    createdAt: '2024-01-15',
    imageUrl: '/images/sunset-dreams.jpg'
  },
  // ... other artworks
];

// POST - Like an artwork
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid artwork ID' },
        { status: 400 }
      );
    }

    const artworkIndex = artworks.findIndex(a => a.id === id);

    if (artworkIndex === -1) {
      return NextResponse.json(
        { error: 'Artwork not found' },
        { status: 404 }
      );
    }

    // Increment likes
    artworks[artworkIndex].likes += 1;

    return NextResponse.json({
      message: 'Artwork liked successfully',
      likes: artworks[artworkIndex].likes
    });
  } catch (error) {
    console.error('Like Artwork Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}