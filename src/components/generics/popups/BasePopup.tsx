import VectorCloseIcon from "@/components/icons/VectorCloseIcon";
import CustomCursorWrapper from "@/components/generics/customCursor/CustomCursorWrapper";
import { ReactNode } from "react";

interface BasePopupProps {
  onClose?: () => void;
  children: ReactNode;
}

export default function BasePopup({ onClose, children }: BasePopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[99999]">
      <div className="absolute inset-0 bg-[#3D3333] opacity-[0.96]" />
      <div className="relative bg-[#1D1C1C] pl-10 pr-10 pt-8 pb-[50px] w-[480px] h-[645px]">
        {onClose && (
          <CustomCursorWrapper>
            <VectorCloseIcon
              className="absolute top-[-18px] right-[-25px] cursor-none"
              onClick={onClose}
            />
          </CustomCursorWrapper>
        )}
        {children}
      </div>
    </div>
  );
}
