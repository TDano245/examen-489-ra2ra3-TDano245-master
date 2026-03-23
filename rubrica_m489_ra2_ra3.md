---
title: "Rúbrica d'avaluació M489 – RA2 i RA3"
subject: "M489 – Programació de Dispositius Mòbils i Multimèdia"
author: "Victor Naranjo"
date: "2026-03-23"
ra: ["RA2", "RA3"]
nivells:
  - nom: "Expert"
    punts: 3
    rang: "8–10"
  - nom: "Avançat"
    punts: 2
    rang: "5–7"
  - nom: "Aprenent"
    punts: 1
    rang: "1–4"
---

# Rúbrica: M489 – RA2 i RA3 · Dispositius Mòbils i Multimèdia

**Mòdul:** 489 – Programació Multimèdia i Dispositius Mòbils  
**Curs:** 2n DAM · Videojocs  
**Resultats d'Aprenentatge avaluats:** RA2 i RA3  
**Nivells:** Expert (3) · Avançat (2) · Aprenent (1)

---

## RA2 – Desenvolupa aplicacions per dispositius mòbils

### C1 · Estructura del projecte i configuració (RA 2.1, 2.10)

| | **Expert** | **Avançat** | **Aprenent** |
|---|---|---|---|
| **Descripció** | Organitza el projecte en carpetes coherents (`lib/models`, `lib/services`, `lib/view`). Configura correctament el `pubspec.yaml` (dependències, assets) i gestiona els permisos específics de la plataforma (Android `AndroidManifest.xml`) de forma justificada i mínima. | Estructura el projecte de forma acceptable i afegeix les dependències necessàries, però la gestió de permisos és incompleta o sol·licita permisos innecessaris. Els fitxers de configuració funcionen però no segueixen convencions. | No diferencia les carpetes del projecte. El `pubspec.yaml` té errors o dependències incorrectes. No configura o confon els permisos de l'aplicació. |
| **Indicadors clau** | Carpetes ben definides, permisos mínims i justificats, `pubspec.yaml` net i sense conflictes de versions. | Carpetes bàsiques presents, dependències funcionals, permisos presents però no del tot adequats. | Estructura plana o desordenada, errors al `pubspec.yaml`, absència de gestió de permisos. |

---

### C2 · Gestió d'estat i cicle de vida dels Widgets (RA 2.2)

