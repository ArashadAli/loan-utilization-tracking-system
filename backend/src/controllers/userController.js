import User from '../models/User.js';

export const getAllBeneficiaries = async (req, res) => {
  try {
    if (req.user.role !== 'OFFICER') {
      return res.status(403).json({ error: 'Only officers can view this list' });
    }

    const beneficiaries = await User.find({ role: 'BENEFICIARY' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: beneficiaries.length,
      data: beneficiaries,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const activateBeneficiary = async (req, res) => {
  try {
    if (req.user.role !== 'OFFICER') {
      return res.status(403).json({ error: 'Only officers can activate accounts' });
    }

    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.role !== 'BENEFICIARY') {
      return res.status(400).json({ error: 'Can only activate beneficiary accounts' });
    }

    user.isActive = true;
    await user.save();

    res.json({
      success: true,
      message: 'Beneficiary account activated',
      data: user,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deactivateUser = async (req, res) => {
  try {
    if (req.user.role !== 'OFFICER') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.isActive = false;
    await user.save();

    res.json({ success: true, message: 'User deactivated' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};