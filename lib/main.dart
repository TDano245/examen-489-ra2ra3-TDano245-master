import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'cars/views/cars_page.dart';
import 'camera/views/camera_screen.dart';

late List<CameraDescription> cameras;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  cameras = await availableCameras();
  runApp(const M489App());
}

class M489App extends StatelessWidget {
  const M489App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'M489 Cars i Camera',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const _HomePage(),
    );
  }
}

class _HomePage extends StatefulWidget {
  const _HomePage();

  @override
  State<_HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<_HomePage> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(_selectedIndex == 0 ? 'M489 · Cars' : 'M489 · Camera'),
      ),
      body: _selectedIndex == 0
          ? const CarsPage()
          : CameraScreen(cameras: cameras),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (i) => setState(() => _selectedIndex = i),
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.directions_car),
            label: 'Cars',
          ),
          NavigationDestination(icon: Icon(Icons.camera_alt), label: 'Camera'),
        ],
      ),
    );
  }
}
