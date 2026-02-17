import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function GET(
  _request: NextRequest, // ✅ CAMBIO: agregado guión bajo
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const response = await fetch(`${API_URL}/solicitudes/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching solicitud:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener la solicitud' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest, // ✅ CAMBIO: agregado guión bajo
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const response = await fetch(`${API_URL}/solicitudes/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error deleting solicitud:', error);
    return NextResponse.json(
      { success: false, error: 'Error al eliminar la solicitud' },
      { status: 500 }
    );
  }
}