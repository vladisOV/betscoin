import web3 from "./web3";
import Betscoin from "./build/Betscoin.json";

const instance = new web3.eth.Contract(
  JSON.parse(Betscoin.interface),
  "0xC3D52aA55901FF4D8417ff2328310ffBC1efDD65"
);

export default instance;
