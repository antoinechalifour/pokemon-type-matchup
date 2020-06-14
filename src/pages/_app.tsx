import "reset.css/reset.css";

import { AppProps } from "next/app";
import React from "react";
import { Theme } from "@/ui/Theme";

const PokemonTypeMatchupApp: React.FC<AppProps> = ({
  Component,
  pageProps,
  router,
}) => (
  <Theme>
    <Component {...pageProps} key={router.pathname} />
  </Theme>
);

export default PokemonTypeMatchupApp;
