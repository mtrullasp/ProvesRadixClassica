import React, { useEffect, useState } from "react";
import ComposersList, { IComponentListProps } from "./ComposersList";
import MenuButton from "./MenuButton";
import { Observer } from "mobx-react";
import ComposersStore from "./stores/ComposersStore";
import { Grid } from "@mui/material";
import { IComposer } from "./interfaces";
import { stringify } from "querystring";
import useSWR from "swr";
import { HOST_WEB_API } from "./stores/RandomStore";
import axios, { AxiosResponse } from "axios";
import composersStore from "./stores/ComposersStore";
import ImageBase64 from "./components/ImageBase64";

const store = new ComposersStore();

const fetcher = (url) =>
  axios.get(url).then((res: AxiosResponse<IComposer[]>) => res.data);

const Composers = (props: IComponentListProps) => {
  // let [keySelected, setKeySelected] = useState("rank_asc");
  //const store = new ComposersStore();
  const { data, error } = useSWR(HOST_WEB_API + "/composers", fetcher);

  if (error) {
    alert("error");
    debugger;
    return "An error has occurred. " + stringify(error);
  }
  if (!data) {
    return "Loading...";
  }
  //store.setComposers(data);
  //alert("tot bé");
  debugger;

  return (
    <ul>
      {data.map((d) => {
        return (
          <li>
            <ImageBase64 base64Content={d.PictureHeaderBioBase64} />
          </li>
        );
      })}
    </ul>
  );
  /* return (
    <Grid container width={"100%"}>
      <Grid item lg={2}>
        <MenuButton
          key="rank"
          selected={store?.keySelected?.startsWith("rank")}
          size={14}
          text={"Ordena per ranking"}
          onClick={() => {
            debugger;
            if (store?.keySelected === "rank_asc") {
              store?.setKeySelected("rank_desc");
            } else {
              store?.setKeySelected("rank_asc");
            }

            if (store.keySelected === "rank_asc") {
              store?.fOrderByComposers = store.fOrderByRanking;
            } else {
              store?.fOrderByComposers = store.fOrderByRankingDesc;
            }
          }}
        />
      </Grid>
      <Grid item lg={2}>
        <MenuButton
          key={"neix"}
          selected={store.keySelected?.startsWith("neix_")}
          size={14}
          text={"Ordena per data de naixement"}
          onClick={() => {
            if (store?.keySelected === "neix_asc") {
              store?.setKeySelected("neix_desc");
            } else {
              store?.setKeySelected("neix_asc");
            }

            if (store.keySelected.endsWith("asc")) {
              store.fOrderByComposers = store.fOrderByDate;
            } else {
              store.fOrderByComposers = store.fOrderByDateDesc;
            }
          }}
        />
      </Grid>
      <Grid item lg={2}>
        <MenuButton
          key={"ale"}
          selected={false}
          size={14}
          text={"Ordena alfabèticament"}
          onClick={() => {
            if (store.keySelected === "alfabetic_asc") {
              store.setKeySelected("alfabetic_desc");
            } else {
              store.setKeySelected("alfabetic_asc");
            }
            //store.fOrderByComposers = store.fOrderByName;

            if (store.keySelected.endsWith("_asc")) {
              store.fOrderByComposers = store.fOrderByName;
            } else {
              store.fOrderByComposers = store.fOrderByNameDesc;
            }
          }}
        />
      </Grid>
      <Grid item lg={2}>
        <MenuButton
          key={"ale"}
          selected={false}
          size={14}
          text={"Ordena aleatòriament"}
          onClick={() => {
            store.setKeySelected("ale" + Date().toString());
            store.fOrderByComposers = store.fShuffle;
          }}
        />
      </Grid>
      <Grid item lg={2}>
        <MenuButton
          size={14}
          text={"Agrupa per nacionalitat"}
          onClick={() => {}}
        />
      </Grid>
      <Grid item lg={12}>
        <ComposersList {...props} />;
      </Grid>
    </Grid>
  );
*/ //return ComposersList(props);
};

export default Composers;
