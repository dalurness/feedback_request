import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useLocation } from 'react-router-dom';

export default function SuccessPage() {
    const location = useLocation()

    // function closeTab() {
    //     // window.open("about:blank", "_self")
    //     // window.close()

    // }

    let referrer = location?.state?.referrer
    return (
        <Grid container justifyContent='center' style={{marginTop: "40px"}}>
            <Grid item xs={11} md={6}>
                <Card>
                    <CardContent>
                        <div style={{textAlign: "center", marginBottom: "30px"}}><Typography variant="h3" color="secondary">Thank You!</Typography></div>
                        <Grid container justifyContent="center" style={{marginBottom: "30px"}}>
                            {referrer &&
                                <Grid item xs={5} md={6} style={{textAlign: "center"}}>
                                    <a href={referrer}>
                                        <Button variant='contained' color="primary">Back To Previous Page</Button>
                                    </a>
                                </Grid>
                            }
                            <Grid item xs={5} md={6} style={{textAlign: "center"}}>
                                <a href="https://ancestry.com">
                                    <Button variant="contained" color="primary">Return to Ancestry</Button>
                                </a>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}