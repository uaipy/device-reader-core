import { getMessageMiddleWare } from "./infra/factories";
import server from "./server";

(async () => {
  server.use("/message", await getMessageMiddleWare());
  server.listen(3000, () => console.log("Running on http://localhost:3000"));
})();
