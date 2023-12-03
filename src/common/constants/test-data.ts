import { TestDataKey } from './enums';
import { TestProperty } from './types';

export class TestData
  implements Record<TestDataKey, (who: 'redis-client' | 'redis-luascript') => TestProperty<object>>
{
  coord(who: 'redis-client' | 'redis-luascript'): TestProperty<object> {
    return {
      key: `coord:${who}`,
      value: { lon: 139.01, lat: 35.02 },
    };
  }

  weather(who: 'redis-client' | 'redis-luascript'): TestProperty<object> {
    return {
      key: `weather:${who}`,
      value: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
          wind: { speed: 5.52, deg: 311 },
          clouds: { all: 0 },
        },
      ],
    };
  }

  stations(who: 'redis-client' | 'redis-luascript'): TestProperty<object> {
    return {
      key: `stations:${who}`,
      value: { base: 'stations', id: 1907296, dt: 1485792967, name: 'Tawarano', cod: 200 },
    };
  }

  sys(who: 'redis-client' | 'redis-luascript'): TestProperty<object> {
    return {
      key: `sys:${who}`,
      value: { message: 0.0025, country: 'JP', sunrise: 1485726240, sunset: 1485763863 },
    };
  }

  main(who: 'redis-client' | 'redis-luascript'): TestProperty<object> {
    return {
      key: `main:${who}`,
      value: {
        temp: 285.514,
        pressure: 1013.75,
        humidity: 100,
        temp_min: 285.514,
        temp_max: 285.514,
        sea_level: 1023.22,
        grnd_level: 1013.75,
      },
    };
  }
}