| | **Expert** | **Avançat** | **Aprenent** |
|---|---|---|---|
| **Descripció** | Tria correctament entre `StatelessWidget` i `StatefulWidget` argumentant la decisió. Utilitza `initState` i `dispose` en els moments adequats. Gestiona l'estat asíncron amb `setState` de forma explícita: primera crida amb `_isLoading = true` i segona crida amb les dades o l'error (patró *loading / success / error*). Explica per quin motiu `initState` no pot fer `await` directament (ha de retornar síncronament perquè Flutter pugui cridar `build`) i com s'usa un `Future` guardat a `initState` per delegar l'espera al `FutureBuilder`. | Distingeix `Stateless` de `Stateful` en la majoria de casos i fa servir `initState` i `setState` correctament, però no separa els estats de càrrega i resultat (fa una sola crida a `setState` o gestiona l'error parcialment). Sap que `initState` no pot bloquejar però no sap explicar per quin motiu. | Confon `StatelessWidget` i `StatefulWidget`. Aplica `setState` de forma indiscriminada o no el fa servir quan cal. Desconeix el cicle de vida dels widgets o no entén quan cridar `initState`. |
| **Indicadors clau** | Ús correcte de `initState`, `dispose` i `setState` (patró *isLoading / error / data*), explicació de per quin motiu `initState` no pot fer `await`, `Future` guardat a `initState` i consumit al `FutureBuilder`, widget pare com a propietari de l'estat asíncron, widget fill com a presentació pura (`StatelessWidget`). | `initState` funcional, `setState` usat però sense separar estats de càrrega i resultat, cicle de vida bàsic assolit. | `build` com a punt únic de lògica, absència de `initState`/`dispose`, confusió entre tipus de widget. |

---

### C3 · Comunicació HTTP i asincronia (RA 2.5)

| | **Expert** | **Avançat** | **Aprenent** |
|---|---|---|---|
| **Descripció** | **Ha implementat el codi al repositori** (commit + push): timeout a `getCarsPage` i mètode `getCarsByFilter` funcionals a `car_http_service.dart`. El codi usa `async`/`await` correctament, captura excepcions de xarxa, implementa timeouts i construeix els `queryParams` de forma defensiva (sense afegir paràmetres `null` o buits). | Respon correctament a les preguntes però el codi queda només a l'`.md` (no implementat al repositori), o bé l'implementació al repositori és parcial (falta el timeout o el mètode `getCarsByFilter`). | No utilitza `async`/`await` o ho fa de forma incorrecta. No gestiona errors de xarxa. El codi no compila o no resol el problema plantejat. |
| **Indicadors clau** | Codi implementat i commitat al repositori, `timeout` configurat a `getCarsPage`, `getCarsByFilter` amb `queryParams` defensius, `try-catch` funcional. | Codi correcte a l'`.md` però absent o incomplet al repositori. | Absència de codi funcional, errors de sintaxi, confusió entre síncron i asíncron. |

---

### C4 · Persistència de dades i modelatge (RA 2.6)

| | **Expert** | **Avançat** | **Aprenent** |
|---|---|---|---|
| **Descripció** | **Ha implementat el codi al repositori** (commit + push): el *casting* defensiu del camp `year` (i similars) està aplicat directament a `car_model.dart`. La conversió és tipada i segura (gestiona `String` i `int` sense crash). | Respon correctament a la pregunta però el *casting* segur queda només a l'`.md` (no modificat al repositori), o bé la solució és funcionalment correcta però no gestiona tots els casos límit. | No sap crear o modificar una classe model. La solució faria *crash* amb dades inesperades o no entén el concepte de *null safety*. |
| **Indicadors clau** | Modificació commited a `car_model.dart` amb *casting* defensiu (`int.tryParse` o similar), solució que no fa *crash* amb `"2021"` ni amb `null`. | *Casting* correcte a l'`.md` però absent al repositori, o solució parcial. | Absència de solució o solució que faria *crash*. |

---

### C5 · Proves i validació (RA 2.7)

| | **Expert** | **Avançat** | **Aprenent** |
|---|---|---|---|
| **Descripció** | Justifica amb tres o més motius diferenciats per quin motiu s'usa un JSON simulat en lloc d'una crida real a l'API (aïllament de dependències externes, reproductibilitat, velocitat d'execució). | Dóna una justificació parcial: sap que el JSON mock és millor però no articula els motius concrets, o n'enumera un de sol. | No sap per quin motiu s'usa un JSON simulat o confon test unitari amb test d'integració. |
| **Indicadors clau** | Tres arguments clars: aïllament (no depèn del servidor), reproductibilitat (dades sempre iguals), velocitat (execució instantània sense xarxa). | Un o dos arguments correctes però poc desenvolupats. | Absència de resposta o resposta incorrecta. |

---

## RA3 – Desenvolupa programes que integren continguts multimèdia

### C6 · Implementació de `CarDetailPage` (RA 3.2, 3.6, 3.7)

| | **Expert** | **Avançat** | **Aprenent** |
|---|---|---|---|
| **Descripció** | **Ha implementat el codi al repositori** (commit + push): `CarDetailPage` completa i funcional a `lib/cars/views/`, amb icona condicional (`Icons.directions_car` per a SUV, `Icons.car_rental` per a la resta) i `SnackBar` amb el missatge correcte. | `CarDetailPage` implementada correctament a l'`.md` però absent o incompleta al repositori (manca la icona condicional o el `SnackBar`). | El codi de `CarDetailPage` és incorrecte, no compila o no s'ha intentat. |
| **Indicadors clau** | `CarDetailPage` commited al repositori: icona condicional basada en `type`, `ElevatedButton` que mostra el `SnackBar` amb `make` i `model`. | Implementació correcta a l'`.md` però absent o incompleta al repositori. | Absència d'implementació o codi que no compila. |

