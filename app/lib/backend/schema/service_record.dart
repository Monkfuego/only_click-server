import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import '/flutter_flow/flutter_flow_util.dart';

class ServiceRecord extends FirestoreRecord {
  ServiceRecord._(
    super.reference,
    super.data,
  ) {
    _initializeFields();
  }

  // "name" field.
  String? _name;
  String get name => _name ?? '';
  bool hasName() => _name != null;

  // "description" field.
  String? _description;
  String get description => _description ?? '';
  bool hasDescription() => _description != null;

  // "price" field.
  double? _price;
  double get price => _price ?? 0.0;
  bool hasPrice() => _price != null;

  // "created_at" field.
  DateTime? _createdAt;
  DateTime? get createdAt => _createdAt;
  bool hasCreatedAt() => _createdAt != null;

  // "modified_at" field.
  DateTime? _modifiedAt;
  DateTime? get modifiedAt => _modifiedAt;
  bool hasModifiedAt() => _modifiedAt != null;

  // "quantity" field.
  int? _quantity;
  int get quantity => _quantity ?? 0;
  bool hasQuantity() => _quantity != null;

  // "imagelink" field.
  String? _imagelink;
  String get imagelink => _imagelink ?? '';
  bool hasImagelink() => _imagelink != null;

  // "Recommended" field.
  bool? _recommended;
  bool get recommended => _recommended ?? false;
  bool hasRecommended() => _recommended != null;

  // "serviceproviderr" field.
  DocumentReference? _serviceproviderr;
  DocumentReference? get serviceproviderr => _serviceproviderr;
  bool hasServiceproviderr() => _serviceproviderr != null;

  // "category" field.
  String? _category;
  String get category => _category ?? '';
  bool hasCategory() => _category != null;

  // "location" field.
  List<String>? _location;
  List<String> get location => _location ?? const [];
  bool hasLocation() => _location != null;

  // "FAQ" field.
  List<String>? _faq;
  List<String> get faq => _faq ?? const [];
  bool hasFaq() => _faq != null;

  // "FAQans" field.
  List<String>? _fAQans;
  List<String> get fAQans => _fAQans ?? const [];
  bool hasFAQans() => _fAQans != null;

  // "duration" field.
  String? _duration;
  String get duration => _duration ?? '';
  bool hasDuration() => _duration != null;

  void _initializeFields() {
    _name = snapshotData['name'] as String?;
    _description = snapshotData['description'] as String?;
    _price = castToType<double>(snapshotData['price']);
    _createdAt = snapshotData['created_at'] as DateTime?;
    _modifiedAt = snapshotData['modified_at'] as DateTime?;
    _quantity = castToType<int>(snapshotData['quantity']);
    _imagelink = snapshotData['imagelink'] as String?;
    _recommended = snapshotData['Recommended'] as bool?;
    _serviceproviderr = snapshotData['serviceproviderr'] as DocumentReference?;
    _category = snapshotData['category'] as String?;
    _location = getDataList(snapshotData['location']);
    _faq = getDataList(snapshotData['FAQ']);
    _fAQans = getDataList(snapshotData['FAQans']);
    _duration = snapshotData['duration'] as String?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('Service');

  static Stream<ServiceRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => ServiceRecord.fromSnapshot(s));

  static Future<ServiceRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => ServiceRecord.fromSnapshot(s));

  static ServiceRecord fromSnapshot(DocumentSnapshot snapshot) =>
      ServiceRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static ServiceRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      ServiceRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'ServiceRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is ServiceRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createServiceRecordData({
  String? name,
  String? description,
  double? price,
  DateTime? createdAt,
  DateTime? modifiedAt,
  int? quantity,
  String? imagelink,
  bool? recommended,
  DocumentReference? serviceproviderr,
  String? category,
  String? duration,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'name': name,
      'description': description,
      'price': price,
      'created_at': createdAt,
      'modified_at': modifiedAt,
      'quantity': quantity,
      'imagelink': imagelink,
      'Recommended': recommended,
      'serviceproviderr': serviceproviderr,
      'category': category,
      'duration': duration,
    }.withoutNulls,
  );

  return firestoreData;
}

class ServiceRecordDocumentEquality implements Equality<ServiceRecord> {
  const ServiceRecordDocumentEquality();

  @override
  bool equals(ServiceRecord? e1, ServiceRecord? e2) {
    const listEquality = ListEquality();
    return e1?.name == e2?.name &&
        e1?.description == e2?.description &&
        e1?.price == e2?.price &&
        e1?.createdAt == e2?.createdAt &&
        e1?.modifiedAt == e2?.modifiedAt &&
        e1?.quantity == e2?.quantity &&
        e1?.imagelink == e2?.imagelink &&
        e1?.recommended == e2?.recommended &&
        e1?.serviceproviderr == e2?.serviceproviderr &&
        e1?.category == e2?.category &&
        listEquality.equals(e1?.location, e2?.location) &&
        listEquality.equals(e1?.faq, e2?.faq) &&
        listEquality.equals(e1?.fAQans, e2?.fAQans) &&
        e1?.duration == e2?.duration;
  }

  @override
  int hash(ServiceRecord? e) => const ListEquality().hash([
        e?.name,
        e?.description,
        e?.price,
        e?.createdAt,
        e?.modifiedAt,
        e?.quantity,
        e?.imagelink,
        e?.recommended,
        e?.serviceproviderr,
        e?.category,
        e?.location,
        e?.faq,
        e?.fAQans,
        e?.duration
      ]);

  @override
  bool isValidKey(Object? o) => o is ServiceRecord;
}
