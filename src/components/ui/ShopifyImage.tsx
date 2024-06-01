import { ShopifyImage as ShopifyImageProps } from '@/types'
import Image, { ImageProps } from 'next/image'

type CartItemImageProps = {
  image: ShopifyImageProps
} & Omit<ImageProps, 'src' | 'alt'>

export const ShopifyImage = ({ image, ...restProps }: CartItemImageProps) => {
  if (!image) {
    return <div className="bg-gray-200 h-full w-full"></div>
  }
  return (
    <Image
      src={image.url}
      alt={image.altText}
      className={`object-contain ${restProps.className}`}
      fill
      loading="lazy"
      sizes={`(max-width: ${image.width}) 100vw, 33vw ${restProps.sizes}`}
      {...restProps}
    />
  )
}
