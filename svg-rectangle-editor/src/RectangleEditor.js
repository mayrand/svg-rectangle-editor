import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const RectangleEditor = () => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [perimeter, setPerimeter] = useState(0);
    const [isResizing, setIsResizing] = useState(false);
    const [validationError, setValidationError] = useState("");
    const rectangleRef = useRef(null);

    useEffect(() => {
        axios.get("/rectangle")
            .then((response) => {
                setWidth(response.data.width);
                setHeight(response.data.height);
                setPerimeter(2 * (response.data.width + response.data.height));
            })
            .catch((error) => console.error("Error loading dimensions:", error));
    }, []);

    const handleResize = (e) => {
        if (!isResizing) return;

        const newWidth = Math.round(e.clientX - rectangleRef.current.getBoundingClientRect().left);
        const newHeight = Math.round(e.clientY - rectangleRef.current.getBoundingClientRect().top);

        setWidth(newWidth);
        setHeight(newHeight);
        setPerimeter(2 * (newWidth + newHeight));
    };

    const saveDimensions = () => {
        axios.post("/rectangle", { width, height })
            .then((response) => {
                if (response.data?.error) {
                    setValidationError(response.data.error);
                } else {
                    setValidationError("");
                }
            })
            .catch((error) => console.error("Error saving dimensions:", error));
    };

    return (
        <div>
            <h1>SVG Rectangle Editor</h1>
            <svg
                width={width + 20}
                height={height + 20}
                onMouseMove={handleResize}
                onMouseUp={() => {
                    setIsResizing(false);
                    saveDimensions();
                }}
            >
                <rect
                    ref={rectangleRef}
                    width={width}
                    height={height}
                    fill="lightblue"
                    stroke="black"
                    strokeWidth="2"
                    onMouseDown={() => setIsResizing(true)}
                />
            </svg>
            <div>
                <p>Perimeter: {perimeter.toFixed(2)}</p>
                {validationError && <p style={{ color: "red" }}>{validationError}</p>}
            </div>
        </div>
    );
};

export default RectangleEditor;