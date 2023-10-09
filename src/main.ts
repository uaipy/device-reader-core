import { getMessageMiddleWare } from "./infra/factories";
import server from "./server";

(async () => {
  server.use("/message", await getMessageMiddleWare());
  server.listen(process.env.PORT || 3000, () =>
    console.log(`Running on PORT ${process.env.PORT || 3000}`)
  );
})();
