import { Button, Card, CardContent, Dialog, DialogTitle, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom';

export default function SuccessPage() {
    const history = useHistory()

    function closeTab() {
        window.open("about:blank", "_self");
        window.close();
    }

    let referrer = history
    return (
        <Grid container justifyContent='center' style={{marginTop: "40px"}}>
            <Grid item xs={11} md={6}>
                <Card>
                    <CardContent>
                        <div style={{textAlign: "center", marginBottom: "30px"}}><Typography variant="h3" color="secondary">Thank You!</Typography></div>
                        <Grid container justifyContent="center" style={{marginBottom: "30px"}}>
                            <Grid item xs={4} style={{textAlign: "center"}}>
                                <Button onClick={() => {}} variant='contained' color="primary">Back To Previous Page</Button>
                            </Grid>
                            <Grid item xs={4} style={{textAlign: "center"}}>
                                <Button onClick={() => closeTab()} variant="contained" color="primary">Close Tab</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}