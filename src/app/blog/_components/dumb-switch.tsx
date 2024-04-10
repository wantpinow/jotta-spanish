"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

export const DumbSwitch = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const [checked, setChecked] = useState(true);
  const changeChecked = (newChecked: boolean) => {
    if (newChecked) {
      setChecked(true);
      return;
    }
    setChecked(false);
    setTimeout(() => {
      setChecked(true);
      toast.error("Whoops!", {
        description: "A technical error occurred. Please try again later.",
      });
    }, 380);
  };
  return (
    <div className="flex items-center space-x-3">
      <Switch id={id} checked={checked} onCheckedChange={changeChecked} />
      <Label htmlFor={id} className="cursor-pointer">
        {children}
      </Label>
    </div>
  );
};
