"use client"

import { useState } from "react"
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import Link from "next/link"

interface BulletinContentProps {
  initialDates?: string[]
}

export default function BulletinContent({ initialDates = [] }: BulletinContentProps) {
  const [searchType, setSearchType] = useState("전체")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  
  // S3 날짜 폴더 목록(예: YYYY-MM-DD)을 기반으로 게시글 리스트 생성
  const allItems = initialDates.map((dateStr, index) => {
    const parts = dateStr.split("-")
    let titleStr = dateStr
    if (parts.length === 3) {
      const month = parseInt(parts[1], 10)
      const day = parseInt(parts[2], 10)
      titleStr = `${month}월 ${day}일 주보`
    }

    const formattedDate = dateStr.replace(/-/g, ". ")

    return {
      id: initialDates.length - index, // NO 번호 (최신글이 가장 높은 번호)
      title: titleStr,
      date: formattedDate,
      views: 0,
      rawDate: dateStr,
    }
  })

  // 검색어 필터링
  const filteredItems = allItems.filter((item) => {
    if (!searchQuery) return true
    if (searchType === "제목") {
      return item.title.includes(searchQuery)
    }
    // "전체" 또는 기타인 경우 제목과 날짜 모두 검색 대상 포함
    return item.title.includes(searchQuery) || item.date.includes(searchQuery)
  })

  // 페이지네이션 연동
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage)

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-[1100px] mx-auto px-4">
        {/* 검색 영역 */}
        <div className="flex justify-end items-center gap-2 mb-6">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="h-10 px-3 border border-gray-300 text-[14px] focus:outline-none focus:border-gray-400"
          >
            <option value="전체">전체</option>
            <option value="제목">제목</option>
          </select>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1) // 검색 시 1페이지로 리셋
              }}
              className="h-10 w-[200px] sm:w-[300px] px-3 pr-10 border border-gray-300 text-[14px] focus:outline-none focus:border-gray-400"
              placeholder="검색어를 입력하세요"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 테이블 헤더 */}
        <div className="border-t-2 border-gray-800">
          <div className="grid grid-cols-[60px_1fr_100px_60px] sm:grid-cols-[80px_1fr_120px_80px] items-center py-3 border-b border-gray-300 bg-white">
            <span className="text-center text-[14px] sm:text-[15px] font-medium text-gray-700">NO</span>
            <span className="text-center text-[14px] sm:text-[15px] font-medium text-gray-700">제목</span>
            <span className="text-center text-[14px] sm:text-[15px] font-medium text-gray-700">작성일</span>
            <span className="text-center text-[14px] sm:text-[15px] font-medium text-gray-700">조회수</span>
          </div>

          {/* 테이블 본문 */}
          {paginatedItems.map((item) => (
            <Link
              key={item.id}
              href={`/jubo/${item.rawDate}`}
              className="grid grid-cols-[60px_1fr_100px_60px] sm:grid-cols-[80px_1fr_120px_80px] items-center py-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <span className="text-center text-[13px] sm:text-[14px] text-gray-500">{item.id}</span>
              <span className="text-[13px] sm:text-[14px] text-gray-800 pl-4 font-medium transition-colors hover:text-amber-600">
                {item.title}
              </span>
              <span className="text-center text-[13px] sm:text-[14px] text-gray-500">{item.date}</span>
              <span className="text-center text-[13px] sm:text-[14px] text-[#fcaa4c]">{item.views}</span>
            </Link>
          ))}

          {paginatedItems.length === 0 && (
            <div className="py-16 text-center text-gray-400 text-[14px]">
              등록된 주보 게시글이 없습니다.
            </div>
          )}
        </div>

        {/* 페이지네이션 */}
        {filteredItems.length > 0 && (
          <div className="flex justify-center items-center mt-8 relative">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:pointer-events-none"
                aria-label="첫 페이지"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:pointer-events-none"
                aria-label="이전 페이지"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center text-[14px] ${
                    currentPage === page
                      ? "text-[#fcaa4c] font-bold"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:pointer-events-none"
                aria-label="다음 페이지"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:pointer-events-none"
                aria-label="마지막 페이지"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}