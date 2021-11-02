import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
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
                                <Grid item sm={12} md={6} style={{textAlign: "center"}}>
                                    <Typography component="span" variant="subtitle1">Average Age: </Typography>
                                    <Typography component="span" variant="subtitle1" style={{marginLeft: "5px"}}>
                                        {Math.round((data.avg_age + Number.EPSILON) * 100) / 100}
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} md={6} style={{textAlign: "center"}}>
                                    <Typography component="span" variant="subtitle1">Average Experience Rating: </Typography>
                                    <Typography component="span" variant="subtitle1">{Math.round((data.avg_rating + Number.EPSILON) * 100) / 100}</Typography>
                                </Grid>
                            </Grid>
                            {/* <Grid container>
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
                            </Grid> */}
                            <Grid container justifyContent='center'>
                                <Grid item alignContent='center'>
                                    <Doughnut
                                        width={200}
                                        height={200}
                                        data={{
                                            labels: ['Male', 'Female'],
                                            datasets: [{
                                                label: 'Gender Distribution',
                                                data: [Number(data.gender_count['male']), Number(data.gender_count['female'])],
                                                backgroundColor: [
                                                    'rgb(54, 162, 235)',
                                                    'rgb(255, 99, 132)'
                                                ],
                                                hoverOffset: 4
                                            }]
                                        }}
                                        options={{
                                            responsive: false,
                                            maintainAspectRatio: false,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            
                            <Grid container>
                                <Grid item sm={12} md={6} style={{textAlign: "center"}}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography component="span" variant="subtitle1">Country Distribution: </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{textAlign: "start"}}>
                                            {Object.keys(data.country_count).map((country) => {
                                                let displayCountry = countries.find(c => c.code === country)
                                                console.log(displayCountry)
                                                displayCountry = displayCountry.name
                                                return (
                                                    <Typography component="span" variant="subtitle1">
                                                        {displayCountry}: {data.country_count[country]}<br/>
                                                    </Typography>
                                                )
                                            })}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sm={12} md={6} style={{textAlign: "center"}}>
                                    <Typography component={"span"} variant="subtitle1">Total Results: </Typography>
                                    <Typography component={"span"} variant="subtitle1" style={{marginLeft: "5px"}}>{data.num_responses}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}