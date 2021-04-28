import React from 'react';

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";


const useStyles = () => ({
    itemGrid:{
        background: props => props.backgroundImage ? `url(${props.backgroundImage})` : null,
        backgroundColor: props => props.backgroundImage ? null : 'red',
        height:'10vh',
        display:'flex',
        justifyContent:'flex-end',
        
    }
});

const TrendingItem = ({backgroundImage, title, classes}) => {
    return (
        <Grid container className={classes.itemGrid}>
            <Grid item xs={12} className={classes.itemTitleGrid}>
                <Typography className={classes.itemTitleText}>{title}</Typography>
            </Grid>
        </Grid>
    )

}

export default withStyles(useStyles)(TrendingItem)