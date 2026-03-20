<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
    <header
      class="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center"
          >
            <span class="text-white font-bold text-sm">P</span>
          </div>
          <span class="font-semibold text-lg">PoC Workshop</span>
        </div>
        <nav class="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <a
            href="#features"
            class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >Features</a
          >
          <a
            href="#about"
            class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >About</a
          >
        </nav>
      </div>
    </header>

    <main>
      <section class="py-20 sm:py-32">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="space-y-8">
              <div class="space-y-4">
                <p class="text-sm font-medium text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">
                  UI PoC Workshop
                </p>
                <h1 class="text-4xl lg:text-6xl font-bold leading-tight">
                  Build your
                  <span class="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">idea</span>
                  into reality
                </h1>
                <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                  AI 도구를 활용하여 아이디어를 실제 동작하는 웹 UI 프로토타입으로 만들어보세요.
                </p>
              </div>
              <div class="flex flex-wrap gap-4">
                <button class="btn-gradient">Get Started</button>
                <button
                  class="px-6 py-3 rounded-xl font-semibold border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  Learn More
                </button>
              </div>
            </div>

            <div class="hidden lg:block">
              <div class="relative">
                <div
                  class="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl blur-3xl opacity-60"
                />
                <div
                  class="relative bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 space-y-4"
                >
                  <div class="flex items-center gap-2 mb-4">
                    <div class="w-3 h-3 rounded-full bg-red-400" />
                    <div class="w-3 h-3 rounded-full bg-yellow-400" />
                    <div class="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div class="space-y-3">
                    <div class="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
                    <div class="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
                    <div class="h-4 bg-gray-100 dark:bg-gray-800 rounded w-5/6" />
                  </div>
                  <div class="grid grid-cols-3 gap-3 pt-4">
                    <div
                      class="h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30"
                    />
                    <div
                      class="h-20 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800/30"
                    />
                    <div
                      class="h-20 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-100 dark:border-violet-800/30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        class="py-20 bg-white dark:bg-gray-900"
      >
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center space-y-4 mb-16">
            <h2 class="text-3xl lg:text-4xl font-bold">Everything you need</h2>
            <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              PRD 작성부터 UI 개발까지, 워크숍에 필요한 모든 것이 준비되어 있습니다.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              class="card bg-base-100 dark:bg-gray-800/50 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl"
            >
              <div class="card-body p-6">
                <div
                  class="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-2"
                >
                  <svg
                    class="w-5 h-5 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 class="card-title text-lg font-semibold">PRD Writer</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  AI가 리서치 자료를 분석하여 체계적인 PRD(ALPS) 문서를 작성합니다.
                </p>
              </div>
            </div>
            <div
              class="card bg-base-100 dark:bg-gray-800/50 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl"
            >
              <div class="card-body p-6">
                <div
                  class="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center mb-2"
                >
                  <svg
                    class="w-5 h-5 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 class="card-title text-lg font-semibold">UI Prototyping</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Nuxt 4 + TailwindCSS + DaisyUI로 실제 동작하는 웹 프로토타입을 만듭니다.
                </p>
              </div>
            </div>
            <div
              class="card bg-base-100 dark:bg-gray-800/50 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl"
            >
              <div class="card-body p-6">
                <div
                  class="w-10 h-10 rounded-lg bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center mb-2"
                >
                  <svg
                    class="w-5 h-5 text-violet-600 dark:text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 class="card-title text-lg font-semibold">Deep Research</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Amazon QuickSuite로 경쟁사 분석과 차별화 포인트를 자동으로 조사합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        class="py-20"
      >
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 class="text-3xl lg:text-4xl font-bold">Ready to start?</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            이 페이지는 기본 템플릿입니다. Kiro 또는 Claude Code에게 PRD를 기반으로 UI를 만들어달라고 요청하세요.
          </p>
          <div class="pt-4">
            <button class="btn-gradient text-lg px-8 py-4">Start Building</button>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-gray-200 dark:border-gray-800 py-8">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Built with Nuxt 4, TailwindCSS & DaisyUI
      </div>
    </footer>
  </div>
</template>
