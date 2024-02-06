import { Product } from "@/components/CartPage/CartItem";
import { FormValues } from "@/components/profile/ProfileForm";
import { CartOffer, ProductOffer } from "../admin/admin";

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

interface LoginProps {
  email?: string;
  password: string;
}

export interface Contact {
  role: string;
  name: string;
  email: string;
  phoneNumber: string;
  option: string;
  comment: string;
}

export interface UpdateProps {
  values: FormValues;
}

interface ReviewProps {
  productId: string;
  heading: string;
  rating: number;
  comment: string;
}

export interface UpdateCartProps {
  products: {
    product: string;
    quantity: string;
    size: string;
    totalPrice: number;
    discountedPrice: number;
  }[];
  value: number;
  type: string;
}

export interface CreateOrderProps {
  products: UpdateCartProps[];
  totalAmount: number;
  discountedAmount: number;
  modeOfPayment: string;
  shippingAddress: string;
}

export interface VerifyTokenProps {
  _id: string;
  forgotPasswordToken: string;
}

export interface UpdatePasswordProps {
  _id: string;
  newPassword: string;
}

export interface VerifyProps {
  email: string;
}

export async function registerUser({ name, email, password }: RegisterProps) {
  const response = await fetch(
    `https://thi-api.onrender.com/api/user/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }
  );
  const responseData = await response.json();
  return responseData;
}

export async function loginUser({ email, password }: LoginProps) {
  try {
    const response = await fetch(
      `https://thi-api.onrender.com/api/user/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const responseData = await response.json();

    localStorage.setItem("access_token", responseData.access_token);

    return responseData;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

export async function verify({ email }: VerifyProps) {
  try {
    const response = await fetch(
      `https://thi-api.onrender.comm/api/user/auth/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

export async function verifyToken({
  _id,
  forgotPasswordToken,
}: VerifyTokenProps) {
  try {
    const response = await fetch(
      `https://thi-api.onrender.com/api/user/auth/verify-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id, forgotPasswordToken }),
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

export async function updatePassword({
  _id,
  newPassword,
}: UpdatePasswordProps) {
  try {
    const response = await fetch(
      `https://thi-api.onrender.com/api/user/auth/update-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id, newPassword }),
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

export async function updateUser({ values }: UpdateProps) {
  const token = localStorage.getItem("access_token") || "";
  const response = await fetch(
    `https://thi-api.onrender.com/api/user/auth/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    }
  );
  const responseData = await response.json();
  return responseData;
}

export async function reviewProduct({
  productId,
  heading,
  rating,
  comment,
}: ReviewProps) {
  const token = localStorage.getItem("access_token") || "";
  const response = await fetch(`https://thi-api.onrender.com/api/user/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, heading, rating, comment }),
  });
  const responseData = await response.json();
  return responseData;
}

export async function updateCart({ products, value, type }: UpdateCartProps) {
  const token = localStorage.getItem("access_token") || "";
  const response = await fetch(`https://thi-api.onrender.com/api/user/cart/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ products, value, type }),
  });
  const responseData = await response.json();
  return responseData;
}

export async function createOrder({
  products,
  totalAmount,
  discountedAmount,
  modeOfPayment,
  shippingAddress,
}: CreateOrderProps) {
  const token = localStorage.getItem("access_token") || "";
  const response = await fetch(`https://thi-api.onrender.com/api/user/order/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      products,
      totalAmount,
      discountedAmount,
      modeOfPayment,
      shippingAddress,
    }),
  });
  const responseData = await response.json();
  return responseData;
}

export async function getCart() {
  const token = localStorage.getItem("access_token") || "";

  try {
    const response = await fetch(`https://thi-api.onrender.com/api/user/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart data");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    throw error;
  }
}

export async function readDisplayedOffers() {
  const productOfferResponse = await fetch(
    `https://thi-api.onrender.com/api/admin/offers/read-product-offers`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const cartOfferResponse = await fetch(
    `https://thi-api.onrender.com/api/admin/offers/read-cart-offers`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const productOfferResponseData = await productOfferResponse.json();

  const cartResponseData = await cartOfferResponse.json();

  let response;

  response = productOfferResponseData?.productOffers?.find(
    (productOffer: ProductOffer) => productOffer?.isDisplaying
  );

  if (!response) {
    response = cartResponseData?.cartOffers?.find(
      (cartOffer: CartOffer) => cartOffer?.isDisplaying
    );
  }

  return response;
}

export async function createContact({
  role,
  name,
  email,
  phoneNumber,
  option,
  comment,
}: Contact) {
  const response = await fetch(
    `https://thi-api.onrender.commm/api/user/contact/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role, name, email, phoneNumber, option, comment }),
    }
  );
  const responseData = await response.json();
  return responseData;
}
