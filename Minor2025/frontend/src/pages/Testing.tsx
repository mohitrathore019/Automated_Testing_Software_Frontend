import React, { useState } from 'react';
import { Upload, Timer, Activity, Download, AlertCircle } from 'lucide-react';
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from 'framer-motion';

export default function Testing() {
  const [code, setCode] = useState("// Write or paste your code here\nfunction example() {\n  const data = process();\n  return analyzeData();\n}");
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);
        setIsUploading(false);
      };
      reader.readAsText(file);
    }
  };

  const handleTestSelection = (testType: string) => {
    setSelectedTest(testType);
    setShowResults(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container py-4"
    >
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card bg-dark border-secondary">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="card-title mb-0">Code Editor</h3>
              <label className="btn btn-outline-light d-flex align-items-center gap-2">
                <Upload size={16} />
                Upload File
                <input
                  type="file"
                  className="d-none"
                  accept=".js,.ts,.jsx,.tsx"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            <div className="card-body p-0" style={{ height: '600px' }}>
              <Editor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  padding: { top: 16, bottom: 16 },
                }}
                loading={
                  <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <motion.div 
            className="card bg-dark border-secondary mb-4"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card-header">
              <h3 className="card-title mb-0">Test Type</h3>
            </div>
            <div className="card-body">
              {['Unit Testing', 'Integration', 'Performance'].map((type) => (
                <motion.button
                  key={type}
                  onClick={() => handleTestSelection(type)}
                  className={`btn btn-lg w-100 mb-3 ${
                    selectedTest === type ? 'btn-primary' : 'btn-outline-secondary'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="d-flex align-items-center gap-2">
                    {type === 'Unit Testing' && <Timer size={20} />}
                    {type === 'Integration' && <Activity size={20} />}
                    {type === 'Performance' && <AlertCircle size={20} />}
                    {type}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence>
            {showResults && (
              <motion.div
                className="card bg-dark border-secondary"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h3 className="card-title mb-0">Results</h3>
                  <span className="text-muted small">Last run: 2 mins ago</span>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center gap-2 text-success mb-3">
                    <div className="rounded-circle bg-success" style={{ width: 8, height: 8 }}></div>
                    All tests passed
                  </div>
                  <div className="d-flex align-items-center gap-2 text-warning mb-4">
                    <Activity size={16} />
                    Performance score: 95/100
                  </div>
                  <motion.button
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download size={16} />
                    Download Report
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}