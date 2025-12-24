import VideoComponent from "./VideoComponent";
import shaka from "shaka-player";

// import { useLocation } from "react-router";

export interface shakaProps {
  src: string;
  autoplay?: boolean;
  onError?: (error: shaka.util.Error) => void;
}
export default function VideoPlayer() {
  // const { pathname } = useLocation();
  // const courseTitle = pathname.split("/").at(-1);

  // const videoJsOptions = {
  //   autoplay: true,
  //   controls: true,
  //   responsive: false,
  //   fluid: true,
  //   sources: [
  //     {
  //       src: "https://usman-courses.s3.ap-south-1.amazonaws.com/videos/master.m3u8",
  //       type: "application/x-mpegURL",
  //     },
  //   ],
  // };

  return (
    <div className="w-7xl p-4 w-full">
      <VideoComponent
        src="https://usman-courses.s3.ap-south-1.amazonaws.com/videos/master.m3u8"
        autoplay
      />
    </div>
  );
}
