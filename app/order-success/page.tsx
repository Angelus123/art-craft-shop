'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { Copy, ArrowLeft } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

interface OrderData {
  id: string;
  orderNumber: string;
  userId: string;
  status: string;
  totalAmount: number;
  shippingFee: number;
  taxAmount: number;
  customerNote: string | null;
  shippingFullName: string;
  shippingStreet: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  shippingPhone: string;
  billingFullName: string;
  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingPostalCode: string;
  billingCountry: string;
  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
  deliveredAt: string | null;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    description: string;
  }>;
}

const OrderSuccessPage: React.FC = () => {
  const { cart } = useCart();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Sample order data provided
    const sampleOrder = {
      id: "671f8a2b3c4d5e6f78901235",
      orderNumber: "ORD-002",
      userId: "64f7b2a1c4d3e5f6a7b8c9d0",
      status: "DELIVERED",
      totalAmount: 3210,
      shippingFee: 0,
      taxAmount: 10,
      customerNote: null,
      shippingFullName: "Sarah Johnson",
      shippingStreet: "456 Oak Avenue",
      shippingCity: "Los Angeles",
      shippingState: "CA",
      shippingPostalCode: "90210",
      shippingCountry: "US",
      shippingPhone: "+1-555-987-6543",
      billingFullName: "Sarah Johnson",
      billingStreet: "456 Oak Avenue",
      billingCity: "Los Angeles",
      billingState: "CA",
      billingPostalCode: "90210",
      billingCountry: "US",
      createdAt: "2025-10-02T14:30:00.000Z",
      updatedAt: "2025-10-05T13:48:53.856Z",
      paidAt: null,
      deliveredAt: null,
      items: cart.length > 0 ? cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        description: item.description,
      })) : [] // Fallback to empty if cart is empty after clear
    };

    // Check localStorage first, fallback to sample
    const stored = localStorage.getItem('lastOrder');
    if (stored) {
      const parsed = JSON.parse(stored);
      setOrderData({ ...sampleOrder, ...parsed, items: parsed.items || sampleOrder.items });
    } else {
      setOrderData(sampleOrder);
      localStorage.setItem('lastOrder', JSON.stringify(sampleOrder));
    }
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = () => {
    if (orderData) {
      const text = `Order Confirmation
Order Number: ${orderData.orderNumber}
Customer: ${orderData.shippingFullName}
Order ID: ${orderData.id}
Total: $${(orderData.totalAmount / 100).toLocaleString()} (Total Amount: ${orderData.totalAmount})
Shipping: $${(orderData.shippingFee / 100).toLocaleString()}
Tax: $${(orderData.taxAmount / 100).toLocaleString()}
Date: ${new Date(orderData.createdAt).toLocaleString()}
Status: ${orderData.status}
Shipping Address: ${orderData.shippingStreet}, ${orderData.shippingCity}, ${orderData.shippingState} ${orderData.shippingPostalCode}, ${orderData.shippingCountry}
Items: ${orderData.items.map((item) => `${item.name} x${item.quantity}`).join(', ')}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatCurrency = (amount: number) => {
    // Assuming amounts are in cents, divide by 100 for dollars
    return `$${(amount / 100).toFixed(2)}`;
  };

  if (!orderData) {
    return (
      <div className={`${inter.className} min-h-screen bg-gray-50`}>
        <Header isScrolled={isScrolled} />
        <main className="flex justify-center items-center min-h-[70vh] px-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
            <p className="text-gray-600 mb-6">No recent order details available.</p>
            <Link
              href="/shop"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Go to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`${inter.className} min-h-screen bg-gray-50`}>
      <Header isScrolled={isScrolled} />
      <main className={`${isScrolled ? 'pt-32' : 'pt-14'}`}>
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Link */}
          <div className="mb-6">
            <Link
              href="/cart"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Cart
            </Link>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed! 🎉</h1>
              <p className="text-gray-600">Thank you for your purchase, {orderData.shippingFullName}.</p>
            </div>

            {/* Order Details */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h2>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>
                    <strong>Order Number:</strong> {orderData.orderNumber}
                  </p>
                  <p>
                    <strong>Order ID:</strong> {orderData.id}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(orderData.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {orderData.status}
                    </span>
                  </p>
                  <p>
                    <strong>Phone:</strong> {orderData.shippingPhone}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>{orderData.shippingFullName}</p>
                  <p>{orderData.shippingStreet}</p>
                  <p>{orderData.shippingCity}, {orderData.shippingState} {orderData.shippingPostalCode}</p>
                  <p>{orderData.shippingCountry}</p>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h2>
              <div className="space-y-1 text-sm text-gray-700">
                <p>{orderData.billingFullName}</p>
                <p>{orderData.billingStreet}</p>
                <p>{orderData.billingCity}, {orderData.billingState} {orderData.billingPostalCode}</p>
                <p>{orderData.billingCountry}</p>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h2>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(orderData.totalAmount - orderData.shippingFee - orderData.taxAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatCurrency(orderData.shippingFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatCurrency(orderData.taxAmount)}</span>
                </div>
                <div className="border-t pt-2 font-bold">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="text-green-600">{formatCurrency(orderData.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Items List */}
            {orderData.items.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
                <div className="divide-y divide-gray-200">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="py-4 flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} x {formatCurrency(item.price)} = {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={copyToClipboard}
                className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? 'Copied!' : 'Copy Order Details'}
              </button>
              <Link
                href="//shop"
                className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccessPage;