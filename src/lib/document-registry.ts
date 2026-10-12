
export type DocumentRecord = {
  reference: string;
  documentName: string;
  issuer: string;
  status: "active" | "revoked";
};

const documentRegistry: DocumentRecord[] = [
  {
    reference: "VT-DOC-1001",
    documentName: "Course Completion Certificate",
    issuer: "VeriTrust Demo Institute",
    status: "active",
  },
  {
    reference: "VT-DOC-1002",
    documentName: "Academic Transcript",
    issuer: "VeriTrust Demo Institute",
    status: "active",
  },
  {
    reference: "VT-DOC-1003",
    documentName: "Internship Certificate",
    issuer: "VeriTrust Demo Institute",
    status: "revoked",
  },
];

export function findDocumentRecord(
  reference: string,
): DocumentRecord | undefined {
  const normalizedReference = reference.trim().toUpperCase();

  return documentRegistry.find(
    (record) => record.reference === normalizedReference,
  );
}