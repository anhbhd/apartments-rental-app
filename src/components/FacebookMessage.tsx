import { FacebookProvider, CustomChat } from "react-facebook";

const FacebookMessage = () => {
  return (
    <div>
      <FacebookProvider appId="362862773086452" chatSupport>
        <CustomChat pageId="180645638465575" minimized={true} />
      </FacebookProvider>
    </div>
  );
};

export default FacebookMessage;
