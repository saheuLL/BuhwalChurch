"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

type SubMenuItem = {
  label: string
  href: string
}

type MenuItem =
  | {
      title: string
      hasDropdown: true
      subItems: SubMenuItem[]
    }
  | {
      title: string
      hasDropdown: false
      href: string
    }

const menuItems: MenuItem[] = [
  {
    title: "교회안내",
    hasDropdown: true,
    subItems: [
      { label: "부활교회는", href: "/welcome" },
      { label: "오시는길", href: "/location" },
      { label: "섬기는 분들", href: "/staff" },
    ],
  },
  {
    title: "예배안내",
    hasDropdown: false,
    href: "/worship",
  },
  {
    title: "부활교회 소식",
    hasDropdown: true,
    subItems: [
      { label: "온라인 주보", href: "/jubo" },
      { label: "부활 갤러리", href: "" },
      { label: "부활교회 찬양", href: "/praise" },
    ],
  },
]

function isPathActive(pathname: string, href: string) {
  if (!href) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

function isMenuActive(pathname: string, item: MenuItem) {
  if (!item.hasDropdown && "href" in item) {
    return isPathActive(pathname, item.href)
  }
  if (item.hasDropdown) {
    return item.subItems.some((sub) => isPathActive(pathname, sub.href))
  }
  return false
}

const activeLinkClass = "text-[#fcaa4c]"
const inactiveLinkClass = "text-gray-800 hover:text-[#fcaa4c]"

export default function Header() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="relative block w-[180px] h-[60px] shrink-0">
          <Image
            src="/Logo.png"
            alt=""
            fill
            sizes="180px"
            priority
            className="object-contain"
          />
        </Link>

        {/* Navigation - centered */}
        <nav className="hidden md:flex items-center justify-center flex-1 gap-12">
          {menuItems.map((item, index) => {
            const isActive = isMenuActive(pathname, item)
            const isOpen = openDropdown === index
            const parentClassName = `flex items-center gap-1 text-[19px] font-medium transition-colors ${
              isActive || isOpen ? activeLinkClass : inactiveLinkClass
            }`

            const mainHref = item.hasDropdown ? item.subItems[0]?.href : item.href

            return (
              <div
                key={item.title}
                className="relative py-2 group"
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(index)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {/* 대메뉴 클릭 시 첫 번째 하위 메뉴(또는 단일 메뉴)로 바로 이동 */}
                <Link href={mainHref || "#"} className={parentClassName}>
                  {item.title}
                  {item.hasDropdown && (
                    <ChevronDown
                      className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                    />
                  )}
                </Link>

                {/* Dropdown (CSS group-hover + React state 이중 지원으로 안정성 보장) */}
                {item.hasDropdown && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-1 z-50 ${
                      isOpen ? "block" : "hidden group-hover:block"
                    }`}
                  >
                    <div className="bg-white shadow-xl border border-gray-100 rounded-md py-1.5 min-w-[140px]">
                      {item.subItems.map((subItem) => {
                        const subActive = isPathActive(pathname, subItem.href)
                        const className = `block w-full px-4 py-2.5 text-[14px] text-center font-medium transition-colors ${
                          subActive
                            ? "text-[#fcaa4c] bg-amber-50/60 font-bold"
                            : "text-gray-700 hover:text-[#fcaa4c] hover:bg-gray-50"
                        }`

                        if (!subItem.href) {
                          return (
                            <span
                              key={subItem.label}
                              className="block w-full px-4 py-2.5 text-[14px] text-center text-gray-400 cursor-not-allowed select-none"
                            >
                              {subItem.label}
                            </span>
                          )
                        }

                        return (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className={className}
                            onClick={() => setOpenDropdown(null)}
                          >
                            {subItem.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Spacer for balance */}
        <div className="hidden md:block w-[180px]" />

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="메뉴 토글"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg md:hidden">
          <nav className="flex flex-col p-5 gap-4">
            {menuItems.map((item) => (
              <div key={item.title} className="flex flex-col">
                {!item.hasDropdown ? (
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-[16px] font-medium py-1.5 transition-colors ${
                      isPathActive(pathname, item.href)
                        ? "text-[#fcaa4c] font-bold"
                        : "text-gray-800 hover:text-[#fcaa4c]"
                    }`}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <div className="flex flex-col gap-1">
                    <Link
                      href={item.subItems[0]?.href || "#"}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-[16px] font-semibold py-1.5 transition-colors ${
                        isMenuActive(pathname, item)
                          ? "text-[#fcaa4c] font-bold"
                          : "text-gray-800 hover:text-[#fcaa4c]"
                      }`}
                    >
                      {item.title}
                    </Link>
                    <div className="pl-3 flex flex-col gap-2 border-l-2 border-amber-200">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href || "#"}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`text-[15px] py-1 transition-colors ${
                            isPathActive(pathname, subItem.href)
                              ? "text-[#fcaa4c] font-bold"
                              : "text-gray-600 hover:text-[#fcaa4c]"
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
