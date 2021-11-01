import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import MarketingData from './MarketingData'

export default function Marketing() {
    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6">Ancestry Marketing</Typography>
                </Toolbar>
            </AppBar>
            <MarketingData />
        </>
    )
}