import React from "react";
import { AppointmentTile } from "../tile/AppointmentTile";

export const AppointmentTilesList = ({ tiles }) => {
  return (
    <div className="tileDisplay">
      {
        tiles.map((tile,index) =>(
            <AppointmentTile key={index} passedObj = {tile} />
        ))
      }

    </div>
  );
};
