'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
  PayPalButtonsComponentProps,
} from '@paypal/react-paypal-js';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { ArrowLeft, CreditCard, Truck, Shield, X, Copy } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

interface PayPalOrder {
  id: string;
  status: string;
  payer: {
    name: {
      given_name: string;
    };
    email_address?: string;
  };
  [key: string]: unknown;
}

const inter = Inter({ subsets: ['latin'] });

const PayPalButtonWrapper: React.FC<{
    createPaypalProps: () => PayPalButtonsComponentProps;
    total: number;
    onError: (err: unknown) => void;
    clearCart: () => void;
    setShowInvoiceModal: (show: boolean) => void;
    setOrderDetails: (details: PayPalOrder | null) => void;
    setPaypalError: (error: string) => void;
    setIsProcessing: (processing: boolean) => void;
}> = ({
    createPaypalProps,
    total,
    onError,
    clearCart,
    setShowInvoiceModal,
    setOrderDetails,
    setPaypalError,
    setIsProcessing,
}) => {
    const [{ isPending }] = usePayPalScriptReducer();

    return (
        <>
            {isPending ? (
                <div className="flex justify-center">
                    <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
            ) : (
                <PayPalButtons {...createPaypalProps()} />
            )}
        </>
    );
};

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { clearCart } = useCart();
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [paypalClientId, setPaypalClientId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paypalError, setPaypalError] = useState<string>('');
  const [orderDetails, setOrderDetails] = useState<PayPalOrder | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const shippingFee = 10.00;
  const taxRate = 0.1; // 10% tax

  const { cart } = useCart();
  useEffect(() => {
    const stored = localStorage.getItem('checkoutItems');
    if (stored) {
      setCheckoutItems(JSON.parse(stored));
    } else {
      // Fallback to full cart if no selected items
      setCheckoutItems(cart);
    }
  }, [cart]);

  const totalItems = checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingFee;

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
    if (!clientId) {
      console.error('PayPal Client ID is missing');
      setPaypalError('Payment system unavailable. Please try again.');
    }
    setPaypalClientId(clientId);
  }, []);

  const copyToClipboard = () => {
    if (orderDetails) {
      const text = `Order Receipt
Customer: ${orderDetails.payer.name.given_name}
Order ID: ${orderDetails.id}
Total: $${total.toLocaleString()}
Date: ${new Date().toLocaleString()}
Status: ${orderDetails.status}`;
      navigator.clipboard.writeText(text);
      alert('Order details copied to clipboard!');
    }
  };

  const createPaypalProps = (): PayPalButtonsComponentProps => ({
    style: {
      layout: 'vertical',
      color: 'blue',
      shape: 'rect',
      label: 'paypal',
    },
    createOrder: async (data, actions) => {
      try {
        const orderId = await actions.order.create({
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                value: total.toFixed(2),
                currency_code: 'USD',
              },
              description: 'Handcrafted Artworks Order',
            },
          ],
          application_context: {
            shipping_preference: 'NO_SHIPPING',
          },
        });
        setOrderDetails(null);
        setPaypalError('');
        return orderId;
      } catch (err) {
        console.error('createOrder error:', err);
        setPaypalError('Failed to create order. Please try again.');
        throw err;
      }
    },
    onApprove: async (data, actions) => {
      setIsProcessing(true);
      try {
        if (!actions.order) {
          throw new Error('Order actions are unavailable.');
        }
        const details = await actions.order.capture();
        if (
          details &&
          'id' in details &&
          'status' in details &&
          'payer' in details &&
          details.payer &&
          'name' in details.payer &&
          details.payer.name &&
          'given_name' in details.payer.name
        ) {
          const orderData = {
            id: details.id as string,
            status: details.status as string,
            payer: {
              name: {
                given_name: details.payer.name.given_name as string,
              },
              email_address: (details.payer.email_address as string | undefined) ?? undefined,
            },
            total: total,
            items: checkoutItems,
            date: new Date().toISOString(),
          };
          setOrderDetails({
            id: details.id as string,
            status: details.status as string,
            payer: {
              name: {
                given_name: details.payer.name.given_name as string,
              },
              email_address: (details.payer.email_address as string | undefined) ?? undefined,
            },
          });
          localStorage.setItem('lastOrder', JSON.stringify(orderData));
          setPaypalError('');
          clearCart();
          localStorage.removeItem('checkoutItems');
          setShowInvoiceModal(true);
        } else {
          throw new Error('Incomplete payment details');
        }
      } catch (err) {
        console.error('onApprove error:', err);
        setPaypalError('Payment failed. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    },
    onError: (err) => {
      console.error('PayPal Error:', err);
      setPaypalError('An error occurred. Please try again.');
      setIsProcessing(false);
    },
  });

  const handleError = (err: unknown) => {
    setPaypalError('An error occurred during payment. Please try again.');
    console.error('PayPal error:', err);
  };

  if (checkoutItems.length === 0) {
    return (
      <div className={`${inter.className} min-h-screen bg-gray-50`}>
        <Header isScrolled={isScrolled} />
        <main className="flex justify-center items-center min-h-[70vh] px-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              🛒
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Items to Checkout</h2>
            <p className="text-gray-600 mb-6">
              Your cart is empty. Please add items before proceeding to checkout.
            </p>
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
        <div className="max-w-6xl mx-auto px-4">
          {/* Back to Cart */}
          <div className="mb-6">
            <Link
              href="/cart"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Cart
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Checkout</h1>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT PANEL: Order Details */}
            <section className="flex-1">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50">
                  <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="p-4 flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-medium text-gray-900">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                          <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 space-y-4">
                  {/* Shipping Address - Simplified */}
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Truck className="w-4 h-4 text-gray-400" />
                    <span>Shipping to: Example Address, City, State 12345</span>
                  </div>
                  {/* Payment Method */}
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span>Pay with PayPal</span>
                  </div>
                </div>
              </div>
            </section>

            {/* RIGHT PANEL: Payment & Summary */}
            <aside className="w-full lg:w-96">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="font-semibold text-lg text-gray-900 mb-4">Order Total</h2>
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                    <span className="font-medium text-gray-900">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-900">{formatCurrency(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax ({taxRate * 100}%)</span>
                    <span className="font-medium text-gray-900">{formatCurrency(tax)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-2 text-gray-500 font-semibold flex justify-between text-base">
                    <span>Total</span>
                    <span className="text-gray-900">{formatCurrency(total)}</span>
                  </div>
                </div>

                {paypalError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center">
                    <X className="w-4 h-4 mr-2" />
                    {paypalError}
                  </div>
                )}

                {paypalClientId ? (
                  <PayPalScriptProvider options={{ clientId: paypalClientId, currency: 'USD', intent: 'capture' }}>
                    <PayPalButtonWrapper
                      createPaypalProps={createPaypalProps}
                      total={total}
                      onError={handleError}
                      clearCart={clearCart}
                      setShowInvoiceModal={setShowInvoiceModal}
                      setOrderDetails={setOrderDetails}
                      setPaypalError={setPaypalError}
                      setIsProcessing={setIsProcessing}
                    />
                  </PayPalScriptProvider>
                ) : (
                  <div className="flex justify-center">
                    <p className="text-gray-600">Payment system loading...</p>
                  </div>
                )}

                {/* Trust Badges */}
                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  {['Secure SSL-encrypted payments', 'Money-back guarantee', 'Customer protection'].map(
                    (text, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <Shield className="w-3 h-3 text-white" />
                        </div>
                        <span>{text}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {showInvoiceModal && orderDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Payment Successful 🎉</h2>
            <p className="mb-2 text-gray-600">Thank you, {orderDetails.payer.name.given_name}!</p>
            <p className="mb-4 text-gray-600">
              Your order of <strong>${total.toLocaleString()}</strong> has been placed.
            </p>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Order ID:</strong> {orderDetails.id}
              </p>
              <p>
                <strong>Status:</strong> {orderDetails.status}
              </p>
              <p>
                <strong>Date:</strong> {new Date().toLocaleString()}
              </p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={copyToClipboard}
                className="flex items-center cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Details
              </button>
              <button
                onClick={() => {
                  setShowInvoiceModal(false);
                  router.push('/order-success');
                }}
                className="px-4 py-2 bg-gray-900 cursor-pointer rounded hover:bg-gray-400 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

export default CheckoutPage;