import { FacebookProvider, CustomChat } from "react-facebook";
import { useLocation } from "react-router-dom";

const FacebookMessage = () => {
  const { pathname } = useLocation();
  const prefixIsAdmin: boolean = pathname.split("/")[1] === "admin";

  return (
    <div>
      {!prefixIsAdmin ? (
        <FacebookProvider appId="362862773086452" chatSupport>
          <CustomChat pageId="180645638465575" minimized={true} />
        </FacebookProvider>
      ) : null}
    </div>
  );
};

export default FacebookMessage;
