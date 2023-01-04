import React from "react";

interface IIconsProps {
  className?: string;
}

const WalletIcon: React.FC<IIconsProps> = (props): JSX.Element => {
  return (
    <div {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    </div>
  );
};

const SearchIcon: React.FC<IIconsProps> = (props): JSX.Element => {
  return (
    <div {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg-icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        onMouseEnter={({ currentTarget }) =>
          currentTarget?.setAttribute(
            "class",
            "text-elementor-text-1 fill-white w-[20px] duration-300"
          )
        }
        onMouseLeave={({ currentTarget }) =>
          currentTarget?.setAttribute(
            "class",
            "text-elementor-text-1 fill-elementor-text-1 w-[20px] duration-300"
          )
        }
      >
        <path d="M963.80969 874.914509 746.640896 653.056614c-3.587891-3.66551-7.710925-6.443725-12.110336-8.352256 46.655488-62.60183 74.359501-140.751667 74.359501-225.526477 0-205.788877-163.237376-372.568371-364.609741-372.568371C242.909082 46.60951 79.67785 213.390029 79.67785 419.177984c0 205.792973 163.231232 372.569395 364.603597 372.569395 92.421632 0 176.807936-35.134157 241.069056-93.044122 1.778586 3.55799 4.115866 6.89705 7.027302 9.871872l217.115546 221.85687c14.970573 15.300506 39.292518 15.300506 54.316237 0C978.780262 915.131494 978.780262 890.21399 963.80969 874.914509zM444.281446 732.950221c-169.564672 0-307.06176-140.4928-307.06176-313.772237 0-173.332685 137.496064-313.766195 307.06176-313.766195 169.570816 0 307.06176 140.433408 307.06176 313.766195C751.343206 592.457421 613.851238 732.950221 444.281446 732.950221z" />
      </svg>
    </div>
  );
};

const CloseIcon: React.FC<IIconsProps> = (props): JSX.Element => {
  return (
    <div {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 1000 1000"
        enableBackground="new 0 0 1000 1000"
        xmlSpace="preserve"
      >
        <metadata>
          {" "}
          Svg Vector Icons : http://www.onlinewebfonts.com/icon{" "}
        </metadata>
        <g>
          <path d="M500,990C229.8,990,10,770.2,10,500S229.8,10,500,10s490,219.8,490,490S770.2,990,500,990z M500,80.3C268.6,80.3,80.3,268.6,80.3,500c0,231.4,188.3,419.7,419.7,419.7c231.4,0,419.7-188.3,419.7-419.7C919.7,268.6,731.4,80.3,500,80.3z" />
          <path d="M549.3,501.5l151.3-149.7c13.8-13.6,13.9-35.7,0.3-49.5c-13.6-13.8-35.8-13.9-49.5-0.3L499.9,451.9L350.6,302.2c-13.7-13.7-35.8-13.8-49.5-0.1c-13.7,13.6-13.7,35.8-0.1,49.5l149,149.5L299.8,649.8c-13.8,13.6-13.9,35.7-0.3,49.5c6.9,6.9,15.9,10.4,24.9,10.4c8.9,0,17.8-3.4,24.6-10.1l150.5-148.8l151.7,152.2c6.8,6.9,15.8,10.3,24.8,10.3c9,0,17.9-3.4,24.7-10.2c13.7-13.7,13.7-35.8,0.1-49.5L549.3,501.5z" />
        </g>
      </svg>
    </div>
  );
};

const OptionsIcon: React.FC<IIconsProps> = (props): JSX.Element => {
  return (
    <div {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 54 54"
        enableBackground="new 0 0 54 54"
        xmlSpace="preserve"
      >
        <metadata>Author: alex.mitov</metadata>
        <g xmlns="http://www.w3.org/2000/svg">
          <path d="M51.22,21h-5.052c-0.812,0-1.481-0.447-1.792-1.197s-0.153-1.54,0.42-2.114l3.572-3.571   c0.525-0.525,0.814-1.224,0.814-1.966c0-0.743-0.289-1.441-0.814-1.967l-4.553-4.553c-1.05-1.05-2.881-1.052-3.933,0l-3.571,3.571   c-0.574,0.573-1.366,0.733-2.114,0.421C33.447,9.313,33,8.644,33,7.832V2.78C33,1.247,31.753,0,30.22,0H23.78   C22.247,0,21,1.247,21,2.78v5.052c0,0.812-0.447,1.481-1.197,1.792c-0.748,0.313-1.54,0.152-2.114-0.421l-3.571-3.571   c-1.052-1.052-2.883-1.05-3.933,0l-4.553,4.553c-0.525,0.525-0.814,1.224-0.814,1.967c0,0.742,0.289,1.44,0.814,1.966l3.572,3.571   c0.573,0.574,0.73,1.364,0.42,2.114S8.644,21,7.832,21H2.78C1.247,21,0,22.247,0,23.78v6.439C0,31.753,1.247,33,2.78,33h5.052   c0.812,0,1.481,0.447,1.792,1.197s0.153,1.54-0.42,2.114l-3.572,3.571c-0.525,0.525-0.814,1.224-0.814,1.966   c0,0.743,0.289,1.441,0.814,1.967l4.553,4.553c1.051,1.051,2.881,1.053,3.933,0l3.571-3.572c0.574-0.573,1.363-0.731,2.114-0.42   c0.75,0.311,1.197,0.98,1.197,1.792v5.052c0,1.533,1.247,2.78,2.78,2.78h6.439c1.533,0,2.78-1.247,2.78-2.78v-5.052   c0-0.812,0.447-1.481,1.197-1.792c0.751-0.312,1.54-0.153,2.114,0.42l3.571,3.572c1.052,1.052,2.883,1.05,3.933,0l4.553-4.553   c0.525-0.525,0.814-1.224,0.814-1.967c0-0.742-0.289-1.44-0.814-1.966l-3.572-3.571c-0.573-0.574-0.73-1.364-0.42-2.114   S45.356,33,46.168,33h5.052c1.533,0,2.78-1.247,2.78-2.78V23.78C54,22.247,52.753,21,51.22,21z M52,30.22   C52,30.65,51.65,31,51.22,31h-5.052c-1.624,0-3.019,0.932-3.64,2.432c-0.622,1.5-0.295,3.146,0.854,4.294l3.572,3.571   c0.305,0.305,0.305,0.8,0,1.104l-4.553,4.553c-0.304,0.304-0.799,0.306-1.104,0l-3.571-3.572c-1.149-1.149-2.794-1.474-4.294-0.854   c-1.5,0.621-2.432,2.016-2.432,3.64v5.052C31,51.65,30.65,52,30.22,52H23.78C23.35,52,23,51.65,23,51.22v-5.052   c0-1.624-0.932-3.019-2.432-3.64c-0.503-0.209-1.021-0.311-1.533-0.311c-1.014,0-1.997,0.4-2.761,1.164l-3.571,3.572   c-0.306,0.306-0.801,0.304-1.104,0l-4.553-4.553c-0.305-0.305-0.305-0.8,0-1.104l3.572-3.571c1.148-1.148,1.476-2.794,0.854-4.294   C10.851,31.932,9.456,31,7.832,31H2.78C2.35,31,2,30.65,2,30.22V23.78C2,23.35,2.35,23,2.78,23h5.052   c1.624,0,3.019-0.932,3.64-2.432c0.622-1.5,0.295-3.146-0.854-4.294l-3.572-3.571c-0.305-0.305-0.305-0.8,0-1.104l4.553-4.553   c0.304-0.305,0.799-0.305,1.104,0l3.571,3.571c1.147,1.147,2.792,1.476,4.294,0.854C22.068,10.851,23,9.456,23,7.832V2.78   C23,2.35,23.35,2,23.78,2h6.439C30.65,2,31,2.35,31,2.78v5.052c0,1.624,0.932,3.019,2.432,3.64   c1.502,0.622,3.146,0.294,4.294-0.854l3.571-3.571c0.306-0.305,0.801-0.305,1.104,0l4.553,4.553c0.305,0.305,0.305,0.8,0,1.104   l-3.572,3.571c-1.148,1.148-1.476,2.794-0.854,4.294c0.621,1.5,2.016,2.432,3.64,2.432h5.052C51.65,23,52,23.35,52,23.78V30.22z" />
          <path d="M27,18c-4.963,0-9,4.037-9,9s4.037,9,9,9s9-4.037,9-9S31.963,18,27,18z M27,34c-3.859,0-7-3.141-7-7s3.141-7,7-7   s7,3.141,7,7S30.859,34,27,34z" />
        </g>
      </svg>
    </div>
  );
};

export { WalletIcon, SearchIcon, CloseIcon, OptionsIcon };