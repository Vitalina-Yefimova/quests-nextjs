"use client";

import CustomCursorWrapper from "@/components/generics/customCursor/CustomCursorWrapper";

export default function PhoneNumber() {
  return (
    <div className="relative pt-10">
      <CustomCursorWrapper>
        <a
          href="tel:14033335599"
          className="text-sm font-semibold not-italic leading-normal tracking-[0.42px] text-[#F0F0F0] lining-nums proportional-nums pr-[33px] cursor-none"
        >
          +1 (403) 333-55-99
        </a>
      </CustomCursorWrapper>
    </div>
  );
}