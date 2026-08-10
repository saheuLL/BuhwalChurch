import { InstagramIcon } from "./icons/instagram-icon"

export default function SocialLinks() {
  return (
    <section className="py-8 bg-white">
      <div className="flex items-center justify-center gap-8">
        {/* Instagram */}
        <div className="flex flex-col items-center gap-2">
          <a
            href="https://www.instagram.com/buhwal_church/"
            className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center text-white hover:opacity-80 transition-opacity"
            aria-label="부활교회 인스타그램"
          >
            <InstagramIcon className="w-6 h-6" />
          </a>
          <span className="text-[12px] text-gray-500">부활교회</span>
        </div>

        {/* Naver Blog */}
        <div className="flex flex-col items-center gap-2">
          <a
            href="https://blog.naver.com/jesuschristlovesyou"
            className="w-12 h-12 rounded-md bg-[#03c75a] flex items-center justify-center text-white font-bold text-sm hover:opacity-80 transition-opacity"
            aria-label="네이버 블로그"
          >
            blog
          </a>
          <span className="text-[12px] text-gray-500">블로그</span>
        </div>
      </div>
    </section>
  )
}
