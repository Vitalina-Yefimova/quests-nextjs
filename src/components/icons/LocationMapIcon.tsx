const LocationMapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={70}
    fill="none"
    {...props}
  >
    <g filter="url(#location-map-icon_svg__a)">
      <g filter="url(#location-map-icon_svg__b)">
        <path
          fill="#1C1C1C"
          d="M26.342 6.203a17.2 17.2 0 0 0-9.421 2.75 16.63 16.63 0 0 0-6.266 7.408 16.2 16.2 0 0 0-.995 9.563 16.43 16.43 0 0 0 4.612 8.49 17.04 17.04 0 0 0 8.661 4.549c3.284.644 6.69.321 9.786-.928a16.84 16.84 0 0 0 7.605-6.092 16.3 16.3 0 0 0 2.857-9.198c0-4.374-1.771-8.57-4.927-11.67s-7.439-4.851-11.912-4.872m0 25.364a9.17 9.17 0 0 1-5.035-1.45 8.87 8.87 0 0 1-3.358-3.942 8.64 8.64 0 0 1-.546-5.103 8.76 8.76 0 0 1 2.451-4.538 9.1 9.1 0 0 1 4.62-2.436 9.2 9.2 0 0 1 5.223.49 9 9 0 0 1 4.063 3.248 8.68 8.68 0 0 1-1.085 11.127 9.13 9.13 0 0 1-6.333 2.615z"
        />
      </g>
      <path
        fill="#1C1C1C"
        d="M26.792 0C14.325 0 3.892 9.761 3.037 22.2c-.322 5.728 1.462 11.38 5.03 15.937l16.795 21.978a2.4 2.4 0 0 0 .852.697 2.46 2.46 0 0 0 2.162 0c.336-.165.628-.403.852-.697l16.788-21.964c3.568-4.558 5.352-10.21 5.03-15.937C49.692 9.76 39.258 0 26.792 0m-1.058 39.286c-2.873-3.651-15.573-12.46-15.332-17.058.6-8.746 5.295-15.508 16.39-15.508s14.733 7.266 15.332 16.025c.245 4.605-13.511 12.884-16.39 16.541"
      />
    </g>
    <g filter="url(#location-map-icon_svg__c)">
      <ellipse cx={26.263} cy={22.745} fill="#1C1C1C" rx={3.172} ry={3.102} />
    </g>
    <defs>
      <filter
        id="location-map-icon_svg__a"
        width={55.584}
        height={69.061}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={1} dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_4019_577"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_4019_577"
          result="shape"
        />
      </filter>
      <filter
        id="location-map-icon_svg__b"
        width={41.837}
        height={41.083}
        x={6.344}
        y={6.203}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={1} dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_4019_577"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_4019_577"
          result="shape"
        />
      </filter>
      <filter
        id="location-map-icon_svg__c"
        width={14.344}
        height={14.203}
        x={20.091}
        y={17.643}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={1} dy={2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_4019_577"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_4019_577"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default LocationMapIcon;
