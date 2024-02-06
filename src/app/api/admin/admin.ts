export interface ProductVariant {
  size: number;
  price: number;
  count: number;
  discount: number;
}

export interface CreateProductProps {
  name: string;
  description: string;
  type: string;
  variants: ProductVariant[];
  images: string[];
  paymentOptions: string[];
}

export interface ChangeStatusProps {
  newStatus: string;
  orderId: {
    orderId: string;
  };
  date: string;
  receiptNumber: string;
}

export interface UpdateProductProps {
  dataObj: {
    name: string;
    description: string;
    images: string[];
    variants: {
      size: number;
      price: number;
      count: number;
      discount: number;
    }[];
  };
  productId: string;
}

export interface ProductType {
  type: string;
  subTypes: string[];
}

export interface ProductOffer {
  _id: string;
  category: string;
  discountType: string;
  value: number;
  productCountMap: { productId: string; name: string; size: number; count: number }[];
  code: string;
  description: string;
  isDisplaying: boolean;
}

export interface ProductOfferDto {
  category: string;
  discountType: string;
  value: number;
  productCountMap: { productId: String; name: string; size: Number; count: Number }[];
  code: string;
  description: string;
}

export interface CartOffer {
  _id: string;
  category: string;
  amount: number;
  discountType: string;
  value: number;
  code: string;
  description: string;
  isDisplaying: boolean;
}

export interface CartOfferDto {
  category: string;
  amount: number;
  discountType: string;
  value: number;
  code: string;
  description: string;
  isDisplaying: boolean;
}

export async function createProduct(data: CreateProductProps) {
  let token: string = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token") || "";
  }
  const response = await fetch(
    `https://thi-api.onrender.com/api/admin/products/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  const responseData = await response.json();
  return responseData;
}

export async function changeProductStatus({
  newStatus,
  orderId,
  date,
  receiptNumber,
}: ChangeStatusProps) {
  const response = await fetch(
    `https://thi-api.onrender.com/api/admin/user-orders/${orderId?.orderId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newStatus: newStatus,
        arrivingAt: date,
        receiptNumber: receiptNumber,
      }),
    }
  );
  const responseData = await response.json();
  return responseData;
}

export async function updateProduct({
  dataObj,
  productId,
}: UpdateProductProps) {
  const response = await fetch(
    `https://thi-api.onrender.com/api/admin/products/update/${productId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    }
  );
  const responseData = await response.json();
  return responseData;
}

export async function addProductType({ type, subTypes }: ProductType) {
  const response = await fetch(
    `https://thi-api.onrender.com/api/admin/add-type`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, subTypes }),
    }
  );

  const responseData = await response.json();
  return responseData;
}

export async function getProductTypes() {
  const response = await fetch(`https://thi-api.onrender.com/api/admin`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  return responseData;
}

export async function createProductOffer(dataObj: ProductOfferDto) {
  console.log("json", JSON.stringify(dataObj));

  const response = await fetch(
    `https://thi-api.onrender.com/api/admin/offers/create-product-offer`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    }
  );
  const responseData = await response.json();
  return responseData;
}

export async function createCartOffer(dataObj: CartOfferDto) {
  const response = await fetch(
    `https://thi-api.onrender.com/api/admin/offers/create-cart-offer`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    }
  );
  const responseData = await response.json();
  return responseData;
}

export async function readProductOffers() {
  const response = await fetch(
    `https://thi-api.onrender.com/api/admin/offers/read-product-offers`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseData = await response.json();  
  return responseData?.productOffers;
}

export async function readCartOffers() {
  const response = await fetch(
    `https://thi-api.onrender.com/api/admin/offers/read-cart-offers`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseData = await response.json();
  return responseData?.cartOffers;
}

export async function deleteOffer(offerId: string) {
  const response = await fetch(
    `https://thi-api.onrender.com/api/admin/offers/delete/${offerId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseData = await response.json();
  return responseData;
}

export async function displayOffer(offer_id: string) {
  const response = await fetch(
    `https://thi-api.onrender.com/api/admin/offers/display/offer`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ offer_id }),
    }
  );
  const responseData = await response.json();
  return responseData;
}

export async function readContacts() {
  const response = await fetch(
    `https://thi-api.onrender.com/api/admin/contact/read`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseData = await response.json();    
  return responseData?.contacts;
}