---

### C7 · Ampliació: `FutureBuilder` amb dades remotes (RA 3.6, 3.7)

| | **Expert** | **Avançat** | **Aprenent** |
|---|---|---|---|
| **Descripció** | **Ha implementat l'ampliació al repositori** (commit + push): `FutureBuilder` que crida `CarHttpService().getCarsPage(1, 5)` i gestiona correctament els tres estats: `CircularProgressIndicator` mentre espera, `ListView.builder` amb el `make` de cada cotxe quan arriben les dades, i `Text` en color vermell amb el missatge d'error si falla. | Ha escrit l'ampliació correctament a l'`.md` o l'ha implementat parcialment al repositori (p.ex. manca la gestió de l'error o el `ListView.builder` és incorrecte). | No ha intentat l'ampliació o el codi no usa `FutureBuilder` de forma reconeixible. |
| **Indicadors clau** | `FutureBuilder` commitat al repositori, tres estats gestionats (`CircularProgressIndicator`, `ListView.builder`, `Text` vermell amb l'error), crida correcta a `getCarsPage(1, 5)`. | Codi a l'`.md` o implementació parcial al repositori; un o dos estats gestionats. | Absència d'ampliació o codi fonamentalment incorrecte. |

---

### C8 · Qualitat del codi i seguretat (RA 2.9, 3.8)

| | **Expert** | **Avançat** | **Aprenent** |
|---|---|---|---|
| **Descripció** | El codi és net, llegible i segueix les convencions de Dart (noms en `camelCase`, classes en `PascalCase`). Les claus API i dades sensibles estan fora del codi (fitxer `.env` o `dart-define`), el `.gitignore` les exclou correctament. Hi ha comentaris on la lògica no s'explica per si sola. | El codi és llegible i segueix la majoria de convencions. Les claus API estan hardcoded però el candidat sap que és un problema i enumera on hauria de guardar-les. La documentació és mínima. | El codi és difícil de llegir, les variables no tenen noms descriptius, les claus API estan exposades en el repositori sense cap consideració de seguretat. |
| **Indicadors clau** | `.env`/`dart-define`, `.gitignore` correcte, noms descriptius, comentaris útils, refactorització del codi duplicat. | Convencions de noms, coneixement del problema de seguretat, codi funcional i llegible. | Noms com `a`, `b`, `temp`, claus API visibles al repositori, codi sense estructura. |

---

## Taula de puntuació global

| Criteri | Pes | Expert (3) | Avançat (2) | Aprenent (1) |
|---------|-----|:---------:|:-----------:|:-----------:|
| C1 – Estructura i configuració (RA 2.1, 2.10) | 10% | 3 | 2 | 1 |
| C2 – Estat i cicle de vida (RA 2.2) | 20% | 3 | 2 | 1 |
| C3 – Comunicació HTTP i asincronia (RA 2.5) | 20% | 3 | 2 | 1 |
| C4 – Persistència i modelatge (RA 2.6) | 15% | 3 | 2 | 1 |
| C5 – Proves unitàries (RA 2.7) | 10% | 3 | 2 | 1 |
| C6 – `CarDetailPage` base (RA 3.2, 3.6, 3.7) | 10% | 3 | 2 | 1 |
| C7 – Ampliació `FutureBuilder` (RA 3.6, 3.7) | 10% | 3 | 2 | 1 |
| C8 – Qualitat del codi i seguretat (RA 2.9, 3.8) | 5% | 3 | 2 | 1 |

### Fórmula de conversió a nota (0–10)

$$\text{Nota} = \frac{\sum(\text{punts criteri} \times \text{pes criteri})}{\text{puntuació màxima}} \times 10$$

La puntuació mínima per superar l'avaluació és **Avançat (2)** en els criteris C2, C3 i C6.

---

*Rúbrica generada a partir de la conversa de disseny del M489 – Programació de Dispositius Mòbils i Multimèdia (2n DAM Videojocs)*
