import React from "react";
import { Tile } from "../tile/Tile";

export const TileList = ({ tiles }) => {
  
  
  return (
    <div className="tileDisplay">
      {
        tiles.map((tile,index) =>(
            <Tile key={index} passedObj = {tile} />
        ))
      }

    </div>
  );
};
