import { KiteConnect } from "kiteconnect";
import type {
  Exchanges,
  TransactionType,
  Product,
  OrderType,
} from "kiteconnect";

const apiKey = process.env.API_KEY || "";
const access_token = process.env.ACCESS_TOKEN || "";

const kc = new KiteConnect({ api_key: apiKey });

async function init() {
  try {
    await generateSession();
  } catch (err) {
    console.error(err);
  }
}

async function generateSession() {
  try {
    kc.setAccessToken(access_token);
  } catch (err) {
    console.error("Error generating session:", err);
  }
}

export async function getProfile() {
  try {
    init();
    const profile = await kc.getProfile();
    // console.log("Profile:", profile);
    return profile;
  } catch (err) {
    console.error("Error getting profile:", err);
  }
}

export async function getHoldings() {
  try {
    init();
    const holdings = await kc.getHoldings();
    // console.log(holdings);
    return holdings;
  } catch (err) {
    console.error("Error fetching holdings", err);
  }
}

export async function placeOrder({
  exchange,
  tradingsymbol,
  transaction_type,
  quantity,
  product,
  order_type,
}: {
  exchange: Exchanges;
  tradingsymbol: string;
  transaction_type: TransactionType;
  quantity: number;
  product: Product;
  order_type: OrderType;
}) {
  try {
    init();
    const order = await kc.placeOrder("regular", {
      exchange,
      tradingsymbol,
      transaction_type,
      quantity,
      product,
      order_type,
    });
    // console.log(order)
    return order;
  } catch (err) {
    console.error("Error placing an order", err);
  }
}

// init();

// getProfile();

// getHoldings();

// placeOrder()
