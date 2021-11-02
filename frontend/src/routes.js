import Feedback from './feedback/Feedback'
import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Marketing from './marketing/Marketing'
import SuccessPage from './feedback/SuccessPage'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={ Feedback } />
            <Route exact path="/marketing" component={ Marketing} />
            <Route exact path="/feedback/thank-you" component={ SuccessPage } />
        </BrowserRouter>
    )
}