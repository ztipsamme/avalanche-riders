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
    <div className="bg-white h-[50vh] md:h-[calc(100vh-122px)] relative overflow-hidden">
      <div className="relative h-full w-full bg-primary">
        <div className={`absolute h-full w-full`}>
          <ShopifyImage
            className="scale-x-[-1] object-cover overflow-auto"
            image={{
              url: '/snowboard-images/pexels-limonovdigital-8766363.jpg',
              altText: '',
              id: '',
              width: 2833,
              height: 3541,
            }}
          />
        </div>
      </div>

      {/* bg-gradient-to-b lg:bg-gradient-to-r from-primary/80 to-primary/10 backdrop-blur-sm shadow-md  */}
      <div className="absolute inset-0 w-full h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 flex items-center">
        <div className="lg:max-w-[50%] flex-auto text-left text-white">
          <h2 className="text-5xl sm:text-6xl font-bold tracking-tight lg:text-8xl ">
            {cms.title}
          </h2>
          <p className="mt-6 text-base leading-8 ">{cms.description}</p>
          <div className="mt-10 flex items-center gap-x-6 lg:justify-start ">
            <Button
              href="/products"
              className="max-w-fit inline-flex  gap-x-1.5 text-sm"
              color="red"
              link
            >
              {cms.cta}
              <ArrowRightIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
