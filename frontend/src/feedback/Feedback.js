import { AppBar, Toolbar, Typography } from "@material-ui/core"
import React from "react"
import FeedbackForm from "./FeedbackForm"

export default function Feedback() {
    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6">Ancestry Feedback</Typography>
                </Toolbar>
            </AppBar>
            <FeedbackForm />
        </>
    )
}