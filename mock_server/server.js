const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Allow requests from the Flutter web app (localhost:5000 / any origin in dev)
app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────────────────────────────────────
// Dataset – 40 cars. Fields match CarsModel:
//   id, year, make, model, type, city, color
// ─────────────────────────────────────────────────────────────────────────────
const CARS = [
  { id:  1, year: 2022, make: 'Toyota',    model: 'Corolla',  type: 'Sedan',     city: 'Barcelona', color: 'Blanc'   },
  { id:  2, year: 2021, make: 'Ford',       model: 'Mustang',  type: 'Coupe',     city: 'Madrid',    color: 'Vermell' },
  { id:  3, year: 2023, make: 'BMW',        model: '3 Series', type: 'Sedan',     city: 'Girona',    color: 'Negre'   },
  { id:  4, year: 2020, make: 'Volkswagen', model: 'Golf',     type: 'Hatchback', city: 'Valencia',  color: 'Blau'    },
  { id:  5, year: 2022, make: 'Seat',       model: 'Ibiza',    type: 'Hatchback', city: 'Tarragona', color: 'Vermell' },
  { id:  6, year: 2019, make: 'Renault',    model: 'Clio',     type: 'Hatchback', city: 'Lleida',    color: 'Gris'    },
  { id:  7, year: 2021, make: 'Peugeot',    model: '208',      type: 'Hatchback', city: 'Sevilla',   color: 'Groc'    },
  { id:  8, year: 2023, make: 'Honda',      model: 'Civic',    type: 'Sedan',     city: 'Bilbao',    color: 'Plata'   },
  { id:  9, year: 2022, make: 'Hyundai',    model: 'Tucson',   type: 'SUV',       city: 'Zaragoza',  color: 'Blau'    },
  { id: 10, year: 2021, make: 'Audi',       model: 'A4',       type: 'Sedan',     city: 'Barcelona', color: 'Negre'   },
  { id: 11, year: 2023, make: 'Mercedes',   model: 'C-Class',  type: 'Sedan',     city: 'Madrid',    color: 'Blanc'   },
  { id: 12, year: 2020, make: 'Nissan',     model: 'Qashqai',  type: 'SUV',       city: 'Valencia',  color: 'Gris'    },
  { id: 13, year: 2022, make: 'Toyota',     model: 'RAV4',     type: 'SUV',       city: 'Girona',    color: 'Blanc'   },
  { id: 14, year: 2021, make: 'Ford',       model: 'Kuga',     type: 'SUV',       city: 'Tarragona', color: 'Negre'   },
  { id: 15, year: 2023, make: 'BMW',        model: 'X5',       type: 'SUV',       city: 'Lleida',    color: 'Blau'    },
  { id: 16, year: 2019, make: 'Volkswagen', model: 'Tiguan',   type: 'SUV',       city: 'Sevilla',   color: 'Plata'   },
  { id: 17, year: 2022, make: 'Seat',       model: 'Arona',    type: 'SUV',       city: 'Bilbao',    color: 'Taronja' },
  { id: 18, year: 2021, make: 'Renault',    model: 'Captur',   type: 'SUV',       city: 'Zaragoza',  color: 'Vermell' },
  { id: 19, year: 2020, make: 'Peugeot',    model: '3008',     type: 'SUV',       city: 'Barcelona', color: 'Gris'    },
  { id: 20, year: 2023, make: 'Honda',      model: 'HR-V',     type: 'SUV',       city: 'Madrid',    color: 'Blanc'   },
  { id: 21, year: 2022, make: 'Kia',        model: 'Sportage', type: 'SUV',       city: 'Valencia',  color: 'Negre'   },
  { id: 22, year: 2021, make: 'Mazda',      model: 'CX-5',     type: 'SUV',       city: 'Girona',    color: 'Vermell' },
  { id: 23, year: 2023, make: 'Tesla',      model: 'Model 3',  type: 'Sedan',     city: 'Barcelona', color: 'Blanc'   },
  { id: 24, year: 2020, make: 'Skoda',      model: 'Octavia',  type: 'Sedan',     city: 'Madrid',    color: 'Blau'    },
  { id: 25, year: 2022, make: 'Opel',       model: 'Astra',    type: 'Hatchback', city: 'Tarragona', color: 'Gris'    },
  { id: 26, year: 2021, make: 'Fiat',       model: '500',      type: 'Hatchback', city: 'Lleida',    color: 'Vermell' },
  { id: 27, year: 2023, make: 'Mini',       model: 'Cooper',   type: 'Hatchback', city: 'Sevilla',   color: 'Blau'    },
  { id: 28, year: 2019, make: 'Dacia',      model: 'Duster',   type: 'SUV',       city: 'Bilbao',    color: 'Taronja' },
  { id: 29, year: 2022, make: 'Volvo',      model: 'XC60',     type: 'SUV',       city: 'Zaragoza',  color: 'Blanc'   },
  { id: 30, year: 2021, make: 'Jeep',       model: 'Compass',  type: 'SUV',       city: 'Barcelona', color: 'Negre'   },
  { id: 31, year: 2023, make: 'Ford',       model: 'Focus',    type: 'Hatchback', city: 'Madrid',    color: 'Gris'    },
  { id: 32, year: 2020, make: 'Toyota',     model: 'Yaris',    type: 'Hatchback', city: 'Valencia',  color: 'Groc'    },
  { id: 33, year: 2022, make: 'Audi',       model: 'Q5',       type: 'SUV',       city: 'Girona',    color: 'Plata'   },
  { id: 34, year: 2021, make: 'Mercedes',   model: 'GLC',      type: 'SUV',       city: 'Tarragona', color: 'Negre'   },
  { id: 35, year: 2023, make: 'BMW',        model: 'X3',       type: 'SUV',       city: 'Lleida',    color: 'Blau'    },
  { id: 36, year: 2019, make: 'Seat',       model: 'Ateca',    type: 'SUV',       city: 'Sevilla',   color: 'Vermell' },
  { id: 37, year: 2022, make: 'Hyundai',    model: 'Kona',     type: 'SUV',       city: 'Bilbao',    color: 'Blau'    },
  { id: 38, year: 2021, make: 'Kia',        model: 'Niro',     type: 'Hatchback', city: 'Zaragoza',  color: 'Blanc'   },
  { id: 39, year: 2023, make: 'Volkswagen', model: 'Polo',     type: 'Hatchback', city: 'Barcelona', color: 'Gris'    },
  { id: 40, year: 2020, make: 'Renault',    model: 'Megane',   type: 'Sedan',     city: 'Madrid',    color: 'Negre'   },
];

