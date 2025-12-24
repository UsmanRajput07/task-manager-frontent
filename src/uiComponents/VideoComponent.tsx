import { useEffect, useRef } from "react";
import shaka from "shaka-player";
import type { shakaProps } from "./VideoPlayar";

export default function VideoComponent({ src, autoplay = true }: shakaProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<shaka.Player | null>(null);

  useEffect(() => {
    async function initPlayer() {
      if (!videoRef.current) return;

      const player = new shaka.Player(videoRef.current);
      playerRef.current = player;

      // Error listener
      player.addEventListener("error", (e) => {
        console.error("Shaka error", e);
        // onError?.(e);
      });

      try {
        await player.load(src);
        if (autoplay) {
          await videoRef.current.play().catch(() => {});
        }
      } catch (err) {
        console.error("Load error", err);
      }
    }

    shaka.polyfill.installAll();
    initPlayer();

    return () => {
      playerRef.current?.destroy();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="w-full h-auto"
      controls
      autoPlay={autoplay}
    />
  );
}
