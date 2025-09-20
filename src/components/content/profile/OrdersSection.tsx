'use client';

import { useState, useEffect } from "react";
import { getOrders, updateOrder, deleteOrder, Order } from "@/actions/orders";
import Link from "next/link";

export default function OrdersSection() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editOrderId, setEditOrderId] = useState<number | null>(null);
  const [editDate, setEditDate] = useState("");
  const [editParticipants, setEditParticipants] = useState(1);
  const [editError, setEditError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await getOrders();
      if (result.success && result.data) {
        setOrders(result.data);
      } else {
        setError(result.error || "Failed to load orders.");
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleEdit = (order: Order) => {
    setEditOrderId(order.id);
    setEditDate(order.date.split("T")[0]);
    setEditParticipants(order.participants);
    setEditError(null);
  };

  const handleCancelEdit = () => {
    setEditOrderId(null);
    setEditDate("");
    setEditParticipants(1);
    setEditError(null);
  };

  const handleSaveEdit = async (id: number) => {
    setEditError(null);
    const now = new Date();
    const questDate = new Date(editDate);
    const diffInDays = Math.ceil(
      (questDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays < 7) {
      setEditError(
        "Date cannot be changed less than 7 days before the quest."
      );
      return;
    }

    const result = await updateOrder(id, {
      date: editDate,
      participants: editParticipants,
    });

    if (result.success) {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id
            ? { ...order, date: editDate, participants: editParticipants }
            : order
        )
      );
      handleCancelEdit();
    } else {
      setEditError(result.error || "Failed to update order.");
    }
  };

  const handleDelete = async (id: number, date: string) => {
    setDeleteError(null);
    const now = new Date();
    const questDate = new Date(date);
    const diffInDays = Math.ceil(
      (questDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays < 7) {
      setDeleteError("Cannot cancel less than 7 days before the quest date.");
      return;
    }

    const result = await deleteOrder(id);
    if (result.success) {
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } else {
      setDeleteError(result.error || "Failed to cancel order.");
    }
  };

  if (loading) return <div className="text-gray-300">Loading orders...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (orders.length === 0)
    return <div className="text-gray-300">You don't have any orders yet.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white justify-items-center">
      {orders.map((order) => (
        <div
          key={order.id}
          className="w-[340px] min-h-[300px] bg-[#2B2B2B] p-4 rounded-lg shadow-md border border-gray-700 mx-auto transition-all duration-300"
        >
          {editOrderId === order.id ? (
            <div className="space-y-2">
              <p className="text-lg font-semibold text-center">
                {order.questTitle}
              </p>
              <label className="text-sm block">Date</label>
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className="bg-gray-800 text-white p-2 rounded w-full"
              />
              <label className="text-sm block">Participants</label>
              <input
                type="number"
                min={1}
                max={8}
                value={editParticipants}
                onChange={(e) =>
                  setEditParticipants(Math.max(1, Number(e.target.value)))
                }
                className="bg-gray-800 text-white p-2 rounded w-full"
              />
              <p className="text-red-500 text-sm min-h-[20px]">
                {editError || "\u00A0"}
              </p>
              <div className="flex gap-2 pt-18 justify-between">
                <button
                  onClick={() => handleSaveEdit(order.id)}
                  className="px-9 py-1 bg-green-500 rounded text-sm"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-6 py-1 bg-gray-500 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                href={`/quest/${order.questId}`}
                className="text-lg font-semibold text-orange-400 hover:underline text-center block"
              >
                {order.questTitle}
              </Link>
              <p className="pt-5">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
              <p>Participants: {order.participants}</p>
              <p>Price: ${order.price}</p>
              <p className="text-xs text-gray-400 pt-6">
                Created at: {new Date(order.createdAt).toLocaleString()}
              </p>
              {deleteError && (
                <p className="text-red-500 text-sm mt-1">{deleteError}</p>
              )}
              <div className="flex gap-2 pt-32 justify-between">
                <button
                  onClick={() => handleEdit(order)}
                  className="px-9 py-1 bg-orange-500 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(order.id, order.date)}
                  className="px-6 py-1 bg-red-600 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
