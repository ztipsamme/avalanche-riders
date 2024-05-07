'use client'

type FlyoutMenu = {
  items: { id: number; title: string; svg: JSX.Element }[]
  open: boolean
}

export const FlyoutMenu = ({ items, open }: FlyoutMenu) => {
  if (!open) return null

  return (
    <div className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
      <div className="p-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
          >
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
              {item.svg}
            </div>
            <div className="flex-auto">
              <a href="#" className="block font-semibold text-gray-900">
                {item.title}
                <span className="absolute inset-0"></span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
