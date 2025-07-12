import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center relative">
            {/* 右上角导航链接 */}
            <div className="absolute top-6 right-6">
                <Link
                    href="/gobang"
                    className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-700 hover:text-gray-900 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-medium"
                >
                    <i className="fa-solid fa-chess-board text-lg"></i>
                    五子棋
                </Link>
            </div>

            {/* 主要内容 */}
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    这是刘毅的个人网站
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                <p className="text-gray-600 mt-6 text-lg">Welcome to Liu Yi&apos;s Personal Website</p>
            </div>
        </div>
    );
}
