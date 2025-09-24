'use server';

import { cookies } from 'next/headers';
import { COOKIE_NAMES } from '@/utils/tokens';
import { OrderStatus } from '@/utils/interfaces';

export interface Order {
  id: number;
  questId: string;
  questTitle: string;
  date: string;
  participants: number;
  price: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  quest?: {
    players: {
      min: number;
      max: number;
    };
  };
}

export interface CreateOrderData {
  questId: string;
  date: string;
  participants: number;
}

export interface UpdateOrderData {
  date: string;
  participants: number;
}

async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value || null;
}

export async function createOrder(data: CreateOrderData) {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: 'No token found' };
    }

    const response = await fetch(`${process.env.API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: `Failed to create order: ${response.status} - ${errorText}` };
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Internal server error' };
  }
}

export async function getOrders(): Promise<{ success: boolean; data?: Order[]; error?: string }> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: 'No token found' };
    }

    const response = await fetch(`${process.env.API_BASE_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: `Failed to fetch orders: ${response.status} - ${errorText}` };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Internal server error' };
  }
}

export async function updateOrder(id: number, data: UpdateOrderData) {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: 'No token found' };
    }

    const response = await fetch(`${process.env.API_BASE_URL}/orders/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: `Failed to update order: ${response.status} - ${errorText}` };
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Internal server error' };
  }
}

export async function deleteOrder(id: number) {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: 'No token found' };
    }

    const response = await fetch(`${process.env.API_BASE_URL}/orders/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: `Failed to delete order: ${response.status} - ${errorText}` };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Internal server error' };
  }
}
