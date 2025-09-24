'use client';

import { useState, useEffect } from "react";
import { getOrders, updateOrder, deleteOrder, Order } from "@/actions/orders";
import { OrderStatus } from "@/utils/interfaces";
import Link from "next/link";

export default function OrdersSection() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editOrderId, setEditOrderId] = useState<number | null>(null);
  const [editDate, setEditDate] = useState("");
  const [editParticipants, setEditParticipants] = useState("1");
  const [editError, setEditError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const statusConfig = {
    [OrderStatus.PENDING]: { color: "text-yellow-400", text: "Pending" },
    [OrderStatus.CONFIRMED]: { color: "text-green-400", text: "Confirmed" },
    [OrderStatus.CANCELLED]: { color: "text-red-400", text: "Cancelled" }
  };

  const getStatusColor = (status: OrderStatus) => statusConfig[status]?.color || "text-gray-400";
  const getStatusText = (status: OrderStatus) => statusConfig[status]?.text || "Unknown";

  const canEditOrder = (order: Order) => {
    return order.status !== OrderStatus.CANCELLED;
  };

  const canCancelOrder = (order: Order) => {
    return order.status !== OrderStatus.CANCELLED;
  };

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
    if (!canEditOrder(order)) {
      setEditError("Cannot edit cancelled order.");
      return;
    }
    setEditOrderId(order.id);
    setEditDate(order.date.split("T")[0]);
    setEditParticipants(order.participants.toString());
    setEditError(null);
  };

  const handleCancelEdit = () => {
    setEditOrderId(null);
    setEditDate("");
    setEditParticipants("1");
    setEditError(null);
  };

  const handleSaveEdit = async (id: number) => {
    setEditError(null);

    const participantsNum = parseInt(editParticipants, 10);
    if (isNaN(participantsNum) || participantsNum < 1) {
 
      return;
    }

    const result = await updateOrder(id, {
      date: editDate,
      participants: participantsNum,
    });

    if (result.success) {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id
            ? { ...order, date: editDate, participants: participantsNum }
            : order
        )
      );
      handleCancelEdit();
    } else {
      let errorMessage = result.error || "Failed to update order.";
      
      try {
        const errorMatch = errorMessage.match(/\{"message":"([^"]+)"/);
        if (errorMatch) {
          errorMessage = errorMatch[1];
        }
      } catch (e) {
      }
      
      setEditError(errorMessage);
    }
  };

  const handleDelete = async (order: Order) => {
    setDeleteError(null);

    const result = await deleteOrder(order.id);
    if (result.success) {
      setOrders((prev) => prev.filter((orderItem) => orderItem.id !== order.id));
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
                min={orders.find(order => order.id === editOrderId)?.quest?.players?.min}
                max={orders.find(order => order.id === editOrderId)?.quest?.players?.max}
                value={editParticipants}
                onChange={(e) => {
                  setEditParticipants(e.target.value);
                }}
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
              <div className="pt-3">
                <p className="text-sm font-medium text-gray-300">
                  Status: <span className={getStatusColor(order.status)}>{getStatusText(order.status)}</span>
                </p>
              </div>
              <p className="pt-2">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
              <p>Participants: {order.participants}</p>
              <p>Price: ${order.price}</p>
              <p className="text-xs text-gray-400 pt-4">
                Created: {new Date(order.createdAt).toLocaleString()}
              </p>
              {order.updatedAt !== order.createdAt && (
                <p className="text-xs text-gray-400">
                  Updated: {new Date(order.updatedAt).toLocaleString()}
                </p>
              )}
              {deleteError && (
                <p className="text-red-500 text-sm mt-1">{deleteError}</p>
              )}
              <div className="flex gap-2 pt-6 justify-between">
                <button
                  onClick={() => handleEdit(order)}
                  disabled={!canEditOrder(order)}
                  className={`px-9 py-1 rounded text-sm ${
                    canEditOrder(order)
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(order)}
                  disabled={!canCancelOrder(order)}
                  className={`px-6 py-1 rounded text-sm ${
                    canCancelOrder(order)
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
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
