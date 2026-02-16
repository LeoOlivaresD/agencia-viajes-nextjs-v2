import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log('=== NEXT.JS API ROUTE DELETE ===');
  console.log('ID recibido:', params.id);
  console.log('URL backend:', `${API_URL}/solicitudes/${params.id}`);
  
  try {
    const id = params.id;
    
    const response = await fetch(`${API_URL}/solicitudes/${params.id}`, {
      method: 'DELETE',
    });

    console.log('Status del backend:', response.status);
    
    const data = await response.json();
    console.log('Respuesta del backend:', data);
    
    if (!response.ok) {
      console.log('ERROR: Respuesta no OK');
      return NextResponse.json(data, { status: response.status });
    }

    console.log('=== DELETE EXITOSO EN NEXT.JS ===');
    return NextResponse.json(data);
  } catch (error) {
    console.error('ERROR en API Route:', error);
    return NextResponse.json(
      { success: false, message: 'Error al eliminar solicitud' },
      { status: 500 }
    );
  }
}