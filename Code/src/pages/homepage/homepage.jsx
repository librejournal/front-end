import React from 'react'

import {TrendingContainer, StoryItem} from '../../components'
import {Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const useStyles = ({
    firstAdv:{
        border: "1px solid black",
        height: "250px",
    }
})

const Homepage = ({classes}) => 
<Grid container justify='center'>
    <TrendingContainer />
    <Grid item xs={10} alignContent='center' className={classes.firstAdv}/>
    <StoryItem />
</Grid>

export default withStyles(useStyles)(Homepage)