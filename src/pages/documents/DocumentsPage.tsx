import React, { useState, useRef } from 'react';
import { FileText, Upload, Download, PenTool, X, Clock,  FileCode } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import SignatureCanvas from 'react-signature-canvas';

// Initial Mock Data with Status Labels
const initialDocuments = [
  { id: 1, name: 'Investment_Agreement.pdf', size: '2.4 MB', status: 'In Review', date: '2026-01-10', canSign: true },
  { id: 2, name: 'Term_Sheet_Final.pdf', size: '1.1 MB', status: 'Signed', date: '2026-01-12', canSign: false },
  { id: 3, name: 'Startup_Bylaws_Draft.docx', size: '3.8 MB', status: 'Draft', date: '2026-01-08', canSign: false },
];

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const sigCanvas = useRef<any>(null);

  // Function to get Badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Signed': return <Badge className="bg-green-100 text-green-700 border-green-200">Signed</Badge>;
      case 'In Review': return <Badge className="bg-blue-100 text-blue-700 border-blue-200">In Review</Badge>;
      case 'Draft': return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Draft</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const handleSignComplete = () => {
    setDocuments(prev => prev.map(doc => 
      doc.id === selectedDoc.id ? { ...doc, status: 'Signed', canSign: false } : doc
    ));
    setIsSignModalOpen(false);
    alert("Document Signed Successfully!");
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileCode className="text-indigo-600" /> Document Chamber
          </h1>
          <p className="text-gray-600">Securely manage, preview, and sign your legal contracts.</p>
        </div>
        
        <div className="flex gap-3">
          <input type="file" id="file-upload" className="hidden" />
          <label htmlFor="file-upload" className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-700 transition shadow-md text-sm font-medium">
            <Upload size={18} /> Upload PDF
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document List (Left Side) */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader><h2 className="text-lg font-semibold text-gray-800">Recent Contracts</h2></CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-100">
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
                    <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => { setSelectedDoc(doc); setIsPreviewOpen(true); }}>
                      <div className="p-2 bg-indigo-50 rounded-lg">
                        <FileText size={24} className="text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{doc.name}</h4>
                        <p className="text-xs text-gray-500">{doc.size} • {doc.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {getStatusBadge(doc.status)}
                      <div className="flex items-center gap-1">
                        {doc.canSign && (
                          <Button size="sm" onClick={() => { setSelectedDoc(doc); setIsSignModalOpen(true); }} className="bg-amber-500 hover:bg-amber-600 text-white h-8 px-3">
                            <PenTool size={14} className="mr-1" /> Sign
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Download size={16} /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Side: PDF Preview Mockup */}
        <div className="lg:col-span-1">
          <Card className="h-full border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col">
            <CardHeader className="border-b bg-white rounded-t-xl">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Clock size={16} /> Quick Preview
              </h3>
            </CardHeader>
            <CardBody className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              {isPreviewOpen && selectedDoc ? (
                <div className="bg-white p-4 shadow-lg rounded border w-full h-full animate-in slide-in-from-bottom-2">
                  <div className="h-4 w-3/4 bg-gray-100 mb-2 mx-auto"></div>
                  <div className="h-4 w-1/2 bg-gray-50 mb-6 mx-auto"></div>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    PREVIEW OF: {selectedDoc.name}<br/>
                    ------------------------------<br/>
                    This is a generated mockup of the document content. 
                    Legal terms and investment conditions are encrypted for security.
                  </p>
                  <div className="mt-20 border-t pt-2">
                    <p className="text-[8px] uppercase font-bold text-gray-300">Nexus Security Watermark</p>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400">
                  <FileText size={48} className="mx-auto mb-2 opacity-20" />
                  <p className="text-xs">Select a document to preview its content here.</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Signature Modal */}
      {isSignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800 flex items-center gap-2"><PenTool size={18}/> Sign Document</h3>
              <button onClick={() => setIsSignModalOpen(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-xs text-indigo-700">
                You are signing: <b>{selectedDoc?.name}</b>
              </div>
              <div className="border-2 border-gray-200 rounded-xl bg-white shadow-inner">
                <SignatureCanvas ref={sigCanvas} penColor="black" canvasProps={{className: 'w-full h-40 cursor-crosshair'}} />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => sigCanvas.current.clear()}>Clear</Button>
                <Button className="flex-1 bg-indigo-600 text-white" onClick={handleSignComplete}>Confirm & Apply</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};