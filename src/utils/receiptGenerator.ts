import { FormData, PaymentDetails, calculateFee, formatINR } from '../types';

export function generateOfficialReceiptHTML(
  formData: FormData,
  referenceNumber: string,
  paymentDetails?: PaymentDetails | null
): string {
  const feeCalc = calculateFee(formData.nominees.length, formData.isAimaMember);
  const isPaid = paymentDetails?.status === 'Paid' || formData.paymentPreference === 'pay_now';
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AIMA Official Receipt - ${referenceNumber}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      background: #f8fafc;
      padding: 24px;
      font-size: 13px;
      line-height: 1.5;
    }
    .receipt-container {
      max-width: 820px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }
    .top-bar {
      background: #0b3c68;
      color: #ffffff;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 3px solid #f59e0b;
    }
    .logo-text {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 1px;
    }
    .badge {
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.3);
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
    }
    .header-content {
      padding: 24px;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      gap: 20px;
    }
    .header-left h1 {
      font-size: 18px;
      color: #0b3c68;
      font-weight: 800;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .header-left p {
      color: #64748b;
      font-size: 12px;
    }
    .meta-box {
      text-align: right;
    }
    .ref-no {
      font-family: monospace;
      font-size: 16px;
      font-weight: 700;
      color: #0b3c68;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      padding: 4px 10px;
      border-radius: 4px;
      display: inline-block;
      margin-top: 4px;
    }
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      border-radius: 4px;
      margin-top: 6px;
    }
    .status-paid {
      background: #dcfce7;
      color: #166534;
      border: 1px solid #86efac;
    }
    .status-pending {
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fde68a;
    }
    .section-block {
      padding: 20px 24px;
      border-bottom: 1px solid #e2e8f0;
    }
    .section-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      color: #0b3c68;
      letter-spacing: 0.5px;
      margin-bottom: 12px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .label {
      color: #64748b;
      font-size: 11px;
      display: block;
      margin-bottom: 2px;
    }
    .value {
      font-weight: 600;
      color: #0f172a;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
      font-size: 12px;
    }
    th {
      background: #f1f5f9;
      text-align: left;
      padding: 8px 10px;
      color: #475569;
      font-weight: 700;
      font-size: 11px;
      text-transform: uppercase;
      border: 1px solid #cbd5e1;
    }
    td {
      padding: 8px 10px;
      border: 1px solid #e2e8f0;
      color: #334155;
    }
    .fee-table td {
      padding: 6px 12px;
    }
    .fee-total {
      font-size: 14px;
      font-weight: 800;
      color: #0b3c68;
      background: #f8fafc;
    }
    .footer-note {
      padding: 16px 24px;
      background: #f8fafc;
      font-size: 11px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .seal-box {
      border: 2px dashed #94a3b8;
      padding: 8px 16px;
      text-align: center;
      font-size: 10px;
      color: #475569;
      border-radius: 4px;
    }
    @media print {
      body { background: #ffffff; padding: 0; }
      .receipt-container { border: none; box-shadow: none; width: 100%; max-width: 100%; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="max-width:820px; margin: 0 auto 16px auto; display: flex; justify-content: space-between; align-items: center;">
    <span style="font-size: 13px; color: #475569;">AIMA Official Executive Programme Summary</span>
    <button onclick="window.print()" style="background: #0b3c68; color: #ffffff; border: none; padding: 8px 16px; border-radius: 4px; font-weight: 700; cursor: pointer; font-size: 12px;">
      🖨️ Print / Save as PDF
    </button>
  </div>

  <div class="receipt-container">
    <div class="top-bar">
      <div>
        <span class="logo-text">AIMA</span>
        <span style="margin-left: 8px; font-size: 11px; opacity: 0.9;">ALL INDIA MANAGEMENT ASSOCIATION</span>
      </div>
      <div class="badge">
        70 Years of National Leadership (1957–2027)
      </div>
    </div>

    <div class="header-content">
      <div class="header-left">
        <h1>Certified CSR Leader Bootcamp</h1>
        <p>Executive Nomination Acknowledgment & Proforma Tax Statement</p>
        <p style="margin-top: 4px; font-size: 11px;">Management House, 14 Institutional Area, Lodhi Road, New Delhi 110003</p>
        <p style="font-size: 11px;">SAC Code: <strong>999293</strong> | GSTIN: <strong>07AAATA0892B1Z6</strong></p>
      </div>
      <div class="meta-box">
        <div class="label">Registration Reference</div>
        <div class="ref-no">${referenceNumber}</div>
        <div style="margin-top: 6px;">
          <span class="status-badge ${isPaid ? 'status-paid' : 'status-pending'}">
            ${isPaid ? '● PAID & CONFIRMED' : '● PENDING PAYMENT'}
          </span>
        </div>
        <div class="label" style="margin-top: 6px;">Issued Date: ${currentDate}</div>
      </div>
    </div>

    <div class="section-block">
      <div class="section-title">01. Sponsoring Organisation & Invoicing Details</div>
      <div class="grid-2">
        <div>
          <span class="label">Sponsoring Entity:</span>
          <span class="value">${formData.orgName}</span>
        </div>
        <div>
          <span class="label">Invoicing Entity (Legal):</span>
          <span class="value">${formData.billingOrgName}</span>
        </div>
        <div>
          <span class="label">Sponsoring Authority:</span>
          <span class="value">${formData.authName} (${formData.authDesignation})</span>
        </div>
        <div>
          <span class="label">Corporate GSTIN:</span>
          <span class="value" style="font-family: monospace;">${formData.billingGstin}</span>
        </div>
        <div>
          <span class="label">Billing Address:</span>
          <span class="value">${formData.billingAddress}, ${formData.billingState} - ${formData.billingPinCode}</span>
        </div>
        <div>
          <span class="label">PO / Work Order Reference:</span>
          <span class="value">${formData.poNumber || 'N/A'}</span>
        </div>
      </div>
    </div>

    <div class="section-block">
      <div class="section-title">02. Nominated Executive Roster (${formData.nominees.length} Delegate${formData.nominees.length > 1 ? 's' : ''})</div>
      <table>
        <thead>
          <tr>
            <th style="width: 40px;">#</th>
            <th>Delegate Name</th>
            <th>Designation</th>
            <th>Official Corporate Email</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          ${formData.nominees
            .map(
              (nom, i) => `
            <tr>
              <td style="font-family: monospace; font-weight: bold; color: #0b3c68;">${String(i + 1).padStart(2, '0')}</td>
              <td style="font-weight: bold;">${nom.name}</td>
              <td>${nom.designation}</td>
              <td style="font-family: monospace;">${nom.email}</td>
              <td style="font-family: monospace;">+91 ${nom.mobile}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </div>

    <div class="section-block">
      <div class="section-title">03. Fee Breakdown & Settlement Summary</div>
      <table class="fee-table" style="border: none;">
        <tbody>
          <tr>
            <td style="border: none;">Base Participation Fee (${feeCalc.participantCount} × ${formatINR(feeCalc.ratePerPerson)})</td>
            <td style="border: none; text-align: right; font-weight: 600;">${formatINR(feeCalc.subtotal)}</td>
          </tr>
          ${
            formData.isAimaMember
              ? `
          <tr>
            <td style="border: none; color: #166534;">AIMA Institutional Member 10% Discount (${formData.aimaMembershipNo || 'Verified'})</td>
            <td style="border: none; text-align: right; font-weight: 600; color: #166534;">– ${formatINR(feeCalc.discountAmount)}</td>
          </tr>`
              : ''
          }
          <tr>
            <td style="border: none;">Taxable Subtotal</td>
            <td style="border: none; text-align: right; font-weight: 600;">${formatINR(feeCalc.netSubtotal)}</td>
          </tr>
          <tr>
            <td style="border: none;">Integrated GST (IGST / CGST+SGST @ 18%)</td>
            <td style="border: none; text-align: right; font-weight: 600;">+ ${formatINR(feeCalc.gstAmount)}</td>
          </tr>
          <tr class="fee-total">
            <td style="border-top: 2px solid #cbd5e1; padding-top: 8px;">Total Amount Payable / Received</td>
            <td style="border-top: 2px solid #cbd5e1; padding-top: 8px; text-align: right; font-size: 16px;">${formatINR(feeCalc.totalPayable)}</td>
          </tr>
        </tbody>
      </table>

      ${
        paymentDetails
          ? `
      <div style="margin-top: 14px; padding: 10px 14px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; font-size: 11px;">
        <span style="font-weight: bold; color: #166534;">Payment Settlement Information:</span>
        <div style="display: flex; justify-content: space-between; margin-top: 4px;">
          <span>Mode: <strong>${paymentDetails.methodLabel}</strong></span>
          <span>Txn ID: <strong style="font-family: monospace;">${paymentDetails.transactionId}</strong></span>
          <span>Time: <strong>${paymentDetails.timestamp}</strong></span>
        </div>
      </div>
      `
          : ''
      }
    </div>

    <div class="footer-note">
      <div>
        <p>This is a computer-generated confirmation acknowledged by AIMA Directorate.</p>
        <p>For support, contact: <strong>csrbootcamp@aima.in</strong> | +91-11-24645100</p>
      </div>
      <div class="seal-box">
        <strong>AIMA OFFICIAL SEAL</strong><br>
        Digitally Verified
      </div>
    </div>
  </div>
</body>
</html>`;
}

export function downloadOfficialReceipt(
  formData: FormData,
  referenceNumber: string,
  paymentDetails?: PaymentDetails | null
): void {
  const htmlContent = generateOfficialReceiptHTML(formData, referenceNumber, paymentDetails);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `AIMA_CSR_Nomination_Receipt_${referenceNumber}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
