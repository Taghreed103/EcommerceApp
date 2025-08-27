"use client";
import { Audio } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Audio
        height="100"
        width="100"
        color="#4ebb4cff"
        ariaLabel="audio-loading"
        visible={true}
      />
    </div>
  );
}
