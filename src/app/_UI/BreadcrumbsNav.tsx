import { getId } from '@/utils/hooks/getId'

type BreadcrumbsNav = { [key in 'label' | 'href']: string }

export const BreadcrumbsNav = ({ label, href }: BreadcrumbsNav) => {
  const breadcrumbs = [
    { label: 'Produkt', href: '/product' },
    { label: label, href: getId(href) },
  ]

  return (
    <nav aria-label="Breadcrumb">
      <ol
        role="list"
        className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            <div className="flex items-center">
              <a
                href={breadcrumb.href}
                className="mr-2 text-sm font-medium text-gray-900"
              >
                {breadcrumb.label}
              </a>
              {index !== breadcrumbs.length - 1 && (
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
