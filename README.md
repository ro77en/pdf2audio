# PDF to Audio Converter

A web application that converts PDF text to speech using Google Text-to-Speech (GTTS). This project features a React frontend for selecting and uploading PDF files, extracting their text, and streaming the generated audio directly in the browser. The backend is built with Node.js and Express, utilizing GTTS to handle the text-to-audio conversion.

## Key Features

- Drag-and-drop PDF file upload
- Text extraction from PDF files using react-pdftotext
- Language detection using franc-min
- Text-to-Speech conversion via Google Text-to-Speech (GTTS)
- Stream audio directly in the browser
- Fully responsive UI

## Tech Stack

- Frontend: React, Vite
- Backend: Node.js, Express, GTTS
- PDF to text: react-pdftotext
- Language detection: franc-min

## Project Structure

### Client
The front-end application is built with React and Vite. It allows users to upload a PDF, extract text from it, and convert the text to audio.

**Client Folder Structure:**
- `src/`
  - `assets/` - Contains images used in the application.
  - `components/` - Contains React components.
    - `Converter/` - Component for PDF upload and audio playback.
    - `Message/` - Component for displaying messages.
  - `fonts/` - Contains custom fonts.
  - `App.css` - Application-wide CSS.
  - `App.jsx` - Main application component.
  - `index.css` - Global CSS.
  - `main.jsx` - Application entry point.
- `public/` - Publicly accessible files.
- `package.json` - Front-end dependencies and scripts.

### Server
A Node.js server that handles text-to-audio conversion using the `gtts` library. It receives a POST request with text and language parameters, converts the text to audio, and streams the audio file back to the client.

**Server Folder Structure:**
- `server.js` - Server entry point.
- `package.json` - Server dependencies and scripts.

## Getting Started

### Prerequisites
- Node.js (v20.12.2 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the client directory and install dependencies:**
    ```bash
    cd client
    npm install
    ```

3. **Navigate to the server directory and install dependencies:**
    ```bash
    cd ../server
    npm install
    ```

### Running the Application

1. **Start the server:**
    ```bash
    cd server
    npm start
    ```

2. **Start the client:**
    ```bash
    cd ../client
    npm run dev
    ```

The client will be available at `http://localhost:5173` and the server at `http://localhost:3000`.

### Usage

1. Open the application in your browser.
2. Drag and drop a PDF file or use the "Browse Files" button to select a PDF file.
3. Click the "Convert PDF" button to extract text and convert it to audio.
4. The audio player will appear once the conversion is complete, allowing you to play the audio.

### Configuration

You can adjust the language settings in the `Converter.jsx` file by modifying the `getSpeechLang` function.

### Troubleshooting

- Ensure that both the client and server are running.
- Check the browser console and server logs for any errors.

### License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

### Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [gtts](https://www.npmjs.com/package/gtts)
- [Express](https://expressjs.com/)

