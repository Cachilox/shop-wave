"use client";
import { Product } from "@/interface/types";
import { useRouter } from "next/navigation";

export default function ProductTile({ item }: { item: Product }) {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/product/${item._id}`)}>
      <div className="overflow-hideen aspect-w-1 aspect-h-1 h-52">
        <img
          src={item.imageUrl}
          alt="Product image"
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
        />
      </div>
      {item.onSale === "yes" ? (
        <div className="absolute top-0 m-2 rounded-full bg-black">
          <p className="rounded-full  p-1 text-[10px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Sale
          </p>
        </div>
      ) : null}
      {item.onSale === "yes" ? (
        <div className="absolute top-1 right-0 m-2 rounded-full">
          <p className="text-[12px] font-extrabold text-green-500">{`${item.priceDrop}% OFF`}</p>
        </div>
      ) : null}
      <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
        <div className="mb-2 flex">
          <p
            className={`mr-3 text-sm font-semibold ${
              item.onSale === "yes" ? "text-gray-400" : ""
            } ${item.onSale === "yes" ? "line-through" : ""}`}
          >{`$ ${item.price}`}</p>
          {item.onSale === "yes" ? (
            <p className="mr-3 text-sm font-semibold">{`$ ${(
              item.price -
              item.price * (item.priceDrop / 100)
            ).toFixed(2)}`}</p>
          ) : null}
        </div>
        <h3 className="md-2 text-gray-400 font-semibold text-sm">
          {item.name}
        </h3>
      </div>
    </div>
  );
}
