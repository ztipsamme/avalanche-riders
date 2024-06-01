import { XMarkIcon } from '@heroicons/react/20/solid'

const text =
  'Hitta din drömbräda hos oss. Nyheter, proffsbrädor och allt däremellan. Fri frakt på alla köp!'

const Banner = () => {
  return (
    <div className="flex items-center gap-x-6 overflow-hidden bg-primary px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-white">{text}</p>
      </div>
      <div className="flex flex-1 justify-end"></div>
    </div>
  )
}

export default Banner
