import { TestKey, Tester } from './enums';
import { TestProperty } from './types';

export class TestData implements Record<TestKey, (tester: Tester) => TestProperty<object>> {
  coord(tester: Tester): TestProperty<object> {
    return {
      key: `coord:${tester}`,
      value: { lon: 139.01, lat: 35.02 },
    };
  }

  weather(tester: Tester): TestProperty<object> {
    return {
      key: `weather:${tester}`,
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

  stations(tester: Tester): TestProperty<object> {
    return {
      key: `stations:${tester}`,
      value: { base: 'stations', id: 1907296, dt: 1485792967, name: 'Tawarano', cod: 200 },
    };
  }

  sys(tester: Tester): TestProperty<object> {
    return {
      key: `sys:${tester}`,
      value: { message: 0.0025, country: 'JP', sunrise: 1485726240, sunset: 1485763863 },
    };
  }

  main(tester: Tester): TestProperty<object> {
    return {
      key: `main:${tester}`,
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
