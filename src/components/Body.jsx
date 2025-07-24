import React, { useState } from 'react';

function VideoPlayer({ selected }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-fit mx-auto">
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}

      {/* Video Element */}
      <video
        className="rounded-lg shadow-lg"
        controls
        width="1024"
        src={selected.link}
        style={{ border: '1px solid black' }}
        onWaiting={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
        onPlaying={() => setLoading(false)}
      />
    </div>
  );
}
function Body({selected, setSelected, servers, setServers}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-500">
      <div className="text-gray-800 font-bold text-5xl sm:text-7xl drop-shadow-sm mb-6 text-center">
        Stream Section
      </div>
      <VideoPlayer selected={selected} />
      <div className="mt-4">
        <h2 className="text-2xl text-gray-800 mb-2 font-bold">Available Servers</h2>
        <ul className="list-disc list-inside">
          {servers && servers.map((server, index) => (
            <li key={index} className="text-gray-900 hover:text-blue-200 cursor-pointer font-bold" onClick={() => setSelected(server)}>
              {server.resolution}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default Body