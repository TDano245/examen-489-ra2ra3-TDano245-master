# EXAMEN · MÒDUL 489

## Programació de Dispositius Mòbils i Multimèdia

**Unitats Formatives:** RA2 i RA3  
**Curs:** 2n DAM · Videojocs  
**Data:** 23/03/2026  
**Durada:** 2 hores  

**Alumne/a:** Dani Nieto Cruz  
**Grup:** 2n DAM  

---

## Posada en marxa de l'entorn

Consulta el fitxer **`README.md`** del projecte per a les instruccions completes d'instal·lació i arrencada (Node.js, servidor mock i Flutter).

---

> **Instruccions generals**
>
> - Respon cada pregunta en l'espai indicat (substitueix el text `[Escriu la teva resposta aquí]`).
> - Per a la part de codi, escriu directament en bloc `dart`. No és necessari que el codi compili, però ha de reflectir coneixement real de Flutter/Dart.
> - Tens el codi dels projectes **Cars** i **Phone** com a referència en el teu ordinador. **No pots accedir a internet** durant l'examen.
> - Desa el fitxer i lliura'l amb el nom: `EXAMEN_M489_[el_teu_nom].md`
> - Fes commit i push del .md modificat i de tots els arxius que hagis modificat

---

## BLOC 1 · ARQUITECTURA I CICLE DE VIDA *(RA 2)*

### Pregunta 1.1 – Comunicació entre Widgets *(12 punts)*

Al projecte **Cars**, el widget `CarsPage` gestiona el número de pàgina actual (`_currentPage`) i el passa a `CarsList1`. El widget `ButtonPanel` conté els botons "Anterior" i "Següent".

**a)** A `cars_page.dart`, el widget utilitza el mètode `setState` per gestionar la paginació. Explica:

- Quina és la funció de `setState` i per què cridar-lo fa que la UI es torni a dibuixar.
- Per quin motiu `_loadPage()` fa servir dos crides a `setState` separades (una a l'inici i una al final) en lloc d'una sola.

**Resposta:**

```
"setState" és un mètode que s’utilitza en widgets Stateful per indicar a Flutter que l’estat intern ha canviat. Quan es crida, Flutter torna a executar el mètode build() i redibuixa la interfície amb les noves dades.

Això funciona perquè Flutter segueix un model reactiu: la UI depèn de l’estat, i quan aquest canvia, la UI s’actualitza automàticament.

El mètode _loadPage() utilitza dues crides a setState perquè en el primer moment s’indica que l’aplicació està carregant (per exemple, posant un flag de loading a true), i això permet mostrar un indicador visual com un CircularProgressIndicator.

Després, quan les dades ja han arribat de l’API, es fa una segona crida a setState per actualitzar la llista de cotxes i eliminar l’estat de càrrega. Això permet millorar l’experiència d’usuari mostrant feedback visual durant la càrrega.
```

---

### Pregunta 1.2 – Cicle de vida d'un widget amb recursos *(13 punts)*

Al projecte **Camera**, el widget `CameraScreen` utilitza un `CameraController` per gestionar la càmera del dispositiu. Aquest controlador ocupa recursos del sistema (càmera, memòria) i cal alliberar-los correctament.

**a)** Quin mètode del cicle de vida de `State` s'usa a `CameraScreen` per alliberar el `CameraController` quan el widget és destruït? Escriu com es fa i explica per quina raó és imprescindible cridar-lo.

**Resposta:**

```
@override
void dispose() {
  _controller.dispose();
  super.dispose();
}
```
El mètode dispose() s’utilitza per alliberar recursos quan el widget es destrueix.

És imprescindible cridar _controller.dispose() perquè el CameraController utilitza recursos del sistema com la càmera i la memòria. Si no es fa, aquests recursos poden quedar bloquejats i altres aplicacions no podran utilitzar la càmera, a més de provocar fuites de memòria.
---

**b)** El `CameraController` s'inicialitza de forma asíncrona a `initState()` i el resultat es guarda a `_initializeControllerFuture`. Respon les preguntes següents:

- Per quin motiu no es pot fer `await` directament a `initState()`?
- Quina millora aporta a l'usuari usar `FutureBuilder` en lloc de bloquejar el fil?
- Com treballen junts `_initializeControllerFuture` i `FutureBuilder`?

**Resposta:**

