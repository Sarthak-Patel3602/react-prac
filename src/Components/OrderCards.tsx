import { useEffect, useState } from "react";
import axios from "axios";
import { FileText, Calendar, Clock, Truck } from "lucide-react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
}

interface Cart {
  id: number;
  userId: number;
  total: number;
  totalProducts: number;
}

interface Order extends Cart {
  user: User;
}

interface CartsResponse {
  carts: Cart[];
}

interface UsersResponse {
  users: User[];
}

const ITEMS_PER_PAGE = 9;

const OrderCards = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const [cartsResponse, usersResponse] = await Promise.all([
          axios.get<CartsResponse>("https://dummyjson.com/carts?limit=100"),
          axios.get<UsersResponse>("https://dummyjson.com/users?limit=100"),
        ]);

        const carts = cartsResponse.data.carts;
        const users = usersResponse.data.users;

        // Create a map for quick user lookup
        const userMap = new Map<number, User>(
          users.map((user) => [user.id, user]),
        );

        // Match each cart with its user
        const formattedOrders: Order[] = carts
          .map((cart) => {
            const user = userMap.get(cart.userId);

            if (!user) return null;

            return {
              ...cart,
              user,
            };
          })
          .filter((order): order is Order => order !== null);

        setOrders(formattedOrders);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to fetch orders",
          );
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, orders.length));
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">Loading orders...</div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Customer Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <>
          {/* Order Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {orders.slice(0, visibleCount).map((order) => (
              <div
                key={order.id}
                className="w-full rounded-md border border-gray-200 bg-white p-2.5 shadow-md"
              >
                <div className="grid grid-cols-2">
                  {/* Left Section */}
                  <div className="relative border-r border-gray-300 px-1.5 pb-1">
                    <div className="mb-2 flex justify-center">
                      <img
                        src={order.user.image}
                        alt={`${order.user.firstName} ${order.user.lastName}`}
                        className="h-[74px] w-[74px] rounded-full border-2 border-gray-300 object-cover"
                      />
                    </div>

                    <div className="flex flex-col gap-2 text-[13px] text-slate-800">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="shrink-0 text-sky-600" />
                        <span>MT#{order.id}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="shrink-0 text-sky-600" />
                        <span>24 Nov 2026</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock size={16} className="shrink-0 text-sky-600" />
                        <span>05:02 PM</span>
                      </div>
                    </div>

                    {/* Divider Notch */}
                    <span className="absolute -right-[7px] top-[75px] h-3.5 w-3.5 rotate-45 border-r border-t border-gray-300 bg-white" />
                  </div>

                  {/* Right Section */}
                  <div className="flex min-w-0 flex-col items-start pl-4 pr-1 pt-1">
                    <h2 className="break-words text-sm font-semibold leading-5 text-slate-900">
                      {order.user.firstName} {order.user.lastName}
                    </h2>

                    <p className="mt-6 text-sm font-medium text-slate-900">
                      {order.total.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      })}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {order.totalProducts} products
                    </p>

                    <button
                      type="button"
                      className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-md bg-[#bd9826] px-2 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#a98720]"
                    >
                      <Truck size={15} />
                      Dispatched
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < orders.length && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={handleLoadMore}
                className="cursor-pointer rounded-md bg-[#bd9826] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a98720]"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderCards;
