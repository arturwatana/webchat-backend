import "./websocket";
import { server } from "./http";

server.listen(8080, () => {
  console.log("listening on port 8080");
});
