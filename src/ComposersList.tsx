import React, { useEffect, useState } from "react";
import ImageBase64 from "../src/components/ImageBase64";
import { Routes, Route } from "react-router-dom";
import { IComposer } from "./interfaces";
import ComposersStore from "./stores/ComposersStore";
import { observer } from "mobx-react";
import { Flipper, Flipped } from "react-flip-toolkit";
import { Container } from "postcss";

export interface IComponentListProps {
  store: ComposersStore;
  onSelectComposer: (c: IComposer) => void;
}

const getNom = (nomCognoms: string) => {
  const p = nomCognoms.indexOf(",");
  return nomCognoms.substring(p + 1);
};

const getCogNom = (nomCognoms: string) => {
  const p = nomCognoms.indexOf(",");
  return nomCognoms.substring(0, p);
};

const ComposersList = (props: IComponentListProps) => {
  const [idHover, setIdHover] = useState("");
  const composersStore = props.store;

  return (
    <Flipper
      flipKey={JSON.stringify(composersStore?.fOrderByComposers())}
      spring={"gentle"}
    >
      <ul className={"list"}>
        {composersStore.fOrderByComposers()?.map((c) => (
          <Flipped key={c.idMN} flipId={c.idMN}>
            <li
              className="composer-list"
              style={{ fontSize: 40, padding: 0 }}
              key={c.idMN}
              onClick={() => {
                props.onSelectComposer(c);
              }}
            >
              <ImageBase64
                base64Content={c.PictureHeaderBioBase64}
                width={200}
              />
              <div
                style={{
                  position: "relative",
                  bottom: 0,
                  height: 80,
                  fontWeight: "bolder",
                  marginTop: -50,
                  fontSize: 17,
                }}
              >
                <p
                  className={"nom-composer"}
                  style={{ fontWeight: "normal", fontSize: 18 }}
                >
                  {getNom(c.Nom)}
                </p>
                <p
                  className={"cognom-composer"}
                  style={{
                    fontFamily: "Cinzel",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    marginTop: -20,
                    fontSize: 20,
                  }}
                >
                  {getCogNom(c.Nom)}
                </p>
              </div>
              ))
            </li>
          </Flipped>
        ))}
      </ul>
    </Flipper>
  );
};

export default ComposersList;
