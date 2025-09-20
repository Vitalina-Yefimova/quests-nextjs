interface InfoItems {
  title: string;
  text: string | number;
}

export default function ContactInfo() {
  const infoItems: InfoItems[] = [
    { title: "Address", text: "101 9 Ave SW, Calgary, AB T2E 6Y9" },
    { title: "Opening Hours", text: "Open daily, 9:00 AM – 8:00 PM" },
    { title: "Phone", text: "+1 (403) 333-55-99" },
    { title: "E-mail", text: "info@escape-room.ca" },
  ];

  return (
    <section className="flex flex-col gap-[35px] pl-[166px] pt-[67px] pb-24">
      {infoItems.map(({ title, text }) => (
        <div key={title} className="flex flex-col gap-[10px]">
          <h3 className="text-sm text-[#E5E5E5] not-italic font-bold leading-[1.4] tracking-[-0.28px] ">
            {title}
          </h3>
          <p className="text-[15px] text-[#E5E5E5] not-italic font-medium leading-[1.5] font-variant-numeric">
            {text}
          </p>
        </div>
      ))}
    </section>
  );
}
