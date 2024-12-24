import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

Future initFirebase() async {
  if (kIsWeb) {
    await Firebase.initializeApp(
        options: const FirebaseOptions(
            apiKey: "lol apna key use kar ",
            authDomain: "onlyclick-10d32.firebaseapp.com",
            projectId: "onlyclick-10d32",
            storageBucket: "onlyclick-10d32.firebasestorage.app",
            messagingSenderId: "788024224936",
            appId: "1:788024224936:web:daf43bae0b65a3e3cd669d",
            measurementId: "G-5JPNDC8FJP"));
  } else {
    await Firebase.initializeApp();
  }
}
