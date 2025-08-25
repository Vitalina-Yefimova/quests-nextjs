"use client";

import SkypeGreyIcon from "@/components/icons/SkypeGreyIcon";
import VkGreyIcon from "@/components/icons/VkGreyIcon";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full flex items-start gap-[7px] h-[53px] pl-8">
      <SkypeGreyIcon />
      <VkGreyIcon />
    </footer>
  );
}