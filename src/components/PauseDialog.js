import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const PauseDialog = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    openDialog() {
      setOpen(true);
      setProg(props.progress);
    },
  }));
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  //to refactor

  useEffect(() => {
    if (open) {
      props.setProgress(prog);
    }
  }, [props.progress]);

  const [open, setOpen] = useState(false);
  const [prog, setProg] = useState(0);

  const navigate = useNavigate();

  const restartGame = () => {
    props.restartGame();
    setOpen(false);
  };
  return (
    <Dialog
      className="testt"
      fullScreen={fullScreen}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Wrap>
        <h1>PAUSE</h1>
        <div className="wrapBtns">
          <button onClick={() => setOpen(false)} className="whiteBtn">
            CONTINUE GAME
          </button>
          <button onClick={() => restartGame()} className="whiteBtn">
            RESTART
          </button>
          <button onClick={() => navigate("/")} className="roseBtn">
            QUIT GAME
          </button>
        </div>
      </Wrap>
    </Dialog>
  );
});
const Wrap = styled.div`
  background: #7945ff;
  border: 3px solid #000000;
  box-shadow: 0px 3px 0px #000000;
  border-radius: 40px;
  width: 480px;
  height: 491px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  h1 {
    font-weight: 700;
    font-size: 56px;
    line-height: 71px;
    text-align: center;
    color: white;
    margin-top: 10px;
  }
  .wrapBtns {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    height: 312px;
    button {
      width: 400px;
      height: 72px;
      cursor: pointer;
      &:hover {
        box-shadow: 0px 10px 0px var(--purple-primary);
        border: 3px solid var(--purple-primary);
      }
    }
    .whiteBtn {
      background: #ffffff;
      border: 3px solid #000000;
      box-shadow: 0px 10px 0px #000000;
      border-radius: 20px;
      font-weight: 700;
      font-size: 24px;
      line-height: 31px;
      text-align: center;
    }
    .roseBtn {
      background: #fd6687;
      /* Black */

      border: 3px solid #000000;
      box-shadow: 0px 10px 0px #000000;
      border-radius: 20px;
      font-weight: 700;
      font-size: 24px;
      line-height: 31px;
      /* identical to box height */

      /* White */

      color: #ffffff;
    }
  }
`;
