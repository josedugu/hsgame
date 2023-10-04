import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";
import Img from "./Img";
import cat from './assets/cat.jpg'
export const Logros = ({array}) => {
  return (
    <List >
        {array && array.map((item, index)=>
        <div key={index}>
          <ListItem  sx={{width:"100%"}}>
          <ListItemAvatar>
            <Avatar sx={{border:`solid 3px ${item?.level==="gold"?"gold":item?.level==="silver"?"silver":"none"}`}}>
              <Img
                width={100}
                src={item?.url}
                fallbackSrc={cat}
                alt={item?.name}
              />
            </Avatar>
          </ListItemAvatar>
          <ListItemText sx={{fontFamily:"Nunito"}} primary={item?.name}  secondary={`🏆: ${item?.level||""}`}/>
        </ListItem>
        <Divider variant="inset" component="li"/>
        </div>
        )}
    
    </List>
  );
};
