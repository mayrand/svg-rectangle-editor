# svg-rectangle-editor

Create a webpage, for drawing rectangle SVG figure.
Near to the figure display the perimeter of the figure.

Requirements:

- The initial dimensions of the SVG figure need to be taken from JSON file.
- The user should be able to resize the figure by mouse.
- Need to display the perimeter of the figure.
- After resizing, the system must update the JSON file with new dimensions.
- When resizing rectangle finishes it should be validated at BackEnd level. If the rectangle
width exceeds height it should send back error to UI . The duration of validation in
BackEnd should be artificially increased to 10 seconds (To imitate long-lasting
calculations)
- User can resize rectangle while previous validation is still not completed

Implement by using React (frontend) and C# (for JSON taking and saving through API).
Provide the source code with a readme file.


## Setup

### Frontend (React)
1. Navigate to the `svg-rectangle-editor` folder.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the development server.

### Backend (C#)
1. Navigate to the `RectangleApi` folder.
2. Run `dotnet run` to start the API server.

## Usage
1. Open the React app in your browser.
2. Resize the rectangle by clicking and dragging.
3. The perimeter will update dynamically.
4. If the width exceeds the height, an error message will be displayed.