import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { css, createStitches } from "@stitches/react";
import { purple, slate } from "@radix-ui/colors";
import * as Dialog from "@radix-ui/react-dialog";
import { LayoutContainer } from "../src/components/LayoutSantGrial";

import ComposersStore from "../src/stores/ComposersStore";
import ComponentList from "../src/ComposersList";
import ComposersList from "../src/ComposersList";
import Composers from "../src/Composers";

//base tokens
//theme with createStitches -> css variables <3
const { css } = createStitches({
  theme: {
    colors: {
      ...purple,
      ...slate,
      black: "black",
      white: "white",
      gray: "dimgray",
    },
    fontSizes: {
      small: "13px",
      medium: "18px",
    },
    space: {
      1: "5px",
      2: "10px",
      3: "15px",
      4: "20px",
    },
    radii: {
      round: "20px",
    },
  },
  utils: {
    paddingX: (value: number) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value: number) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
});

const myd = (color: string) => {
  return <div>{color}</div>;
};

const Content = () => {
  const store = new ComposersStore();
  return <Composers store={store} onSelectComposer={() => {}} />;
};

const Index = () => {
  const headerContent = <span>Compositors</span>;
  return (
    <LayoutContainer
      headerContent={headerContent}
      clientContent={<Content />}
      leftNavBarContent={myd("blue")}
      rightLinkBarContent={myd("yellow")}
      footerContent={myd("player")}
    />
  );
};

export default Index;
