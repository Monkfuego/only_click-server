import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class ServiceproviderRecord extends FirestoreRecord {
  ServiceproviderRecord._(
    super.reference,
    super.data,
  ) {
    _initializeFields();
  }

  // "email" field.
  String? _email;
  String get email => _email ?? '';
  bool hasEmail() => _email != null;

  // "display_name" field.
  String? _displayName;
  String get displayName => _displayName ?? '';
  bool hasDisplayName() => _displayName != null;

  // "photo_url" field.
  String? _photoUrl;
  String get photoUrl => _photoUrl ?? '';
  bool hasPhotoUrl() => _photoUrl != null;

  // "uid" field.
  String? _uid;
  String get uid => _uid ?? '';
  bool hasUid() => _uid != null;

  // "created_time" field.
  DateTime? _createdTime;
  DateTime? get createdTime => _createdTime;
  bool hasCreatedTime() => _createdTime != null;

  // "phone_number" field.
  String? _phoneNumber;
  String get phoneNumber => _phoneNumber ?? '';
  bool hasPhoneNumber() => _phoneNumber != null;

  // "edited_time" field.
  DateTime? _editedTime;
  DateTime? get editedTime => _editedTime;
  bool hasEditedTime() => _editedTime != null;

  // "bio" field.
  String? _bio;
  String get bio => _bio ?? '';
  bool hasBio() => _bio != null;

  // "user_name" field.
  String? _userName;
  String get userName => _userName ?? '';
  bool hasUserName() => _userName != null;

  // "Team" field.
  List<DocumentReference>? _team;
  List<DocumentReference> get team => _team ?? const [];
  bool hasTeam() => _team != null;

  // "services" field.
  List<DocumentReference>? _services;
  List<DocumentReference> get services => _services ?? const [];
  bool hasServices() => _services != null;

  // "Rating" field.
  List<double>? _rating;
  List<double> get rating => _rating ?? const [];
  bool hasRating() => _rating != null;

  // "languages" field.
  List<String>? _languages;
  List<String> get languages => _languages ?? const [];
  bool hasLanguages() => _languages != null;

  // "whyme" field.
  String? _whyme;
  String get whyme => _whyme ?? '';
  bool hasWhyme() => _whyme != null;

  void _initializeFields() {
    _email = snapshotData['email'] as String?;
    _displayName = snapshotData['display_name'] as String?;
    _photoUrl = snapshotData['photo_url'] as String?;
    _uid = snapshotData['uid'] as String?;
    _createdTime = snapshotData['created_time'] as DateTime?;
    _phoneNumber = snapshotData['phone_number'] as String?;
    _editedTime = snapshotData['edited_time'] as DateTime?;
    _bio = snapshotData['bio'] as String?;
    _userName = snapshotData['user_name'] as String?;
    _team = getDataList(snapshotData['Team']);
    _services = getDataList(snapshotData['services']);
    _rating = getDataList(snapshotData['Rating']);
    _languages = getDataList(snapshotData['languages']);
    _whyme = snapshotData['whyme'] as String?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('serviceprovider');

  static Stream<ServiceproviderRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => ServiceproviderRecord.fromSnapshot(s));

  static Future<ServiceproviderRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => ServiceproviderRecord.fromSnapshot(s));

  static ServiceproviderRecord fromSnapshot(DocumentSnapshot snapshot) =>
      ServiceproviderRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static ServiceproviderRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      ServiceproviderRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'ServiceproviderRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is ServiceproviderRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createServiceproviderRecordData({
  String? email,
  String? displayName,
  String? photoUrl,
  String? uid,
  DateTime? createdTime,
  String? phoneNumber,
  DateTime? editedTime,
  String? bio,
  String? userName,
  String? whyme,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'email': email,
      'display_name': displayName,
      'photo_url': photoUrl,
      'uid': uid,
      'created_time': createdTime,
      'phone_number': phoneNumber,
      'edited_time': editedTime,
      'bio': bio,
      'user_name': userName,
      'whyme': whyme,
    }.withoutNulls,
  );

  return firestoreData;
}

class ServiceproviderRecordDocumentEquality
    implements Equality<ServiceproviderRecord> {
  const ServiceproviderRecordDocumentEquality();

  @override
  bool equals(ServiceproviderRecord? e1, ServiceproviderRecord? e2) {
    const listEquality = ListEquality();
    return e1?.email == e2?.email &&
        e1?.displayName == e2?.displayName &&
        e1?.photoUrl == e2?.photoUrl &&
        e1?.uid == e2?.uid &&
        e1?.createdTime == e2?.createdTime &&
        e1?.phoneNumber == e2?.phoneNumber &&
        e1?.editedTime == e2?.editedTime &&
        e1?.bio == e2?.bio &&
        e1?.userName == e2?.userName &&
        listEquality.equals(e1?.team, e2?.team) &&
        listEquality.equals(e1?.services, e2?.services) &&
        listEquality.equals(e1?.rating, e2?.rating) &&
        listEquality.equals(e1?.languages, e2?.languages) &&
        e1?.whyme == e2?.whyme;
  }

  @override
  int hash(ServiceproviderRecord? e) => const ListEquality().hash([
        e?.email,
        e?.displayName,
        e?.photoUrl,
        e?.uid,
        e?.createdTime,
        e?.phoneNumber,
        e?.editedTime,
        e?.bio,
        e?.userName,
        e?.team,
        e?.services,
        e?.rating,
        e?.languages,
        e?.whyme
      ]);

  @override
  bool isValidKey(Object? o) => o is ServiceproviderRecord;
}
