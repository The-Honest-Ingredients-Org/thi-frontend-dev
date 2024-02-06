import React, { useState } from "react";
import AddOffers from "./Offers/AddOffers";
import OfferBanner from "./Offers/OfferBanner";
import DeleteOffer from "./Offers/DeleteOffer";

export default function Offers() {
  const [update, setUpdate] = useState<boolean>(true);
  return (
    <>
      <AddOffers setUpdate={setUpdate} />
      <OfferBanner update={update} setUpdate={setUpdate} />
      <DeleteOffer update={update} setUpdate={setUpdate} />
    </>
  );
}
