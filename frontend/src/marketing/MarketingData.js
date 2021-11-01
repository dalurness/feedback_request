import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getFeedbackService } from '../services'
import countries from '../util/countries.json'

export default function MarketingData() {
    const [data, setData] = useState()
    useEffect(() => {
        async function getFeedback() {
            const response = await getFeedbackService()
            if (response) {
                setData(response.data)
            } else {
                alert("error getting feedback")
            }
        }
        getFeedback()
        setInterval(getFeedback, 5000)
    }, [])

    if(!data) {
        return <></>
    }

    return (
        <>
            <Grid container justifyContent='center' style={{marginTop: "40px"}}>
                <Grid item xs={11} md={6}>
                    <Card>
                        <CardContent>
                            <Grid container>
                                <Grid item>
                                    <Typography variant="subtitle1">Average Age: </Typography>
                                </Grid>
                                <Grid item style={{marginLeft: "5px"}}>
                                    <Typography variant="subtitle1">
                                        {Math.round((data.avg_age + Number.EPSILON) * 100) / 100}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item>
                                    <Typography variant="subtitle1">Average Experience Rating: </Typography>
                                </Grid>
                                <Grid item style={{marginLeft: "5px"}}>
                                    <Typography variant="subtitle1">{Math.round((data.avg_rating + Number.EPSILON) * 100) / 100}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item>
                                    <Typography variant="subtitle1">Gender Distribution: </Typography>
                                </Grid>
                                <Grid item style={{marginLeft: "5px"}}>
                                    {Object.keys(data.gender_count).map((gender) => {
                                        return (
                                            <Typography variant="subtitle1">{gender}: {data.gender_count[gender]}</Typography>
                                        )
                                    })}
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item>
                                    <Typography variant="subtitle1">Country Distribution: </Typography>
                                </Grid>
                                <Grid item style={{marginLeft: "5px"}}>
                                    {Object.keys(data.country_count).map((country) => {
                                        let displayCountry = countries.find(c => c.code === country)
                                        console.log(displayCountry)
                                        displayCountry = displayCountry.name
                                        return (
                                            <Typography variant="subtitle1">
                                                {displayCountry}: {data.country_count[country]}
                                            </Typography>
                                        )
                                    })}
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item>
                                    <Typography variant="subtitle1">Total Results: </Typography>
                                </Grid>
                                <Grid item style={{marginLeft: "5px"}}>
                                    <Typography variant="subtitle1">{data.num_responses}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}