import Loan from '../models/Loan.js';
import User from '../models/User.js';

const generateLoanNumber = async () => {
  const lastLoan = await Loan.findOne().sort({ createdAt: -1 });
  const seq = lastLoan ? parseInt(lastLoan.loanNumber.slice(-6)) + 1 : 1;
  return `LN${new Date().getFullYear().toString().slice(-2)}${String(seq).padStart(6, '0')}`;
};

export const createLoanRequest = async (req, res) => {
  try {
    if (req.user.role !== 'BENEFICIARY') {
      return res.status(403).json({ error: 'Only beneficiaries can create loan requests' });
    }

    const { amount, purpose, district, state } = req.body;

    if (!amount || !purpose || !district || !state) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const loanNumber = await generateLoanNumber();

    const loan = await Loan.create({
      beneficiary: req.user._id,
      loanNumber,
      amount,
      purpose,
      sanctionedLocation: { district, state },
      status: 'PENDING',
    });

    res.status(201).json({
      success: true,
      data: loan,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
};

export const getMyLoans = async (req, res) => {
  try {
    if (req.user.role !== 'BENEFICIARY') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const loans = await Loan.find({ beneficiary: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: loans.length,
      data: loans,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getLoansPendingReview = async (req, res) => {
  try {
    if (req.user.role !== 'OFFICER') {
      return res.status(403).json({ error: 'Only officers can view pending loans' });
    }

    const loans = await Loan.find({ status: 'PENDING' })
      .populate('beneficiary', 'name mobileNumber')
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: loans.length,
      data: loans,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateLoanStatus = async (req, res) => {
  try {
    if (req.user.role !== 'OFFICER') {
      return res.status(403).json({ error: 'Only officers can update loan status' });
    }

    const { loanId } = req.params;
    const { status } = req.body;

    if (!['ACTIVE', 'COMPLETED', 'CLOSED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const loan = await Loan.findById(loanId);
    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    if (loan.status === 'COMPLETED' || loan.status === 'CLOSED') {
      return res.status(400).json({ error: 'Cannot modify completed/closed loan' });
    }

    loan.status = status;

    if (status === 'COMPLETED' || status === 'CLOSED') {
      loan.completedAt = new Date();
    }

    await loan.save();

    res.json({
      success: true,
      data: loan,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};