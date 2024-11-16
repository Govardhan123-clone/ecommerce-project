// app/cart/page.tsx

import Link from 'next/link';

export default function CartPage() {
  // Cart items and total logic here

  return (
    <div>
      {/* Cart items display */}
      <Link href="/payment">
        <button>Proceed to Payment</button>
      </Link>
    </div>
  );
}
