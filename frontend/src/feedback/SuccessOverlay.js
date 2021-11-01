import { Button, Dialog, DialogTitle, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function SuccessOverlay({ open, setOpen }) {
    const history = useHistory()

    function closeTab() {
        window.open("about:blank", "_self");
        window.close();
    }
    return (
        <Dialog open={open} maxWidth="md" fullWidth>
            <DialogTitle style={{textAlign: "center"}}><Typography variant="h3" color="secondary">Thank You!</Typography></DialogTitle>
            <Grid container justifyContent="center" style={{marginBottom: "30px"}}>
                <Grid item xs={4} style={{textAlign: "center"}}>
                    <Button onClick={() => history.goBack()} variant='contained' color="primary">Back To Previous Page</Button>
                </Grid>
                <Grid item xs={4} style={{textAlign: "center"}}>
                    <Button onClick={() => closeTab()} variant="contained" color="primary">Close Tab</Button>
                </Grid>
            </Grid>
        </Dialog>
    )
}