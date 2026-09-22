/**
 * Grand Azure Luxury Hotel & Spa - Privacy & Consent Controller
 */

const db = require('../db/database');

// GET /api/consents
exports.getAllConsents = (req, res) => {
  const data = db.read();
  res.json({ success: true, count: data.privacyConsents.length, consents: data.privacyConsents });
};

// POST /api/consents (Admin only)
exports.createConsent = (req, res) => {
  const { subjectName, mediaDescription, consentType, status, dateSigned, expiryDate, notes } = req.body;
  if (!subjectName || !mediaDescription) {
    return res.status(400).json({ success: false, message: 'Subject name and media description are required.' });
  }

  const data = db.read();
  const newConsent = {
    id: 'cst-' + Date.now().toString().slice(-4),
    subjectName,
    mediaDescription,
    consentType: consentType || 'Guest Photo Release',
    status: status || 'Signed & Verified',
    dateSigned: dateSigned || new Date().toISOString().split('T')[0],
    expiryDate: expiryDate || '2028-12-31',
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  data.privacyConsents.unshift(newConsent);
  db.write(data);

  res.status(201).json({ success: true, message: 'Media consent registered successfully', consent: newConsent });
};

// DELETE /api/consents/:id (Admin only)
exports.deleteConsent = (req, res) => {
  const { id } = req.params;
  const data = db.read();
  const initial = data.privacyConsents.length;

  data.privacyConsents = data.privacyConsents.filter(c => c.id !== id);
  if (data.privacyConsents.length === initial) {
    return res.status(404).json({ success: false, message: 'Consent record not found.' });
  }

  db.write(data);
  res.json({ success: true, message: 'Consent record removed.' });
};
