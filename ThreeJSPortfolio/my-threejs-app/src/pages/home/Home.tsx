import React from "react";
import MyThreeScene from "../../components/myThreeScene/MyThreeScene";
import StickyHeader from "../../components/stickHeader/StickyHeader";

type Props = {};

export default function Home({}: Props) {
  return (
    <div>
      <StickyHeader />
      <MyThreeScene />
    </div>
  );
}
