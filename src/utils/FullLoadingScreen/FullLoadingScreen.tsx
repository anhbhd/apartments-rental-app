import { CircularProgress } from "@mui/material";
import "./FullLoadingScreen.scss";
const FullLoadingScreen = () => {
  return (
    <div className="FullLoadingScreen">
      <CircularProgress
        size={50}
        color="warning"
        className="FullLoadingScreen__circle-loading"
      />
    </div>
  );
};

export default FullLoadingScreen;
