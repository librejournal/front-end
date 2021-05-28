/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect } from "react";
import { WindowContext } from "./context";

export const withWindowProvider = (Component) => {
    const WindowWrapper = (props) => {
        const getDimensions = () => {
            const w = window;
            const d = document;
            const limit = 600;
            const { documentElement } = d;
            const body = d.getElementsByTagName("body")[0];
            const width =
                w.innerWidth || documentElement.clientWidth || body.clientWidth;
            let height =
                w.height ||
                documentElement.clientHeight ||
                w.innerHeight ||
                body.clientHeight;
            if (limit > width) height *= 0.9;
            return { width, height, limit };
        };
        const [dimension, setDimension] = useState({
            width: props.width || getDimensions().width,
            height: props.height || getDimensions().height,
            limit: props.limit || getDimensions().limit,
        });
        const updateDimensions = () => {
            setDimension({
                width: props.width || getDimensions().width,
                height: props.height || getDimensions().height,
                limit: props.limit || getDimensions().limit,
            });
        };

        useEffect(() => {
            window.addEventListener("resize", updateDimensions);
            return () => {
                window.removeEventListener("resize", updateDimensions);
            };
        });

        return (
            <WindowContext.Provider value={dimension}>
                <Component {...props} />
            </WindowContext.Provider>
        );
    };
    return WindowWrapper;
};
