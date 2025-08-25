export default function PageTitle({
  overline,
  title,
  className = "",
}: { className?: string; overline: string; title: string }) {
  return (
    <div className={className}>
      <h4 className="text-[#F2890F] text-sm font-medium leading-[144%] ml-[3px]">
        {overline}
      </h4>
      <h1 className="text-[#FFF] text-6xl not-italic font-extrabold leading-[70.4px]">
        {title}
      </h1>
    </div>
  );
}

