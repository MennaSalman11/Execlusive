import { IBrand } from "./brand.interface"
import { ICategory } from "./category.interface"

export interface IWishlistResponse {
  status: string
  count: number
  data: IWishlist[]
}

export interface IWishlist {
  sold?: number
  images: string[]
  subcategory: IWishlistProduct[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: ICategory
  brand: IBrand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  __v: number
  id: string
  priceAfterDiscount?: number
}

export interface IWishlistProduct {
  _id: string
  name: string
  slug: string
  category: string
}
