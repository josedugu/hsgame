import { Stack } from '@mui/material';
import { forwardRef, useImperativeHandle } from 'react';

const Child= forwardRef((props, ref)=>{
  useImperativeHandle(
    ref,
    () => ({showAlert() {console.log("Child Function Called")}}),
)
return(
  <Stack>Hola</Stack>
)
})

Child.displayName="Child"

export default Child