import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { Button } from '../ui/Button'
import { ShopifyImage } from '../ui/ShopifyImage'

const cms = {
  title: 'Erövra Backarna',
  description:
    'Oavsett om du är nybörjare eller proffs, har vi brädan för dig. Utforska vårt noga utvalda sortiment som kombinerar kvalitet, stil och prestanda. Beställ idag och njut av fri frakt på alla köp!',
  cta: 'Spana in brädorna',
}

export const Hero = () => {
  return (
    <div className="bg-white h-[calc(100vh-122px)] relative overflow-hidden">
      <ShopifyImage
        className="scale-x-[-1] scale-[1.2] top-0 object-cover"
        image={{
          url: '/snowboard-images/pexels-lazarevkirill-8696256.jpg',
          altText: '',
          id: '',
          width: 4000,
          height: 4000,
        }}
      />
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden px-6 pt-16 sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="max-w-md mx-0 flex-auto py-32 text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {cms.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {cms.description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start ">
              <Button
                href="/products"
                className="max-w-fit inline-flex  gap-x-1.5 "
              >
                {cms.cta}
                <ArrowRightIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
