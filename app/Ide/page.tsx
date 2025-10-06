"use client";

import { Suspense } from "react";
import IdePageContent from "./IdePageContent";

export default function IdePage() {
  return (
    <Suspense fallback={<p className="text-center mt-20">Loading problem...</p>}>
      <IdePageContent />
    </Suspense>
  );
}
