import 'package:flutter/material.dart';

/// Panell amb els botons "Anterior" i "Següent" per a la paginació.
///
/// Utilitza callbacks (funcions passades per paràmetre) per comunicar-se
/// amb el widget pare (CarsPage), seguint el patró "dades cap avall,
/// esdeveniments cap amunt" de Flutter. RA2.2
class ButtonPanel extends StatelessWidget {
  final int currentPage;
  final VoidCallback onPrevious;
  final VoidCallback onNext;

  const ButtonPanel({
    super.key,
    required this.currentPage,
    required this.onPrevious,
    required this.onNext,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        ElevatedButton.icon(
          onPressed: currentPage > 1 ? onPrevious : null,
          icon: const Icon(Icons.arrow_back),
          label: const Text('Anterior'),
        ),
        Text(
          'Pàgina $currentPage',
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        ElevatedButton.icon(
          onPressed: onNext,
          icon: const Icon(Icons.arrow_forward),
          label: const Text('Següent'),
        ),
      ],
    );
  }
}
