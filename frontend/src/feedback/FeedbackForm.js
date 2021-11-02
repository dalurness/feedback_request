import { Button, Card, CardActions, CardContent, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@material-ui/core'
import { Star, StarOutline } from '@material-ui/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { sendFeedbackService } from '../services'
import countries from '../util/countries.json'

export default function FeedbackForm() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [emailValid, setEmailValid] = useState(true)
    const [emailMessage, setEmailMessage] = useState()
    const [age, setAge] = useState(0)
    const [gender, setGender] = useState("male")
    const [country, setCountry] = useState("US")
    const [rating, setRating] = useState(3)
    const [improvements, setImprovements] = useState()
    const history = useHistory()

    function checkEmailValid(e) {
        const regexp =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regexp.test(e)
    }

    function checkEmail() {
        if(checkEmailValid(email)) {
            setEmailValid(true)
            setEmailMessage("")
            return
        }
        setEmailValid(false)
        setEmailMessage("Invalid Email")
    }

    function sendFeedback() {
        const response = sendFeedbackService({name, email, age, gender, country, rating, improvements})
        if (response) {
            history.push("/feedback/thank-you", { referrer: document.referrer })
        } else {
            alert("Error saving feedback")
        }
    }

    return (
        <>
            <Grid container justifyContent='center' style={{marginTop: "40px"}}>
                <Grid item xs={11} md={6}>
                    <Card>
                        <CardContent>
                            <Grid container justifyContent='center' alignItems='center'>
                                <Grid item xs={11}>
                                    <TextField
                                        label='Name'
                                        fullWidth
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField
                                        label='Email'
                                        fullWidth
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={() => checkEmail()}
                                        error={!emailValid}
                                        helperText={emailMessage}
                                    />
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField
                                        label='Age'
                                        type='number'
                                        fullWidth
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={11}>
                                    <FormControl fullWidth>
                                        <InputLabel>Gender</InputLabel>
                                        <Select
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                        >
                                            <MenuItem value={"male"}>Male</MenuItem>
                                            <MenuItem value={"female"}>Female</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={11}>
                                    <FormControl fullWidth>
                                        <InputLabel>Country</InputLabel>
                                        <Select
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                        >
                                            {
                                                countries.map((country) => {
                                                    return <MenuItem value={country.code} key={country.code}>{country.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={11} style={{marginTop: "10px"}}>
                                    <Typography variant="subtitle1" gutterBottom style={{color: "rgba(0, 0, 0, 0.54)"}}>
                                        Experience Rating
                                    </Typography>
                                    <Slider
                                        step={1}
                                        getAriaValueText={(val) => val}
                                        value={rating}
                                        onChange={(_, value) => setRating(value)}
                                        marks={[...Array(5).keys()].map((val) => {
                                            return {
                                                    value: val + 1,
                                                    label: <IconButton onClick={() => setRating(val+1)}>
                                                            {rating >= val + 1 ? <Star style={{color: "gold"}}/> : <StarOutline/>}
                                                        </IconButton>
                                                }
                                        })}
                                        min={1}
                                        max={5}
                                        valueLabelDisplay='auto'
                                    />
                                </Grid>
                                <Grid item xs={11} style={{marginTop: "25px"}}>
                                <TextField
                                    label="Suggested Improvements"
                                    multiline
                                    rows={4}
                                    value={improvements}
                                    onChange={(e) => setImprovements(e.target.value)}
                                    variant="filled"
                                    fullWidth
                                />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid container justifyContent='center'>
                                <Grid item xs={2} style={{textAlign:"center"}}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => sendFeedback()}
                                        disabled={
                                            !name ||
                                            !checkEmailValid(email) ||
                                            !age ||
                                            !gender ||
                                            !country
                                        }
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}