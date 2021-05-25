import React, { useEffect, useState } from "react";
import _ from "underscore";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import StoryItem from "../createstory/storyItem";

const useStyles = {
  createStoryGrid: {
    padding: "3vh 2vw",
    maxWidth: "600px",
    margin: "auto",
  },
};

const CreateStory = ({ classes, setStoryInfo, storyInfo, storyId, token }) => {
  const [orderArray, setOrderArray] = useState([]);

  useEffect(() => {
    const newOrderArray = _.sortBy(storyInfo, "order_id").map((el) => ({
      id: el.id,
      order_id: el.order_id,
    }));
    setOrderArray(newOrderArray);
  }, [storyInfo]);

  const storyInfoArray = _.sortBy(storyInfo, "order_id");

  return (
    <Grid
      contaniner
      justifyContent="center"
      className={classes.createStoryGrid}
    >
      {storyInfoArray.length
        ? storyInfoArray.map((el) => (
            <StoryItem
              storyInfo={el}
              setStoryInfo={setStoryInfo}
              id={el.id}
              key={el.id}
              order_id={el.order_id}
              storyId={storyId}
              token={token}
              orderArray={orderArray}
              setOrderArray={setOrderArray}
              length={storyInfoArray.length}
              icon={true}
            />
          ))
        : null}
      <StoryItem
        storyInfo={storyInfo}
        setStoryInfo={setStoryInfo}
        id={storyInfo.length + 1}
        key={storyInfo.length + 1}
        order_id={storyInfo.length + 1}
        storyId={storyId}
        token={token}
        icon={false}
      />
    </Grid>
  );
};

export default compose(withStyles(useStyles))(CreateStory);