```
No es pot fer await directament a initState() perquè aquest mètode ha de ser síncron. Flutter necessita executar-lo ràpidament per poder continuar amb el cicle de vida i construir la UI.

El FutureBuilder millora l’experiència d’usuari perquè permet mostrar diferents estats:
- loading (mentre espera)
- dades (quan acaba)
- error (si falla)

Això evita bloquejar la UI i permet que l’aplicació segueixi responent.

_initializeControllerFuture guarda el Future de la inicialització de la càmera. El FutureBuilder utilitza aquest Future per saber quan ha acabat. Quan el Future es completa, el FutureBuilder reconstruiex la UI i mostra el CameraPreview.
```

---

## BLOC 2 · COMUNICACIÓ, PERSISTÈNCIA I PROVES *(RA 2 — 35 punts)*

### Pregunta 2.1 – Consum d'API i robustesa *(18 punts)*

Analitza el mètode `getCarsPage(int page, int limit)` de `car_http_service.dart`.

Què passaria si el servidor de l'API trigués 60 segons a respondre? L'aplicació quedaria bloquejada per a l'usuari? Per què? Escriu com implementaries un *timeout* de 10 segons a la petició HTTP.

**Resposta:**

```dart
// Escriu la modificació al getCarsPage aquí:
Future<List<CarsModel>> getCarsPage(int page, int limit) async {
  final offset = (page - 1) * limit;
  final uri = _buildUri('/v1/cars', {
    'limit': '$limit',
    'offset': '$offset'
  });

  final response = await http
      .get(uri, headers: _headers)
      .timeout(const Duration(seconds: 10)); 

  if (response.statusCode == 200) {
    return CarsModel.listFromJsonString(response.body);
  } else {
    throw Exception('Error ${response.statusCode}: ${response.body}');
  }
}
```
Si el servidor trigués 60 segons, l’aplicació no es bloquejaria completament perquè la petició HTTP és asíncrona, però l’usuari hauria d’esperar molt temps.

Amb timeout, si en 10 segons no hi ha resposta, es llança un error i es pot gestionar (per exemple, mostrant un missatge). Això millora la robustesa de l’aplicació.
---

### Pregunta 2.2 – Models de dades  *(17 punts)*

Analitza el constructor `factory CarsModel.fromMapToCarObject(Map<String, dynamic> json)` de `car_model.dart`.

**a)** Imagina que l'API retorna per error el camp `year` com a `String` en lloc d'`int` (per exemple, `"2021"` en lloc de `2021`). El codi actual fallaria. Escriu com resoldries el problema.

**Resposta:**

```
El problema és que el camp year pot venir com String o int. Per solucionar-ho, es pot convertir de manera segura:

int year;
if (json['year'] is int) {
  year = json['year'];
} else if (json['year'] is String) {
  year = int.tryParse(json['year']) ?? 0;
} else {
  year = 0;
}

D’aquesta manera evitem errors de tipus i fem el codi més robust davant dades incorrectes de l’API.

```

---

**b)** Al fitxer `class_model_test.dart`, el test utilitza un `const jsonString` amb un JSON escrit a mà en lloc de fer una petició real a l'API de RapidAPI. Explica per quin motiu és millor simular el JSON en un test unitari.

**Resposta:**

```
És millor simular el JSON en un test unitari perquè:

- El test no depèn d’internet ni de l’API externa
- Sempre retorna les mateixes dades (reproductible)
- És molt més ràpid
- No consumeix quota de l’API

Això permet validar la lògica del model de manera aïllada i fiable.
```

---

## BLOC 3 · IMPLEMENTACIÓ PRÀCTICA *(RA 3 — 30 punts)*

### Exercici – Widget de detall amb dades remotes

Imagina que volem crear una pantalla de detall per a cada cotxe del projecte Cars. Implementa el mètode `build` d'un widget `StatelessWidget` anomenat `CarDetailPage` que compleixi els requisits següents:

1. Rep un paràmetre `final CarsModel car` al constructor.
2. Mostra el **make** i el **model** del cotxe com a títol destacat (`Text` amb estil gran i negreta).
3. Mostra una **icona diferent** depenent del `type` del cotxe:
   - Si el `type` és `'SUV'`, mostra `Icons.directions_car`.
   - Per qualsevol altre tipus, mostra `Icons.car_rental`.
4. Afegeix un botó `ElevatedButton` que, quan es premi, mostri un `SnackBar` amb el text: `"Cotxe seleccionat: [make] [model]"`.

