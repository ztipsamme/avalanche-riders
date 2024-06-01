import Image from 'next/image'
import { Button } from '../ui/Button'

const cms = {
  title: 'Erövra Backarna',
  description:
    'Oavsett om du är nybörjare eller proffs, har vi brädan för dig. Utforska vårt noga utvalda sortiment som kombinerar kvalitet, stil och prestanda. Beställ idag och njut av fri frakt på alla köp!',
}

const Hero = () => {
  return (
    <div className="h-screen relative overflow-hidden">
      <Image
        src={'/snowboard images/pexels-lazarevkirill-8696256.jpg'}
        fill
        sizes="(max-width: 3000px) 100vw, 33vw"
        loading="lazy"
        alt=""
        className="scale-x-[-1] scale-[1.2] top-0 object-cover"
      />
      <div className="absolute top-0 h-full w-1/2 bg-gradient-to-r from-cyan-100 opacity-20"></div>

      <div className="absolute mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-white">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {cms.title}
        </h1>
        <p className="mt-6 text-lg leading-8">{cms.description}</p>
        <div className="mt-10 flex gap-x-6">
          <Button href="/products" color="red" className="max-w-xs">
            Spana in brädorna
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
