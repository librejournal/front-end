import React from "react";
import _ from "underscore";

import { Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

const useStyles = {
    previewContainer: {
        maxWidth: "1000px",
        margin: " 0 auto",
    },
    titleItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "2vh 0",
    },
    textItem: {
        padding: "1vh 1vw",
    },
    imageItem: {
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
        margin: "3vh 0",
    },
};

const PreviewStory = ({ classes, storyInfo }) => {
    const storyInfoArray = _.sortBy(storyInfo, "order_id");
    return (
        <Grid container className={classes.previewContainer}>
            {storyInfoArray.map((el) =>
                el.type === "TITLE" ? (
                    <Grid
                        item
                        xs={12}
                        className={classes.titleItem}
                        key={el.id}
                    >
                        <Typography variant="h3" color="primary">
                            {el.text}
                        </Typography>
                    </Grid>
                ) : el.type === "TEXT" ? (
                    <Grid
                        item
                        xs={12}
                        className={classes.textItem}
                        key={el.text}
                    >
                        <Typography variant={el.type_setting}>
                            {el.text}
                        </Typography>
                    </Grid>
                ) : el.type === "IMAGE" ? (
                    <Grid
                        item
                        xs={12}
                        className={classes.imageItem}
                        key={el.id}
                        style={{
                            backgroundImage: `url(${el.url})`,
                            height: `${el.size}vh`,
                        }}
                    />
                ) : null
            )}
        </Grid>
    );
};

export default compose(withStyles(useStyles))(PreviewStory);
