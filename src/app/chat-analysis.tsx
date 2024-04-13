"use client";

import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";

export function ChatAnalysis() {
  const [value, setValue] = useState<string>(
    "Había una vez en un pequeño pueblo en lo profundo de las montañas, un anciano llamado Miguel. Miguel era conocido por ser el último fabricante de relojes del pueblo. Su taller estaba lleno de engranajes, martillos y campanas que resonaban cada hora. Pero lo que hacía especial a los relojes de Miguel era que cada uno tenía su propia historia.",
  );

  return (
    <div className="space-y-2">
      <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
      <div>{value}</div>
    </div>
  );
}
