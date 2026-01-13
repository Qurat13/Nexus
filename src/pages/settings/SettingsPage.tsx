import React, { useState } from 'react';
import { User, Lock, Bell, CreditCard, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  if (!user) return null;

  // Milestone 6: Password Strength Logic
  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return { score: 0, label: '', color: 'bg-gray-200' };
    if (pass.length < 6) return { score: 30, label: 'Weak', color: 'bg-red-500' };
    if (pass.length < 10) return { score: 60, label: 'Medium', color: 'bg-yellow-500' };
    return { score: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const strength = getPasswordStrength(newPassword);

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <Card className="lg:col-span-1 h-fit">
          <CardBody className="p-2">
            <nav className="space-y-1">
              <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                <User size={18} className="mr-3" /> Profile
              </button>
              <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-primary-700 bg-primary-50 rounded-md">
                <Lock size={18} className="mr-3" /> Security
              </button>
              <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                <Bell size={18} className="mr-3" /> Notifications
              </button>
              <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                <CreditCard size={18} className="mr-3" /> Billing
              </button>
            </nav>
          </CardBody>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          {/* Security Settings Section */}
          <Card>
            <CardHeader className="border-b">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck className="text-indigo-600" size={20} /> Security & Access Control
              </h2>
            </CardHeader>
            <CardBody className="space-y-8">

              {/* 2FA Mockup */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">Two-Factor Authentication (2FA)</h3>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">Protect your account with a 6-digit verification code.</p>
                    <Badge className={is2faEnabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                      {is2faEnabled ? "Active" : "Not Enabled"}
                    </Badge>
                  </div>
                  {!showOtpInput ? (
                    <Button
                      
                      variant={is2faEnabled ? "outline" : "primary"}
                      onClick={() => setShowOtpInput(true)}
                    >
                      {is2faEnabled ? "Disable" : "Enable 2FA"}
                    </Button>
                  ) : (
                    <div className="flex gap-2 animate-scale-in">
                      <input type="text" maxLength={1} className="w-8 h-10 border rounded text-center font-bold focus:border-indigo-500 outline-none" placeholder="•" />
                      <input type="text" maxLength={1} className="w-8 h-10 border rounded text-center font-bold focus:border-indigo-500 outline-none" placeholder="•" />
                      <input type="text" maxLength={1} className="w-8 h-10 border rounded text-center font-bold focus:border-indigo-500 outline-none" placeholder="•" />
                      <Button size="sm" onClick={() => { setIs2faEnabled(true); setShowOtpInput(false); }}>Verify</Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Password Change with Strength Meter */}
              <div className="pt-6 border-t">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Change Password</h3>
                <div className="max-w-md space-y-4">
                  <Input label="Current Password" type="password" placeholder="••••••••" />

                  <div className="space-y-2">
                    <Input
                      label="New Password"
                      type="password"
                      placeholder="Enter new password"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {/* Password Strength Meter Bar */}
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full transition-all duration-500 ${strength.color}`}
                        style={{ width: `${strength.score}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                        Strength: <span className={strength.score > 60 ? 'text-green-600' : 'text-red-500'}>{strength.label || 'None'}</span>
                      </p>
                    </div>
                  </div>

                  <Input label="Confirm New Password" type="password" placeholder="••••••••" />

                  <div className="flex justify-end pt-2">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
                      Update Security Settings
                    </Button>
                  </div>
                </div>
              </div>

              {/* Role-Based Access Mockup */}
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <ShieldCheck size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-900">Verified {user.role} Access</p>
                  <p className="text-[11px] text-blue-700">Your account permissions are restricted to {user.role} dashboard features only.</p>
                </div>
              </div>

            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};