// GET /v1/cars?limit=10&offset=0
// Emulates cars-by-api-ninjas.p.rapidapi.com/v1/cars
app.get('/v1/cars', (req, res) => {
  const limit  = Math.max(1, parseInt(req.query.limit  ?? '10', 10));
  const offset = Math.max(0, parseInt(req.query.offset ?? '0',  10));
  res.json(CARS.slice(offset, offset + limit));
});

// GET /v1/cars/search?make=Toyota&model=Corolla
// Filtra per make i/o model (coincidència parcial, insensible a majúscules)
app.get('/v1/cars/search', (req, res) => {
  const makeFilter  = (req.query.make  ?? '').toLowerCase();
  const modelFilter = (req.query.model ?? '').toLowerCase();

  const results = CARS.filter(car => {
    const makeMatch  = !makeFilter  || car.make.toLowerCase().includes(makeFilter);
    const modelMatch = !modelFilter || car.model.toLowerCase().includes(modelFilter);
    return makeMatch && modelMatch;
  });

  res.json(results);
});

// Health check
app.get('/health', (_req, res) =>
  res.json({ status: 'ok', total: CARS.length })
);

app.listen(PORT, () => {
  console.log(`Cars mock server running → http://localhost:${PORT}`);
  console.log(`  GET /v1/cars?limit=10&offset=0`);
  console.log(`  GET /v1/cars/search?make=Toyota&model=Corolla`);
  console.log(`  GET /health`);
});
