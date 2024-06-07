import Image, { ImageProps } from 'next/image'
import { ShopifyImage as ShopifyImageProps } from '@/types'

type ShopifyImage = {
  image: ShopifyImageProps
} & Omit<ImageProps, 'src' | 'alt'>

export const ShopifyImage = ({ image, ...restProps }: ShopifyImage) => {
  if (!image) {
    return <div className="bg-gray-200 h-full w-full"></div>
  }
  return (
    <Image
      src={image.url}
      alt={image.altText}
      className={`object-contain ${restProps.className}`}
      fill
      sizes={`(max-width: ${image.width}) 100vw, 33vw`}
      {...restProps}
    />
  )
}
