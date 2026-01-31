import User from '../models/User.js';

export const getAllBeneficiaries = async (req, res) => {
  try {
    // No need to check role again — middleware already did it
    const beneficiaries = await User.find({ role: 'BENEFICIARY' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: beneficiaries.length,
      data: beneficiaries,
    });
  } catch (err) {
    console.error('Get beneficiaries error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const approveBeneficiary = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role !== 'BENEFICIARY') {
      return res.status(400).json({ error: 'Can only approve beneficiary accounts' });
    }

    if (user.isActive) {
      return res.status(400).json({ error: 'Account is already active' });
    }

    user.isActive = true;
    user.approvedBy = req.user.id;
    user.approvedAt = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'Beneficiary approved and activated',
      user: {
        id: user._id,
        name: user.name,
        mobileNumber: user.mobileNumber,
        role: user.role,
        isActive: user.isActive,
        approvedAt: user.approvedAt,
      },
    });
  } catch (err) {
    console.error('Approval error:', err.message, err.stack);
    res.status(500).json({
      error: 'Server error during approval',
      ...(process.env.NODE_ENV === 'development' && { details: err.message }),
    });
  }
};

export const deactivateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Optional: prevent deactivating officers (or allow it — your choice)
    if (user.role === 'OFFICER') {
      return res.status(403).json({ error: 'Cannot deactivate officer accounts' });
    }

    user.isActive = false;
    await user.save();

    res.json({
      success: true,
      message: 'User deactivated successfully',
    });
  } catch (err) {
    console.error('Deactivation error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};