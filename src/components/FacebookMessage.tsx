import { FacebookProvider, CustomChat } from "react-facebook";
const FacebookMessage = () => {
  return (
    <FacebookProvider appId="362862773086452" chatSupport>
      <CustomChat pageId="180645638465575" minimized={true} />
    </FacebookProvider>
  );
};

export default FacebookMessage;
