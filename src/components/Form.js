import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import '../assets/css/form.css';

const initialState = {
  loanType: "",
  loanTerm: "",
  loanAmount: "",
  loanTermMonths: "",
  employmentStatus: "",
  sponsorEmail1: "",
  sponsorEmail2: "",
};

export default function Form() {
  const [form, setForm] = useState(initialState);
  const { setFormData, sendFormData, uploadImage } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [contractId, setContractId] = useState(null);
  const [idImage, setIdImage] = useState(null);
  const [idImagePreview, setIdImagePreview] = useState(null);
  const [idImageUrl, setIdImageUrl] = useState(null);
  // Add state for Proof of Address and Proof of Income
  const [addressImage, setAddressImage] = useState(null);
  const [addressImagePreview, setAddressImagePreview] = useState(null);
  const [addressImageUrl, setAddressImageUrl] = useState(null);
  const [incomeImage, setIncomeImage] = useState(null);
  const [incomeImagePreview, setIncomeImagePreview] = useState(null);
  const [incomeImageUrl, setIncomeImageUrl] = useState(null);
  // Add state for dynamic document uploads
  const [admissionLetter, setAdmissionLetter] = useState(null);
  const [admissionLetterPreview, setAdmissionLetterPreview] = useState(null);
  const [admissionLetterUrl, setAdmissionLetterUrl] = useState(null);
  const [feeStructure, setFeeStructure] = useState(null);
  const [feeStructurePreview, setFeeStructurePreview] = useState(null);
  const [feeStructureUrl, setFeeStructureUrl] = useState(null);
  const [diagnosisReports, setDiagnosisReports] = useState(null);
  const [diagnosisReportsPreview, setDiagnosisReportsPreview] = useState(null);
  const [diagnosisReportsUrl, setDiagnosisReportsUrl] = useState(null);
  const [doctorsPrescription, setDoctorsPrescription] = useState(null);
  const [doctorsPrescriptionPreview, setDoctorsPrescriptionPreview] = useState(null);
  const [doctorsPrescriptionUrl, setDoctorsPrescriptionUrl] = useState(null);
  const [medicalQuotation, setMedicalQuotation] = useState(null);
  const [medicalQuotationPreview, setMedicalQuotationPreview] = useState(null);
  const [medicalQuotationUrl, setMedicalQuotationUrl] = useState(null);
  const [businessPlan, setBusinessPlan] = useState(null);
  const [businessPlanPreview, setBusinessPlanPreview] = useState(null);
  const [businessPlanUrl, setBusinessPlanUrl] = useState(null);
  const [projectQuotations, setProjectQuotations] = useState(null);
  const [projectQuotationsPreview, setProjectQuotationsPreview] = useState(null);
  const [projectQuotationsUrl, setProjectQuotationsUrl] = useState(null);
  const [proofOfBusiness, setProofOfBusiness] = useState(null);
  const [proofOfBusinessPreview, setProofOfBusinessPreview] = useState(null);
  const [proofOfBusinessUrl, setProofOfBusinessUrl] = useState(null);
  const [collateralDocs, setCollateralDocs] = useState(null);
  const [collateralDocsPreview, setCollateralDocsPreview] = useState(null);
  const [collateralDocsUrl, setCollateralDocsUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Initialize from query params if coming from a deep link (e.g. pending contracts)
  useEffect(() => {
    // Prefer state passed via navigation
    const navState = (location && location.state) || {};
    const stateStep = navState.step;
    const stateContractId = navState.contractId;
    const stateLoanType = navState.loanType;
    const stateLoanTerm = navState.loanTerm;

    // Also support query params
    const params = new URLSearchParams(location.search || "");
    const stepParam = params.get('step');
    const contractIdParam = params.get('contractId');
    const loanTypeParam = params.get('loanType');
    const loanTermParam = params.get('loanTerm');

    const resolvedContractId = stateContractId || contractIdParam;
    const resolvedStep = String(stateStep || stepParam || '') === '2' ? 2 : null;
    const resolvedLoanType = stateLoanType || loanTypeParam;
    const resolvedLoanTerm = stateLoanTerm || loanTermParam;

    if (resolvedContractId) {
      setContractId(resolvedContractId);
    }
    if (resolvedStep === 2) {
      setStep(2);
    }
    if (resolvedLoanType || resolvedLoanTerm) {
      setForm((prev) => ({
        ...prev,
        loanType: resolvedLoanType || prev.loanType,
        loanTerm: resolvedLoanTerm || prev.loanTerm,
      }));
    }
  }, [location.search, location.state]);

  const handleNext = async (e) => {
    e.preventDefault();
    // Validate text fields only
    if (!form.loanType || !form.loanTerm || !form.loanTermMonths || !form.loanAmount || !form.employmentStatus) {
      setError("Please fill in all fields.");
      return;
    }
    
    // Validate loan term months based on loan term type
    const termMonths = parseInt(form.loanTermMonths);
    if (form.loanTerm === 'short-term' && (termMonths < 6 || termMonths > 12)) {
      setError("Short-term loans must be between 6-12 months.");
      return;
    }
    if (form.loanTerm === 'long-term' && (termMonths < 18 || termMonths > 38)) {
      setError("Long-term loans must be between 18-38 months.");
      return;
    }
    
    setError("");
    // Send text data only
    const textData = { ...form };
    const result = await sendFormData(textData);
    const createdContractId =
      result?.contractId ||
      result?.id ||
      result?._id ||
      result?.contract?.id ||
      result?.contract?._id;
    if (createdContractId) {
      setContractId(createdContractId);
      setStep(2);
    } else {
      setError("Failed to submit application.");
    }
  };

  // Step 2: Image upload handlers (use loanId)
  const handleIdImageChange = async (e) => {
    const file = e.target.files[0];
    setIdImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setIdImagePreview(reader.result);
      reader.readAsDataURL(file);
      if (contractId) {
        const doc = await uploadImage(file, contractId, 'Identity');
        setIdImageUrl(doc ? doc.id : null);
      }
    } else {
      setIdImagePreview(null);
      setIdImageUrl(null);
    }
  };
  // Add handlers for new image fields
  const handleAddressImageChange = async (e) => {
    const file = e.target.files[0];
    setAddressImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAddressImagePreview(reader.result);
      reader.readAsDataURL(file);
      if (contractId) {
        const doc = await uploadImage(file, contractId, 'Proof of Address');
        setAddressImageUrl(doc ? doc.id : null);
      }
    } else {
      setAddressImagePreview(null);
      setAddressImageUrl(null);
    }
  };
  const handleIncomeImageChange = async (e) => {
    const file = e.target.files[0];
    setIncomeImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setIncomeImagePreview(reader.result);
      reader.readAsDataURL(file);
      if (contractId) {
        const doc = await uploadImage(file, contractId, 'Proof of Income');
        setIncomeImageUrl(doc ? doc.id : null);
      }
    } else {
      setIncomeImagePreview(null);
      setIncomeImageUrl(null);
    }
  };

  // Generic handler for file and preview and upload
  const handleFileChange = (setter, previewSetter, urlSetter, documentName) => async (e) => {
    const file = e.target.files[0];
    setter(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewSetter(reader.result);
      };
      reader.readAsDataURL(file);
        if (contractId) {
        const doc = await uploadImage(file, contractId, documentName);
        urlSetter(doc ? doc.id : null);
      }
    } else {
      previewSetter(null);
      urlSetter(null);
    }
  };

  const handleSubmitImages = async (e) => {
    e.preventDefault();
    // Validate required images
    if (!idImageUrl) {
      setError("Please upload your ID image.");
      return;
    }
    if (!addressImageUrl) {
      setError("Please upload your Proof of Address.");
      return;
    }
    if (!incomeImageUrl) {
      setError("Please upload your Proof of Income.");
      return;
    }
    // Validate variable fields based on loan type and term
    if (form.loanType === 'Educational Loan') {
      if (!admissionLetterUrl) {
        setError("Please upload your Admission Letter.");
        return;
      }
      if (!feeStructureUrl) {
        setError("Please upload your Official Fee Structure.");
        return;
      }
    }
    if (form.loanType === 'Medical Loan') {
      if (!diagnosisReportsUrl) {
        setError("Please upload your Diagnosis Reports.");
        return;
      }
      if (!doctorsPrescriptionUrl) {
        setError("Please upload your Doctor's Prescription.");
        return;
      }
      if (!medicalQuotationUrl) {
        setError("Please upload your Detailed Quotation.");
        return;
      }
    }
    if (form.loanType === 'Micro Projects Loan') {
      if (!businessPlanUrl) {
        setError("Please upload your Business Plan.");
        return;
      }
      if (!projectQuotationsUrl) {
        setError("Please upload your Project Quotations.");
        return;
      }
      if (!proofOfBusinessUrl) {
        setError("Please upload your Proof of Existing Business.");
        return;
      }
    }
    if (form.loanTerm === 'long-term' && !collateralDocsUrl) {
      setError("Please upload your Collateral Documents.");
      return;
    }
    // All uploads already done in handlers, so just check URLs
    navigate("/UserDashboard");
  };

  return (
    <div className="form-container">
      {/* Subtle Background Pattern */}
      <div className="background-pattern"></div>
      
      {/* Geometric Shapes */}
      <div className="geometric-shapes">
        <div className="shape"><i className="fas fa-file-contract"></i></div>
        <div className="shape"><i className="fas fa-handshake"></i></div>
        <div className="shape"><i className="fas fa-chart-line"></i></div>
        <div className="shape"><i className="fas fa-coins"></i></div>
        <div className="shape"><i className="fas fa-piggy-bank"></i></div>
      </div>
      
      {/* Form Card */}
      <div className="form-card">
        <div className="form-header">
          <h1 className="form-title">
            <i className="fas fa-file-alt financial-icon"></i>
            Loan Application
          </h1>
          <p className="form-subtitle">
            Complete your <span className="brand-accent">loan application</span> and start your financial journey
          </p>
        </div>

        {/* Step Indicator */}
        <div className="step-indicator">
          <div className={`step ${step >= 1 ? 'active' : 'pending'}`}>
            <i className="fas fa-info-circle"></i>
            Basic Information
          </div>
          <div className={`step ${step >= 2 ? 'active' : 'pending'}`}>
            <i className="fas fa-upload"></i>
            Document Upload
          </div>
        </div>

        {step === 1 && (
          <form onSubmit={handleNext}>
            <div className="form-group">
              <label className="form-label">Loan Type</label>
              <div className="loan-type-container">
                <button
                  type="button"
                  className={`loan-type-btn${form.loanType === 'Medical Loan' ? ' active' : ''}`}
                  onClick={() => setForm((prev) => ({ ...prev, loanType: 'Medical Loan' }))}
                >
                  <i className="fas fa-notes-medical"></i> Medical Loan
                </button>
                <button
                  type="button"
                  className={`loan-type-btn${form.loanType === 'Educational Loan' ? ' active' : ''}`}
                  onClick={() => setForm((prev) => ({ ...prev, loanType: 'Educational Loan' }))}
                >
                  <i className="fas fa-graduation-cap"></i> Educational Loan
                </button>
                <button
                  type="button"
                  className={`loan-type-btn${form.loanType === 'Micro Projects Loan' ? ' active' : ''}`}
                  onClick={() => setForm((prev) => ({ ...prev, loanType: 'Micro Projects Loan' }))}
                >
                  <i className="fas fa-lightbulb"></i> Micro Projects Loan
                </button>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Loan Term</label>
                <select
                  className="form-select"
                  name="loanTerm"
                  value={form.loanTerm}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="short-term">Short Term (6-12 months)</option>
                  <option value="long-term">Long Term (18-38 months)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Loan Term Months</label>
                <input 
                  type="number" 
                  className={`form-input ${form.loanTerm && form.loanTermMonths ? 
                    (form.loanTerm === 'short-term' && (parseInt(form.loanTermMonths) < 6 || parseInt(form.loanTermMonths) > 12)) ||
                    (form.loanTerm === 'long-term' && (parseInt(form.loanTermMonths) < 18 || parseInt(form.loanTermMonths) > 38))
                      ? 'is-invalid' : 'is-valid' : ''}`}
                  name="loanTermMonths" 
                  value={form.loanTermMonths} 
                  onChange={handleChange} 
                  placeholder={form.loanTerm === 'short-term' ? "6-12 months" : form.loanTerm === 'long-term' ? "18-38 months" : "Enter months"} 
                  min={form.loanTerm === 'short-term' ? 6 : form.loanTerm === 'long-term' ? 18 : 1}
                  max={form.loanTerm === 'short-term' ? 12 : form.loanTerm === 'long-term' ? 38 : 100}
                />
                {form.loanTerm && (
                  <div className="form-help-text" style={{ 
                    fontSize: "0.85rem", 
                    color: form.loanTermMonths && (
                      (form.loanTerm === 'short-term' && (parseInt(form.loanTermMonths) < 6 || parseInt(form.loanTermMonths) > 12)) ||
                      (form.loanTerm === 'long-term' && (parseInt(form.loanTermMonths) < 18 || parseInt(form.loanTermMonths) > 38))
                    ) ? "#dc3545" : "#6c757d", 
                    marginTop: "0.25rem",
                    fontStyle: "italic"
                  }}>
                    <i className={`fas ${form.loanTermMonths && (
                      (form.loanTerm === 'short-term' && (parseInt(form.loanTermMonths) < 6 || parseInt(form.loanTermMonths) > 12)) ||
                      (form.loanTerm === 'long-term' && (parseInt(form.loanTermMonths) < 18 || parseInt(form.loanTermMonths) > 38))
                    ) ? "fa-exclamation-triangle" : "fa-info-circle"} me-1`}></i>
                    {form.loanTermMonths && (
                      (form.loanTerm === 'short-term' && (parseInt(form.loanTermMonths) < 6 || parseInt(form.loanTermMonths) > 12)) ||
                      (form.loanTerm === 'long-term' && (parseInt(form.loanTermMonths) < 18 || parseInt(form.loanTermMonths) > 38))
                    ) ? (
                      form.loanTerm === 'short-term' 
                        ? "Invalid: Must be between 6-12 months" 
                        : "Invalid: Must be between 18-38 months"
                    ) : (
                      form.loanTerm === 'short-term' 
                        ? "Valid range: 6-12 months" 
                        : form.loanTerm === 'long-term' 
                          ? "Valid range: 18-38 months" 
                          : "Please select a loan term first"
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Loan Amount ($)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  name="loanAmount" 
                  value={form.loanAmount} 
                  onChange={handleChange} 
                  placeholder="e.g. 10000" 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Current Employment Status</label>
                <select 
                  className="form-select" 
                  name="employmentStatus" 
                  value={form.employmentStatus} 
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="Employed">Employed</option>
                  <option value="Self-Employed">Self-Employed</option>
                  <option value="Unemployed">Unemployed</option>
                  <option value="Student">Student</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Sponsor 1 Email</label>
                <input
                  type="email"
                  className="form-input"
                  name="sponsorEmail1"
                  value={form.sponsorEmail1}
                  onChange={handleChange}
                  placeholder="Enter Sponsor 1 Email"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Sponsor 2 Email</label>
                <input
                  type="email"
                  className="form-input"
                  name="sponsorEmail2"
                  value={form.sponsorEmail2}
                  onChange={handleChange}
                  placeholder="Enter Sponsor 2 Email"
                />
              </div>
            </div>

            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-triangle"></i>
                {error}
              </div>
            )}

            <button type="submit" className="submit-button">
              <i className="fas fa-arrow-right"></i>
              Next Step
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmitImages}>
            <div className="form-group">
              <label className="form-label">Upload ID Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleIdImageChange}
              />
              {idImagePreview && (
                <div className="image-preview">
                  <img
                    src={idImagePreview}
                    alt="ID Preview"
                  />
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Upload Proof of Address</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleAddressImageChange}
              />
              {addressImagePreview && (
                <div className="image-preview">
                  <img
                    src={addressImagePreview}
                    alt="Proof of Address Preview"
                  />
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Upload Proof of Income</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleIncomeImageChange}
              />
              {incomeImagePreview && (
                <div className="image-preview">
                  <img
                    src={incomeImagePreview}
                    alt="Proof of Income Preview"
                  />
                </div>
              )}
            </div>

            {/* Dynamic Document Uploads */}
            {form.loanType === 'Educational Loan' && form.loanTerm === 'short-term' && (
              <>
                <div className="form-group">
                  <label className="form-label">Admission Letter</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="image/*" 
                    onChange={handleFileChange(setAdmissionLetter, setAdmissionLetterPreview, setAdmissionLetterUrl, 'Admission Letter')} 
                  />
                  {admissionLetterPreview && (
                    <div className="image-preview">
                      <img src={admissionLetterPreview} alt="Admission Letter Preview" />
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Official Fee Structure</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="image/*" 
                    onChange={handleFileChange(setFeeStructure, setFeeStructurePreview, setFeeStructureUrl, 'Official Fee Structure')} 
                  />
                  {feeStructurePreview && (
                    <div className="image-preview">
                      <img src={feeStructurePreview} alt="Fee Structure Preview" />
                    </div>
                  )}
                </div>
              </>
            )}

            {form.loanType === 'Medical Loan' && form.loanTerm === 'short-term' && (
              <>
                <div className="form-group">
                  <label className="form-label">Diagnosis Reports</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="image/*" 
                    onChange={handleFileChange(setDiagnosisReports, setDiagnosisReportsPreview, setDiagnosisReportsUrl, 'Diagnosis Reports')} 
                  />
                  {diagnosisReportsPreview && (
                    <div className="image-preview">
                      <img src={diagnosisReportsPreview} alt="Diagnosis Reports Preview" />
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Doctor's Prescription</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="image/*" 
                    onChange={handleFileChange(setDoctorsPrescription, setDoctorsPrescriptionPreview, setDoctorsPrescriptionUrl, "Doctor's Prescription")} 
                  />
                  {doctorsPrescriptionPreview && (
                    <div className="image-preview">
                      <img src={doctorsPrescriptionPreview} alt="Doctor's Prescription Preview" />
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Detailed Quotation</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="image/*" 
                    onChange={handleFileChange(setMedicalQuotation, setMedicalQuotationPreview, setMedicalQuotationUrl, 'Detailed Quotation')} 
                  />
                  {medicalQuotationPreview && (
                    <div className="image-preview">
                      <img src={medicalQuotationPreview} alt="Detailed Quotation Preview" />
                    </div>
                  )}
                </div>
              </>
            )}

            {form.loanType === 'Micro Projects Loan' && form.loanTerm === 'short-term' && (
              <>
                <div className="form-group">
                  <label className="form-label">Business Plan</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="image/*" 
                    onChange={handleFileChange(setBusinessPlan, setBusinessPlanPreview, setBusinessPlanUrl, 'Business Plan')} 
                  />
                  {businessPlanPreview && (
                    <div className="image-preview">
                      <img src={businessPlanPreview} alt="Business Plan Preview" />
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Quotations</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="image/*,.pdf" 
                    onChange={handleFileChange(setProjectQuotations, setProjectQuotationsPreview, setProjectQuotationsUrl, 'Quotations')} 
                  />
                  {projectQuotationsPreview && (
                    <div className="image-preview">
                      <img src={projectQuotationsPreview} alt="Quotations Preview" />
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Proof of Existing Business</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="image/*" 
                    onChange={handleFileChange(setProofOfBusiness, setProofOfBusinessPreview, setProofOfBusinessUrl, 'Proof of Existing Business')} 
                  />
                  {proofOfBusinessPreview && (
                    <div className="image-preview">
                      <img src={proofOfBusinessPreview} alt="Proof of Existing Business Preview" />
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Long Term: all fields for selected loanType plus Collateral Documents */}
            {form.loanTerm === 'long-term' && (
              <>
                {form.loanType === 'Educational Loan' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Admission Letter</label>
                      <input 
                        type="file" 
                        className="form-control" 
                        accept="image/*" 
                        onChange={handleFileChange(setAdmissionLetter, setAdmissionLetterPreview, setAdmissionLetterUrl, 'Admission Letter')} 
                      />
                      {admissionLetterPreview && (
                        <div className="image-preview">
                          <img src={admissionLetterPreview} alt="Admission Letter Preview" />
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Official Fee Structure</label>
                      <input 
                        type="file" 
                        className="form-control" 
                        accept="image/*" 
                        onChange={handleFileChange(setFeeStructure, setFeeStructurePreview, setFeeStructureUrl, 'Official Fee Structure')} 
                      />
                      {feeStructurePreview && (
                        <div className="image-preview">
                          <img src={feeStructurePreview} alt="Fee Structure Preview" />
                        </div>
                      )}
                    </div>
                  </>
                )}

                {form.loanType === 'Medical Loan' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Diagnosis Reports</label>
                      <input 
                        type="file" 
                        className="form-control" 
                        accept="image/*" 
                        onChange={handleFileChange(setDiagnosisReports, setDiagnosisReportsPreview, setDiagnosisReportsUrl, 'Diagnosis Reports')} 
                      />
                      {diagnosisReportsPreview && (
                        <div className="image-preview">
                          <img src={diagnosisReportsPreview} alt="Diagnosis Reports Preview" />
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Doctor's Prescription</label>
                      <input 
                        type="file" 
                        className="form-control" 
                        accept="image/*" 
                        onChange={handleFileChange(setDoctorsPrescription, setDoctorsPrescriptionPreview, setDoctorsPrescriptionUrl, "Doctor's Prescription")} 
                      />
                      {doctorsPrescriptionPreview && (
                        <div className="image-preview">
                          <img src={doctorsPrescriptionPreview} alt="Doctor's Prescription Preview" />
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Detailed Quotation</label>
                      <input 
                        type="file" 
                        className="form-control" 
                        accept="image/*" 
                        onChange={handleFileChange(setMedicalQuotation, setMedicalQuotationPreview, setMedicalQuotationUrl, 'Detailed Quotation')} 
                      />
                      {medicalQuotationPreview && (
                        <div className="image-preview">
                          <img src={medicalQuotationPreview} alt="Detailed Quotation Preview" />
                        </div>
                      )}
                    </div>
                  </>
                )}

                {form.loanType === 'Micro Projects Loan' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Business Plan</label>
                      <input 
                        type="file" 
                        className="form-control" 
                        accept="image/*" 
                        onChange={handleFileChange(setBusinessPlan, setBusinessPlanPreview, setBusinessPlanUrl, 'Business Plan')} 
                      />
                      {businessPlanPreview && (
                        <div className="image-preview">
                          <img src={businessPlanPreview} alt="Business Plan Preview" />
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Quotations</label>
                      <input 
                        type="file" 
                        className="form-control" 
                        accept="image/*,.pdf" 
                        onChange={handleFileChange(setProjectQuotations, setProjectQuotationsPreview, setProjectQuotationsUrl, 'Quotations')} 
                      />
                      {projectQuotationsPreview && (
                        <div className="image-preview">
                          <img src={projectQuotationsPreview} alt="Quotations Preview" />
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Proof of Existing Business</label>
                      <input 
                        type="file" 
                        className="form-control" 
                        accept="image/*" 
                        onChange={handleFileChange(setProofOfBusiness, setProofOfBusinessPreview, setProofOfBusinessUrl, 'Proof of Existing Business')} 
                      />
                      {proofOfBusinessPreview && (
                        <div className="image-preview">
                          <img src={proofOfBusinessPreview} alt="Proof of Existing Business Preview" />
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Collateral Documents for all long term */}
                <div className="form-group">
                  <label className="form-label">Collateral Documents</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="image/*" 
                    onChange={handleFileChange(setCollateralDocs, setCollateralDocsPreview, setCollateralDocsUrl, 'Collateral Documents')} 
                  />
                  {collateralDocsPreview && (
                    <div className="image-preview">
                      <img src={collateralDocsPreview} alt="Collateral Documents Preview" />
                    </div>
                  )}
                </div>
              </>
            )}

            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-triangle"></i>
                {error}
              </div>
            )}

            <button type="submit" className="submit-button">
              <i className="fas fa-check"></i>
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 