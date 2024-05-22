import Image from 'next/image'
import Link from 'next/link'
import { TNavLink } from '../../utils/types'

const PrimaryButton = ({ href, children }: TNavLink) => {
  return (
    <Link
      href={href}
      className="bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 "
    >
      {children}
    </Link>
  )
}

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
          <PrimaryButton href="#">Spana in brädorna</PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default Hero
// bg-cyan-700
