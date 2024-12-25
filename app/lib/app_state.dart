import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:csv/csv.dart';
import 'package:synchronized/synchronized.dart';

class FFAppState extends ChangeNotifier {
  static FFAppState _instance = FFAppState._internal();

  factory FFAppState() {
    return _instance;
  }

  FFAppState._internal();

  static void reset() {
    _instance = FFAppState._internal();
  }

  Future initializePersistedState() async {
    secureStorage = const FlutterSecureStorage();
    await _safeInitAsync(() async {
      _Location = await secureStorage.getBool('ff_Location') ?? _Location;
    });
    await _safeInitAsync(() async {
      _FavouriteProvider =
          await secureStorage.getStringList('ff_FavouriteProvider') ??
              _FavouriteProvider;
    });
    await _safeInitAsync(() async {
      _FavouritServices =
          await secureStorage.getStringList('ff_FavouritServices') ??
              _FavouritServices;
    });
  }

  void update(VoidCallback callback) {
    callback();
    notifyListeners();
  }

  late FlutterSecureStorage secureStorage;

  bool _Location = false;
  bool get Location => _Location;
  set Location(bool value) {
    _Location = value;
    secureStorage.setBool('ff_Location', value);
  }

  void deleteLocation() {
    secureStorage.delete(key: 'ff_Location');
  }

  List<String> _FavouriteProvider = [];
  List<String> get FavouriteProvider => _FavouriteProvider;
  set FavouriteProvider(List<String> value) {
    _FavouriteProvider = value;
    secureStorage.setStringList('ff_FavouriteProvider', value);
  }

  void deleteFavouriteProvider() {
    secureStorage.delete(key: 'ff_FavouriteProvider');
  }

  void addToFavouriteProvider(String value) {
    FavouriteProvider.add(value);
    secureStorage.setStringList('ff_FavouriteProvider', _FavouriteProvider);
  }

  void removeFromFavouriteProvider(String value) {
    FavouriteProvider.remove(value);
    secureStorage.setStringList('ff_FavouriteProvider', _FavouriteProvider);
  }

  void removeAtIndexFromFavouriteProvider(int index) {
    FavouriteProvider.removeAt(index);
    secureStorage.setStringList('ff_FavouriteProvider', _FavouriteProvider);
  }

  void updateFavouriteProviderAtIndex(
    int index,
    String Function(String) updateFn,
  ) {
    FavouriteProvider[index] = updateFn(_FavouriteProvider[index]);
    secureStorage.setStringList('ff_FavouriteProvider', _FavouriteProvider);
  }

  void insertAtIndexInFavouriteProvider(int index, String value) {
    FavouriteProvider.insert(index, value);
    secureStorage.setStringList('ff_FavouriteProvider', _FavouriteProvider);
  }

  bool _tosAgree = false;
  bool get tosAgree => _tosAgree;
  set tosAgree(bool value) {
    _tosAgree = value;
  }

  List<String> _FavouritServices = [];
  List<String> get FavouritServices => _FavouritServices;
  set FavouritServices(List<String> value) {
    _FavouritServices = value;
    secureStorage.setStringList('ff_FavouritServices', value);
  }

  void deleteFavouritServices() {
    secureStorage.delete(key: 'ff_FavouritServices');
  }

  void addToFavouritServices(String value) {
    FavouritServices.add(value);
    secureStorage.setStringList('ff_FavouritServices', _FavouritServices);
  }

  void removeFromFavouritServices(String value) {
    FavouritServices.remove(value);
    secureStorage.setStringList('ff_FavouritServices', _FavouritServices);
  }

  void removeAtIndexFromFavouritServices(int index) {
    FavouritServices.removeAt(index);
    secureStorage.setStringList('ff_FavouritServices', _FavouritServices);
  }

  void updateFavouritServicesAtIndex(
    int index,
    String Function(String) updateFn,
  ) {
    FavouritServices[index] = updateFn(_FavouritServices[index]);
    secureStorage.setStringList('ff_FavouritServices', _FavouritServices);
  }

  void insertAtIndexInFavouritServices(int index, String value) {
    FavouritServices.insert(index, value);
    secureStorage.setStringList('ff_FavouritServices', _FavouritServices);
  }
}

void _safeInit(Function() initializeField) {
  try {
    initializeField();
  } catch (_) {}
}

Future _safeInitAsync(Function() initializeField) async {
  try {
    await initializeField();
  } catch (_) {}
}

extension FlutterSecureStorageExtensions on FlutterSecureStorage {
  static final _lock = Lock();

  Future<void> writeSync({required String key, String? value}) async =>
      await _lock.synchronized(() async {
        await write(key: key, value: value);
      });

  void remove(String key) => delete(key: key);

  Future<String?> getString(String key) async => await read(key: key);
  Future<void> setString(String key, String value) async =>
      await writeSync(key: key, value: value);

  Future<bool?> getBool(String key) async => (await read(key: key)) == 'true';
  Future<void> setBool(String key, bool value) async =>
      await writeSync(key: key, value: value.toString());

  Future<int?> getInt(String key) async =>
      int.tryParse(await read(key: key) ?? '');
  Future<void> setInt(String key, int value) async =>
      await writeSync(key: key, value: value.toString());

  Future<double?> getDouble(String key) async =>
      double.tryParse(await read(key: key) ?? '');
  Future<void> setDouble(String key, double value) async =>
      await writeSync(key: key, value: value.toString());

  Future<List<String>?> getStringList(String key) async =>
      await read(key: key).then((result) {
        if (result == null || result.isEmpty) {
          return null;
        }
        return const CsvToListConverter()
            .convert(result)
            .first
            .map((e) => e.toString())
            .toList();
      });
  Future<void> setStringList(String key, List<String> value) async =>
      await writeSync(key: key, value: const ListToCsvConverter().convert([value]));
}
