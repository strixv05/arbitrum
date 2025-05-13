"use client";

function GradientBg() {
  return (
    <>
      <div className="size-full absolute filter ">
        <svg width="98%" height="100%" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_276_156)" className="rotate">
            <path d="M361.44 118.288L590.943 429.458L279.86 658.896L50.3579 347.727L361.44 118.288Z" fill="#0447D9" />
            <path
              d="M640.584 908.125C546.484 977.528 413.923 957.486 344.501 863.36C275.078 769.233 295.083 636.667 389.183 567.263C483.283 497.86 615.844 517.902 685.266 612.029C754.689 706.155 734.684 838.722 640.584 908.125Z"
              fill="#563CB8"
            />
            <path d="M271.276 673.075L-155.389 683.321L48.9714 308.663L271.276 673.075Z" fill="#A83196" />
            <path
              d="M372.196 756.748L274.577 893.177L374.177 1028.22L214.245 977.495L116.626 1113.93L115.401 946.146L-44.5311 895.421L114.644 842.453L113.42 674.673L213.02 809.716L372.196 756.748Z"
              fill="#E02A7F"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_276_156"
              x="-555.388"
              y="-281.712"
              width="1682.02"
              height="1795.64"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
              className="rotate"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_276_156" />
            </filter>
          </defs>
        </svg>
      </div>
    </>
  );
}

export default GradientBg;
