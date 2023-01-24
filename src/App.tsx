// code from:
// https://github.com/visgl/deck.gl/blob/8.8-release/examples/get-started/react/mapbox/package.json

import './App.css';
import { StaticMap, MapContext, NavigationControl } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl/typed';

const LOCATION_DATA = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        scalerank: 2,
        type: 'major',
        name: 'London Heathrow',
        abbrev: 'LHR',
        location: 'parking',
        gps_code: 'EGLL',
        iata_code: 'LHR',
        wikipedia: 'http://en.wikipedia.org/wiki/London_Heathrow_Airport',
        natlscale: 150,
        featureclass: 'Airport',
      },
      geometry: { type: 'Point', coordinates: [-0.453156652063309, 51.47099587999384] },
    },
  ],
};

const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 8,
  bearing: 0,
  pitch: 0,
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const NAV_CONTROL_STYLE = {
  position: 'absolute',
  top: 10,
  left: 10,
};

interface Airport {
  object: { properties: { name: any; abbrev: any } };
}

function App() {
  const onClick = (info: Airport) => {
    if (info.object) {
      // eslint-disable-next-line
      // alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
      console.log('-'.repeat(20), 'info', info);
    }
  };

  const layers = [
    new GeoJsonLayer({
      id: 'airports',
      data: LOCATION_DATA,
      // Styles
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      getPointRadius: (f) => 1,
      getFillColor: [200, 0, 80, 180],
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onClick,
    }),
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      ContextProvider={MapContext.Provider}
    >
      <StaticMap mapStyle={MAP_STYLE} />
      <NavigationControl style={NAV_CONTROL_STYLE} />
    </DeckGL>
  );
}

export default App;
