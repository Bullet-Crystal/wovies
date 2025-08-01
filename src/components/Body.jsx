import React, { use, useState } from 'react';
import { useEffect } from 'react';

function VideoPlayer({ selected }) {
  const [loading, setLoading] = useState(false);
  
  return (
    
    <div className="relative w-fit mx-auto">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/65 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}
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
function Body({selected, setSelected, servers, setServers, host, setHost, series, setSeries, seasonsLinks, setseasonsLinks}) {
  const [episodeNum, setepisodeNum] = useState(0);
  const [seasonNum, setseasonNum] = useState(0);
  async function handleSeries(url) {
    const response = await fetch(`${host}/get-season?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'bypass-tunnel-reminder': 'true'
      }
    });
    const seasonUrls = await response.json();
    if (response.ok) {
      setSeries(true);
      setServers(seasonUrls.episodes);
      setSelected(seasonUrls.episodes[0].videoLinks[0]);
      setseasonsLinks(seasonUrls.seasons);
    }
    }
  if (!selected.link) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-500">
        <div className="text-gray-800 font-bold text-5xl sm:text-7xl drop-shadow-sm mb-6 text-center">
          Select a movie to watch
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-500">
      <div className="text-gray-800 font-bold text-5xl sm:text-7xl drop-shadow-sm my-7 text-center">
        Stream Section
      </div>

      <VideoPlayer selected={selected} />

      <div className="mt-4">
            {!series ?
              (
              <div>
                <h2 className="text-2xl text-gray-800 mb-2 font-bold">Available Servers</h2>
                <ul className="list-disc list-inside">
                  {servers.map((season, index) => (
                    <li
                      key={index}
                      className={`text-gray-900 ${selected.resolution === season.resolution ? "text-yellow-400":""} hover:text-blue-400 cursor-pointer font-bold transition-colors duration-200`}
                      onClick={() => setSelected(season)}
                    >
                      {season.resolution}
                    </li>
                  ))}
                </ul>
              </div>
              ):
              (
              <div className='flex flex-col '>
                <h2 className="text-2xl text-gray-800 mb-2 font-bold">Available Servers</h2>
                <ul className="list-disc list-inside">
                  {servers[episodeNum].videoLinks.map((server, index) => (
                    <li
                      key={index}
                      className={`text-gray-900 ${selected.link === server.link ? "text-yellow-400":""} hover:text-blue-400 cursor-pointer font-bold transition-colors duration-200`}
                      onClick={() => setSelected(server)}
                    >
                      {server.resolution}
                    </li>
                  ))}
                </ul>
                <h2 className="text-2xl text-gray-800 mb-2 font-bold">Available Seasons</h2>
                <ul className="list-disc list-inside">
                  {seasonsLinks.map((season, index) => (
                    <li
                      key={index}
                      className={`text-gray-900 ${seasonNum === season.season - 1 ? "text-yellow-400":""} hover:text-blue-400 cursor-pointer font-bold transition-colors duration-200`}
                      onClick={() => {
                        handleSeries(season.link);
                        setepisodeNum(0);
                        setseasonNum(season.season - 1);
                      }}
                    >
                      Season {season.season}
                    </li>
                  ))}
                </ul>
                <h2 className="text-2xl text-gray-800 mb-2 font-bold">Available Episodes</h2>
                <ul className="list-disc list-inside">
                  {servers.map((episode, index) => (
                    <li
                      key={index+1}
                      className={`text-gray-900 ${selected.link === episode.videoLinks[0].link ? "text-yellow-400":""} hover:text-blue-400 cursor-pointer font-bold transition-colors duration-200`}
                      onClick={() => {
                        setSelected(episode.videoLinks[0]);
                        setepisodeNum(episode.title - 1);
                      }}
                    >
                      Episode {servers.length - episode.title + 1}
                    </li>
                  ))}
                </ul>
              </div>
              )
            }
      </div>

    </div>
  );
}


export default Body