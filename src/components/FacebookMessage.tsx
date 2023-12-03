import { FacebookProvider, CustomChat } from "react-facebook";
const FacebookMessage = () => {
  return (
    <FacebookProvider appId="665133312490429" chatSupport>
      <CustomChat pageId="178963085299549" minimized={true} />
    </FacebookProvider>
  );
};

export default FacebookMessage;
