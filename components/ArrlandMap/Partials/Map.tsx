import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Spinner from "../../Common/Spinner";

const Map: React.FC = (): JSX.Element => {
  const [didLoad, setLoad] = useState(false);

  return (
    <div
      className={`w-full h-full ${
        !didLoad ? "" : "border-2"
      } border-elementor-text-1 relative`}
    >
      <p>{!didLoad ? <Spinner /> : null}</p>
      <TransformWrapper
        maxScale={7}
        initialScale={7}
        initialPositionX={-3520}
        initialPositionY={-3394}
      >
        <TransformComponent>
          <img
            src="https://arrland-media.s3-eu-central-1.amazonaws.com/media/arrland_map.jpg"
            alt="hex map"
            onLoad={() => setLoad(true)}
            className={`${!didLoad ? "hidden" : "flex"} h-auto object-contain `}
          />
          <img
            src="/clouds.png"
            alt="Clouds"
            className="absolute bottom-0 left-0 pointer-events-none animate-clouds"
          />
          <img
            src="/clouds.png"
            alt="Clouds"
            className="absolute bottom-0 left-0 pointer-events-none animate-clouds-1"
          />
          <img
            src="/clouds.png"
            alt="Clouds"
            className="absolute bottom-0 left-0 pointer-events-none animate-clouds-2"
          />
        </TransformComponent>
        <img
          src="/arrland_watermark.png"
          alt="Arrland Watermark"
          className="absolute bottom-0 left-0 h-[10%] pointer-events-none"
        />
      </TransformWrapper>
    </div>
  );
};
export default Map;
