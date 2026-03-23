// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter_test/flutter_test.dart';
import 'package:m489_cars_camera/cars/models/car_model.dart';

void main() {
  testWidgets('Smoke test placeholder', (WidgetTester tester) async {
    // L'app requereix càmera i xarxa; testem només el model de dades.
    expect(true, isTrue);
  });

  test('CarsModel.fromMapToCarObject', () {
    final map = {
      'id': 1,
      'year': 2020,
      'make': 'Toyota',
      'model': 'Corolla',
      'type': 'Sedan',
      'city': 'Barcelona',
      'color': 'Blanc',
    };
    final car = CarsModel.fromMapToCarObject(map);
    expect(car.make, 'Toyota');
    expect(car.year, 2020);
    expect(car.color, 'Blanc');
  });
}
