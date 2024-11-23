import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="pt-10 md:pt-20 px-6 lg:px-0">
      <div className="text-gray-600 dark:text-gray-200 flex items-center gap-x-1.5 text-2xl border border-gray-200 dark:border-gray-800 rounded-full px-3 py-1.5 mx-auto mb-8 w-fit">
        <p className="text-sm sm:text-base">Let&apos;s do it folks -&gt; </p>
      </div>
      <h1 className="text-center text-4xl font-bold md:text-5xl lg:text-7xl lg:font-semibold text-gray-900 dark:text-gray-100 text-balance">
        Condense Videos
      </h1>
      <h2 className="sm:text-lg max-w-xl mx-auto text-gray-500 mt-9 text-center">
        Eliminate oversized files! Reduce video size by <span>90%</span> Without
        sacrificing quality, all while working offline.
      </h2>
      <div className="flex gap-4 items-center justify-center mt-10 mb-10">
        <Button>
          <Link href="/video">Condense Now</Link>
        </Button>
      </div>
    </div>
  );
}