```dart
// Escriu el teu codi aquí:

class CarDetailPage extends StatelessWidget {
  final CarsModel car;

  const CarDetailPage({super.key, required this.car});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('${car.make} ${car.model}'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [

            // TÍTOL
            Text(
              '${car.make} ${car.model}',
              style: const TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 20),

            // ICONA SEGONS TIPUS
            Icon(
              car.type == 'SUV'
                  ? Icons.directions_car
                  : Icons.car_rental,
              size: 50,
            ),

            const SizedBox(height: 20),

            // BOTÓ
            ElevatedButton(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text(
                      'Cotxe seleccionat: ${car.make} ${car.model}',
                    ),
                  ),
                );
              },
              child: const Text('Seleccionar'),
            ),
          ],
        ),
      ),
    );
  }
}
```

---

**Ampliació (nivell Expert):** Afegeix un `FutureBuilder` que cridi al mètode `CarHttpService().getCarsPage(1, 5)` i mentre espera les dades mostri un `CircularProgressIndicator`. Quan les dades estiguin llestes, mostra un `ListView.builder` amb el `make` de cada cotxe. Si hi hagués un error, mostra un `Text` en color vermell amb el missatge de l'error.

```dart
//Escriu la teva ampliació aquí:
```
FutureBuilder<List<CarsModel>>(
  future: CarHttpService().getCarsPage(1, 5),
  builder: (context, snapshot) {

    if (snapshot.connectionState == ConnectionState.waiting) {
      return const Center(child: CircularProgressIndicator());
    }

    if (snapshot.hasError) {
      return Text(
        'Error: ${snapshot.error}',
        style: const TextStyle(color: Colors.red),
      );
    }

    final cars = snapshot.data!;

    return ListView.builder(
      itemCount: cars.length,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text(cars[index].make),
        );
      },
    );
  },
)
---

## BLOC 4 · EXTENSIÓ DEL SERVEI HTTP *(RA 2 — 10 punts)*

### Exercici 4.1 – Mètode parametritzat a `CarHttpService` *(10 punts)*

El servidor mock local té disponible un  endpoint de cerca:

```
GET http://localhost:8080/v1/cars/search?make=Toyota&model=Corolla
```

- El paràmetre `make` filtra per marca (coincidència parcial, insensible a majúscules).
- El paràmetre `model` filtra per model (coincidència parcial, insensible a majúscules).
- Tots dos paràmetres són opcionals: si no s'envien, retorna tots els cotxes.

Exemples vàlids:

- `/v1/cars/search?make=Toyota` → tots els Toyota
- `/v1/cars/search?model=X5` → tots els cotxes amb "X5" al model
- `/v1/cars/search?make=BMW&model=X` → BMW amb "X" al model

**Implementa** el mètode `getCarsByFilter` a la classe `CarHttpService` existent, seguint el mateix patrons que `getCarsPage`:

```dart
// Afegeix aquest mètode a car_http_service.dart:
```

Requisits:

1. Utilitza el mètode privat `_buildUri(String path, Map<String, String> queryParams)` ja existent.
2. Només afegeix els paràmetres `make` i/o `model` al mapa si el valor no és `null` ni buit (`isEmpty`).
3. Gestiona errors i timeout amb el mateix mecanisme que `getCarsPage`.

**Resposta:**

```dart
// Escriu aquí la teva implementació completa del mètode:

```
Future<List<CarsModel>> getCarsByFilter({
  String? make,
  String? model,
}) async {

  final queryParams = <String, String>{};

  if (make != null && make.isNotEmpty) {
    queryParams['make'] = make;
  }

  if (model != null && model.isNotEmpty) {
    queryParams['model'] = model;
  }

  final uri = _buildUri('/v1/cars/search', queryParams);

  final response = await http
      .get(uri, headers: _headers)
      .timeout(const Duration(seconds: 10));

  if (response.statusCode == 200) {
    return CarsModel.listFromJsonString(response.body);
  } else {
    throw Exception('Error ${response.statusCode}: ${response.body}');
  }
}
---

## Resum de l'examen

| Bloc | RA | Punts màxims |
|------|----|:------------:|
| Bloc 1 – Arquitectura i Cicle de vida | RA 2 | 25 |
| Bloc 2 – Comunicació, Persistència i Proves | RA 2  | 35 |
| Bloc 3 – `CarDetailPage` (base) | RA 3 | 20 |
| Bloc 3 – Ampliació `FutureBuilder`  | RA 3 | 10 |
| Bloc 4 – Extensió del servei HTTP | RA 2 | 10 |
| **TOTAL** | | **100** |

---
