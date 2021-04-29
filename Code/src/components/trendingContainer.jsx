import React from 'react'

import { Grid, Typography } from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

import { TrendingItem } from '.'

const useStyles = ({
    trendingContainerGrid: {
        display:'flex',
        justifyContent:'space-around',
        padding: '3vh 5vw',
    },
    titleText: {
        padding:"1vh 0",
        "& p": {
            color:'#1687a7',
        }
    }
})

const TrendingContainer = ({data, classes}) => {
    return (
        <Grid container className={classes.trendingContainerGrid}>
            <Grid item className={classes.titleText} xs={12}>
                <Typography>Trending News</Typography>
            </Grid>
            <TrendingItem title="1"/>
            <TrendingItem title="2"/>
            <TrendingItem title="3"/>
            <TrendingItem title="4"/>
        </Grid>
    )
}


export default withStyles(useStyles)(TrendingContainer)