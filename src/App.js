import React, { useState } from "react";
import QRCode from "qrcode.react";
import { saveAs } from "file-saver";
import axios from "axios";

import "./App.css";

const App = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const shortenUrl = async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("url", url);

    const options = {
      method: "POST",
      url: "https://url-shortener-service.p.rapidapi.com/shorten",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "621f9427f7msh5f5cd7a2d35cf9fp16a032jsn82c126e3011f",
        "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      setShortUrl(response.data.result_url);
      setQrUrl(response.data.result_url);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadQR = () => {
    const canvas = document.querySelector("canvas");
    canvas.toBlob((blob) => saveAs(blob, "qr-code.png"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center px-3">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          LinkQR
        </h1>
        <div className="flex flex-col mb-6">
          <input
            type="text"
            className="border border-gray-300 rounded-full py-4 px-6 mb-4 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-full py-4 px-6 focus:outline-none hover:bg-blue-600 transition-all duration-300"
            onClick={shortenUrl}
          >
            Shorten URL
          </button>
        </div>
        {shortUrl && (
          <div className="bg-gray-100 rounded-3xl p-6 mb-4">
            <p className="mb-4 text-lg text-gray-800 font-semibold">
              Short URL:
              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="ml-2 text-blue-500 underline"
              >
                {shortUrl}
              </a>
            </p>
            <div className="flex items-center justify-center mb-6">
              <QRCode value={qrUrl} size={200} />
            </div>
            <button
              className="bg-green-500 text-white rounded-full py-4 px-6 focus:outline-none hover:bg-green-600 transition-all duration-300"
              onClick={downloadQR}
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
