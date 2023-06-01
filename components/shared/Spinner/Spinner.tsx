import React, { CSSProperties } from "react";
import { CircleLoader, RingLoader } from "react-spinners";
import BounceLoader from "react-spinners/BounceLoader";
import PuffLoader from "react-spinners/PuffLoader";
import ScaleLoader from "react-spinners/ScaleLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
  color: "blue",
};

export default function Spinner({
  size,
  scale,
}: {
  size: number;
  scale?: boolean;
}) {
  return (
    <div
      className="
    flex justify-center items-center h-96 pt-72 w-screen
    "
    >
      {scale ? (
        <ScaleLoader cssOverride={override} color="#1c4e80" />
      ) : (
        <PuffLoader color="#1c4e80" cssOverride={override} size={size || 60} />
      )}
    </div>
  );
}
