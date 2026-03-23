import 'package:flutter/material.dart';
import '../models/car_model.dart';
import '../services/car_http_service.dart';
import 'cars_list.dart';
import 'button_panel.dart';

/// Pantalla principal del projecte Cars.
///
/// RA2.2 – Gestió d'estat amb setState:
///   - _currentPage: pàgina actual de paginació.
///   - _cars: llista de cotxes carregada de l'API.
///   - _isLoading: indica si hi ha una petició en curs.
///   - _error: missatge d'error si la petició ha fallat.
///
/// La càrrega de dades s'inicia a initState i a cada canvi de pàgina.
/// setState actualitza la UI quan canvia qualsevol d'aquests camps.
class CarsPage extends StatefulWidget {
  const CarsPage({super.key});

  @override
  State<CarsPage> createState() => _CarsPageState();
}

class _CarsPageState extends State<CarsPage> {
  int _currentPage = 1;
  static const int _itemsPerPage = 5;

  List<CarsModel> _cars = [];
  bool _isLoading = false;
  String? _error;

  final CarHttpService _service = CarHttpService();

  @override
  void initState() {
    super.initState();
    // Es crida una sola vegada en crear el widget: carrega la primera pàgina.
    _loadPage();
  }

  /// Crida l'API i actualitza l'estat amb setState.
  ///
  /// Seqüència:
  /// 1. setState → _isLoading = true  (mostra spinner)
  /// 2. await getCarsPage(...)        (petició asíncrona, no bloqueja la UI)
  /// 3. setState → _cars = resultat   (actualitza la llista)
  Future<void> _loadPage() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });
    try {
      final cars = await _service.getCarsPage(_currentPage, _itemsPerPage);
      setState(() {
        _cars = cars;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  void _goToPreviousPage() {
    if (_currentPage > 1) {
      setState(() => _currentPage--);
      _loadPage();
    }
  }

  void _goToNextPage() {
    setState(() => _currentPage++);
    _loadPage();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // CarsList rep les dades directament: no necessita FutureBuilder
        Expanded(
          child: CarsList(cars: _cars, isLoading: _isLoading, error: _error),
        ),
        const Divider(),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 8.0),
          child: ButtonPanel(
            currentPage: _currentPage,
            onPrevious: _goToPreviousPage,
            onNext: _goToNextPage,
          ),
        ),
      ],
    );
  }
}
