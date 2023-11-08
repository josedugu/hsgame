import {
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  IconButton
} from "@mui/material";
import Img from "./Img";
import cat from "./assets/cat.jpg";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

export const EndScreen = ({ show,setLevel,setShowEndScreen,newLevel }) => {
  newLevel?.updateGameLevel()
  const data = newLevel?.getResult();
  console.log(data);
  const handleClick=()=>{
    newLevel?.newGame()
    setShowEndScreen(false)
    setLevel(0)
  }
  return (
    <Stack
      sx={{
        display: show ? "flex" : "none",
        width: "100%",
        height: "90%",
        border: "solid 1px red",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>🏆{data?.score}</h1>
      <List
        sx={{
          p: "16px 16px",
          borderRadius: "8px",
          bgcolor: "#FFFFFF",
          maxHeighteight: "60%",
          overflowX: "auto",
          color: "gray",
        }}
      >
        {data?.words &&
          data?.words?.map((item, index) => (
            <div key={index}>
              <ListItem sx={{ width: "100%" }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      border: `solid 3px ${
                        item?.level === "gold"
                          ? "gold"
                          : item?.level === "silver"
                          ? "silver"
                          : "none"
                      }`,
                    }}
                  >
                    <Img
                      width={100}
                      src={item?.url || cat}
                      fallbackSrc={cat}
                      alt={item?.name}
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{ fontFamily: "Nunito", color: "black" }}
                  primary={item.name}
                  secondary={`🏆: ${item?.level || ""}`}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
      </List>
      <IconButton
      onClick={handleClick}
      color="primary">
        <DoubleArrowIcon fontSize="large" sx={{ color: "white" }} />
      </IconButton>
    </Stack>
  );
};
